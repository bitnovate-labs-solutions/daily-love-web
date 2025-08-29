import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:3003',
    'https://dailylovewellness.com'
  ],
  credentials: true
}));
app.use(express.json());

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

// Google Places API endpoint (Primary - Recommended for Reviews with Caching)
app.get('/api/google-reviews/places', async (req, res) => {
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

    // Make request to Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,name,formatted_address&key=${apiKey}`;
    
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
});

// Cache management endpoint
app.get('/api/google-reviews/cache-status', (req, res) => {
  const cacheStatus = {
    hasCachedData: !!cachedReviews,
    lastFetchTime: lastFetchTime ? new Date(lastFetchTime).toISOString() : null,
    isCacheValid: isCacheValid(),
    cacheDuration: CACHE_DURATION / (60 * 60 * 1000), // hours
    timeUntilExpiry: lastFetchTime ? Math.max(0, CACHE_DURATION - (Date.now() - lastFetchTime)) / (60 * 60 * 1000) : 0,
    cachedReviewsCount: cachedReviews ? cachedReviews.reviews?.length || 0 : 0,
    message: isCacheValid() 
      ? `Cache is valid. Reviews cached for ${Math.round((CACHE_DURATION - (Date.now() - lastFetchTime)) / (60 * 60 * 1000))} more hours.`
      : 'Cache is expired or empty. Next request will fetch fresh data.'
  };
  
  res.json(cacheStatus);
});

// Manual cache refresh endpoint
app.post('/api/google-reviews/refresh-cache', async (req, res) => {
  try {
    const { placeId = "ChIJobhEZgBJzDERWh99VyPERKs" } = req.body;
    
    // Force refresh by calling the places endpoint
    const url = `http://localhost:3003/api/google-reviews/places?placeId=${placeId}&forceRefresh=true`;
    const response = await fetch(url);
    
    if (response.ok) {
      res.json({ 
        success: true, 
        message: 'Cache refreshed successfully',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(400).json({ 
        success: false, 
        error: 'Failed to refresh cache' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Cache refresh failed',
      details: error.message 
    });
  }
});

// Legacy Google Places API endpoints (Optional - for backward compatibility)
app.get('/api/google-reviews', (req, res) => {
  res.json({
    message: 'Legacy endpoint - use /api/google-reviews/places instead',
    note: 'This endpoint is deprecated. Please use the new Places API endpoint with caching.',
    newEndpoint: '/api/google-reviews/places',
    setup: 'Add GOOGLE_PLACES_API_KEY to your .env file for real reviews'
  });
});

app.get('/api/google-reviews/place-details', (req, res) => {
  res.json({
    message: 'Legacy endpoint - use /api/google-reviews/places instead',
    note: 'This endpoint is deprecated. Please use the new Places API endpoint with caching.',
    newEndpoint: '/api/google-reviews/places',
    setup: 'Add GOOGLE_PLACES_API_KEY to your .env file for real reviews'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'Daily Love Wellness API',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Server running on http://localhost:3003');
  console.log('📊 Google Places API: http://localhost:3003/api/google-reviews/places');
  console.log('🏥 Health Check: http://localhost:3003/api/health');
  console.log('✅ Google Places API with daily caching ready');
  console.log('   Add GOOGLE_PLACES_API_KEY to your .env file to enable real reviews');
});
