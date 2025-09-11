import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

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

// Simple rate limiting (requests per IP per minute)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP

const rateLimitMiddleware = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimitMap.has(clientIP)) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const clientData = rateLimitMap.get(clientIP);
  
  if (now > clientData.resetTime) {
    // Reset the window
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT_WINDOW;
    return next();
  }
  
  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    });
  }
  
  clientData.count++;
  next();
};

// Middleware
app.use(cors({
  origin: getAllowedOrigins(),
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

// Security middleware for API endpoints
const validateRequest = (req, res, next) => {
  const origin = req.get('Origin');
  const userAgent = req.get('User-Agent');
  const allowedOrigins = getAllowedOrigins();
  
  // Check origin
  if (!allowedOrigins.includes(origin)) {
    console.log(`Blocked request from unauthorized origin: ${origin}`);
    return res.status(403).json({ 
      error: 'Access denied',
      message: 'Invalid origin'
    });
  }
  
  // Check for suspicious user agents (basic bot detection)
  if (userAgent && (
    userAgent.includes('bot') || 
    userAgent.includes('crawler') || 
    userAgent.includes('spider') ||
    userAgent.length < 10
  )) {
    console.log(`Blocked suspicious user agent: ${userAgent}`);
    return res.status(403).json({ 
      error: 'Access denied',
      message: 'Suspicious request detected'
    });
  }
  
  next();
};

// Google Places API endpoint (Primary - Recommended for Reviews with Caching)
app.get('/api/google-reviews/places', rateLimitMiddleware, validateRequest, async (req, res) => {
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
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : `http://localhost:${PORT}`;
    const url = `${baseUrl}/api/google-reviews/places?placeId=${placeId}&forceRefresh=true`;
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
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    vercel: !!process.env.VERCEL,
    security: {
      rateLimitEnabled: true,
      originValidation: true,
      userAgentValidation: true,
      apiRestrictions: 'Places API only'
    }
  });
});

// Root endpoint for Vercel health checks
app.get('/', (req, res) => {
  res.json({ 
    message: 'Daily Love Wellness API Server',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      reviews: '/api/google-reviews/places',
      cacheStatus: '/api/google-reviews/cache-status'
    }
  });
});

// Alternative endpoint using different API parameters
app.get('/api/google-reviews/alternative', rateLimitMiddleware, validateRequest, async (req, res) => {
  try {
    const { placeId, maxResults = 20, forceRefresh = false } = req.query;
    
    if (!placeId) {
      return res.status(400).json({ 
        error: 'Place ID is required. Use your Google Business Place ID.' 
      });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ 
        error: 'Google Places API key not configured'
      });
    }

    console.log('Fetching reviews using alternative API parameters...');

    // Try different API parameters
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,name,formatted_address&language=en&region=MY&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return res.status(400).json({ 
        error: 'Failed to fetch reviews from Google Places API',
        details: data.error_message || data.status
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
      source: 'Google Places API (Alternative Parameters)',
      message: 'Reviews fetched with alternative API parameters',
      cacheInfo: {
        cached: false,
        lastFetched: new Date().toISOString(),
        expiresIn: '24 hours',
        source: 'Fresh from Alternative API'
      }
    };

    res.json(responseData);

  } catch (error) {
    console.error('Alternative API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reviews from Alternative API',
      details: error.message 
    });
  }
});

// Alternative endpoint using Text Search API (might return more reviews)
app.get('/api/google-reviews/text-search', rateLimitMiddleware, validateRequest, async (req, res) => {
  try {
    const { placeId, maxResults = 20, forceRefresh = false } = req.query;
    
    if (!placeId) {
      return res.status(400).json({ 
        error: 'Place ID is required. Use your Google Business Place ID.' 
      });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ 
        error: 'Google Places API key not configured'
      });
    }

    console.log('Fetching reviews using Text Search API...');

    // First get place details to get the name
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,rating,user_ratings_total&key=${apiKey}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (detailsData.status !== 'OK') {
      return res.status(400).json({ 
        error: 'Failed to fetch place details',
        details: detailsData.error_message || detailsData.status
      });
    }

    // Now search for the place by name to potentially get more reviews
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(detailsData.result.name)}&fields=place_id,reviews,rating,user_ratings_total&key=${apiKey}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status !== 'OK') {
      return res.status(400).json({ 
        error: 'Failed to fetch reviews from Text Search API',
        details: searchData.error_message || searchData.status
      });
    }

    // Find the matching place
    const matchingPlace = searchData.results.find(place => place.place_id === placeId);
    
    if (!matchingPlace) {
      return res.status(404).json({ 
        error: 'Place not found in search results'
      });
    }

    const reviews = matchingPlace.reviews || [];
    const limitedReviews = reviews.slice(0, maxResults);

    const responseData = {
      reviews: limitedReviews,
      total: reviews.length,
      requested: maxResults,
      placeRating: matchingPlace.rating,
      totalRatings: matchingPlace.user_ratings_total,
      placeName: detailsData.result.name,
      placeAddress: detailsData.result.formatted_address,
      source: 'Google Places Text Search API',
      message: 'Reviews fetched using Text Search API',
      cacheInfo: {
        cached: false,
        lastFetched: new Date().toISOString(),
        expiresIn: '24 hours',
        source: 'Fresh from Text Search API'
      }
    };

    res.json(responseData);

  } catch (error) {
    console.error('Text Search API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reviews from Text Search API',
      details: error.message 
    });
  }
});

// Security status endpoint (for monitoring)
app.get('/api/security-status', (req, res) => {
  const activeConnections = rateLimitMap.size;
  const now = Date.now();
  
  // Clean up expired rate limit entries
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
  
  res.json({
    timestamp: new Date().toISOString(),
    rateLimiting: {
      activeConnections: activeConnections,
      maxRequestsPerWindow: MAX_REQUESTS_PER_WINDOW,
      windowDuration: RATE_LIMIT_WINDOW / 1000 + ' seconds'
    },
    security: {
      originValidation: 'Enabled',
      userAgentValidation: 'Enabled',
      corsProtection: 'Enabled'
    },
    apiKey: {
      restrictions: 'Application: None, API: Places API only',
      status: 'Configured'
    }
  });
});

// Export the app for Vercel
export default app;

// Start server only in development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('🚀 Server running on http://localhost:3003');
    console.log('📊 Google Places API: http://localhost:3003/api/google-reviews/places');
    console.log('🔍 Text Search API: http://localhost:3003/api/google-reviews/text-search');
    console.log('🏥 Health Check: http://localhost:3003/api/health');
    console.log('✅ Google Places API with daily caching ready');
    console.log('   Add GOOGLE_PLACES_API_KEY to your .env file to enable real reviews');
    console.log('🌐 Allowed Origins:', getAllowedOrigins());
    console.log('🔒 Environment:', process.env.NODE_ENV || 'development');
  });
}
