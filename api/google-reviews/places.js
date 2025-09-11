import cors from 'cors';
import fetch from 'node-fetch';

// Environment-based CORS configuration
const getAllowedOrigins = () => {
  const baseOrigins = [
    'http://localhost:8080', // Development
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev port
  ];
  
  // Add production domains if they exist
  const productionDomains = [
    'https://daily-love-wellness.vercel.app',
    'https://dailylovewellness.com',
    'https://www.dailylovewellness.com'
  ];
  
  // Add Vercel preview URLs
  if (process.env.VERCEL_URL) {
    productionDomains.push(`https://${process.env.VERCEL_URL}`);
  }
  
  // In production or Vercel environment, add all domains
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return [...baseOrigins, ...productionDomains];
  }
  
  // In development, include all origins for flexibility
  return [...baseOrigins, ...productionDomains];
};

// Review caching system
let cachedReviews = null;
let lastFetchTime = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Review caching functions
const isCacheValid = () => {
  if (!cachedReviews || !lastFetchTime) return false;
  
  const now = Date.now();
  const timeSinceLastFetch = now - lastFetchTime;
  
  return timeSinceLastFetch < CACHE_DURATION;
};

const updateCache = (reviews) => {
  cachedReviews = reviews;
  lastFetchTime = Date.now();
  console.log('Reviews cache updated at:', new Date(lastFetchTime).toLocaleString());
  console.log('Next fetch in 24 hours');
};

const getCachedReviews = () => {
  if (!isCacheValid()) return null;
  
  const timeUntilExpiry = CACHE_DURATION - (Date.now() - lastFetchTime);
  const hoursUntilExpiry = Math.round(timeUntilExpiry / (60 * 60 * 1000));
  
  console.log(`Returning cached reviews (expires in ${hoursUntilExpiry} hours)`);
  return {
    ...cachedReviews,
    cacheInfo: {
      cached: true,
      lastFetched: new Date(lastFetchTime).toISOString(),
      expiresIn: `${hoursUntilExpiry} hours`,
      source: 'Cache (fetched once per day)'
    }
  };
};

export default async function handler(req, res) {
  // Enable CORS
  const corsMiddleware = cors({
    origin: getAllowedOrigins(),
    credentials: true
  });
  
  // Apply CORS middleware
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { placeId, maxResults = 20, forceRefresh = false } = req.query;
    
    if (!placeId) {
      return res.status(400).json({ 
        error: 'Place ID is required. Use your Google Business Place ID.' 
      });
    }

    // Check cache first (unless force refresh is requested)
    if (!forceRefresh) {
      const cachedData = getCachedReviews();
      if (cachedData) {
        return res.json({
          ...cachedData,
          message: 'Reviews loaded from cache (fetched once per day)',
          note: 'Use ?forceRefresh=true to fetch fresh data'
        });
      }
    }

    // Check if we have an API key
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ 
        error: 'Google Places API key not configured',
        message: 'This is the recommended way to fetch reviews. Please add GOOGLE_PLACES_API_KEY to your .env file.',
        setup: {
          step1: 'Go to Google Cloud Console',
          step2: 'Enable Google Places API',
          step3: 'Create API key',
          step4: 'Add to .env file: GOOGLE_PLACES_API_KEY=your_key_here'
        }
      });
    }

    console.log('Fetching fresh reviews from Google Places API...');

    // Make request to Google Places API with language parameter
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,name,formatted_address&language=en&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return res.status(400).json({ 
        error: 'Failed to fetch reviews from Google Places API',
        details: data.error_message || data.status,
        message: 'Please verify your Place ID and API key are correct.'
      });
    }

    const reviews = data.result.reviews || [];
    const limitedReviews = reviews.slice(0, maxResults);

    const responseData = {
      reviews: limitedReviews,
      total: reviews.length,
      requested: maxResults,
      placeRating: data.result.rating,
      totalRatings: data.result.user_ratings_total,
      placeName: data.result.name,
      placeAddress: data.result.formatted_address,
      source: 'Google Places API (Recommended)',
      message: 'Reviews fetched successfully and cached for 24 hours',
      cacheInfo: {
        cached: false,
        lastFetched: new Date().toISOString(),
        expiresIn: '24 hours',
        source: 'Fresh from Google API'
      }
    };

    // Update cache with new data
    updateCache(responseData);

    res.json(responseData);

  } catch (error) {
    console.error('Places API error:', error);
    
    // If we have cached data, return it as fallback
    const cachedData = getCachedReviews();
    if (cachedData) {
      console.log('API error - returning cached data as fallback');
      return res.json({
        ...cachedData,
        message: 'Reviews loaded from cache due to API error',
        error: error.message,
        note: 'This is cached data from previous successful fetch'
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch reviews from Google Places API',
      details: error.message 
    });
  }
}
