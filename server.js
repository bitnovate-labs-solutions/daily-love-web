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
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Replace with your actual domain
    : ['http://localhost:8081', 'http://localhost:3000', 'http://localhost:3003'],
  credentials: true
}));

app.use(express.json());

// Google Places API endpoint
app.get('/api/google-reviews', async (req, res) => {
  try {
    const { placeId, maxResults = 20 } = req.query;
    
    if (!placeId) {
      return res.status(400).json({ 
        error: 'Place ID is required' 
      });
    }

    // Check if we have an API key
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.warn('Google Places API key not found. Using mock data.');
      return res.json({ 
        reviews: getMockReviews(),
        message: 'Using mock data - API key not configured'
      });
    }

    // Make request to Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.error_message || data.status);
      
      // Fallback to mock data if API fails
      return res.json({ 
        reviews: getMockReviews().slice(0, maxResults),
        message: 'API error - using mock data as fallback',
        error: data.error_message || data.status
      });
    }

    const reviews = data.result.reviews || [];
    const limitedReviews = reviews.slice(0, maxResults);

    res.json({ 
      reviews: limitedReviews,
      total: reviews.length,
      requested: maxResults
    });

  } catch (error) {
    console.error('Server error:', error);
    
    // Fallback to mock data on server error
    res.json({ 
      reviews: getMockReviews().slice(0, req.query.maxResults || 20),
      message: 'Server error - using mock data as fallback',
      error: error.message
    });
  }
});

// Place details endpoint
app.get('/api/google-reviews/place-details', async (req, res) => {
  try {
    const { placeId } = req.query;
    
    if (!placeId) {
      return res.status(400).json({ 
        error: 'Place ID is required' 
      });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return res.json({ 
        placeDetails: getMockPlaceDetails(),
        message: 'Using mock data - API key not configured'
      });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,rating,user_ratings_total,reviews&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return res.json({ 
        placeDetails: getMockPlaceDetails(),
        message: 'API error - using mock data as fallback',
        error: data.error_message || data.status
      });
    }

    res.json({ 
      placeDetails: data.result
    });

  } catch (error) {
    console.error('Server error:', error);
    res.json({ 
      placeDetails: getMockPlaceDetails(),
      message: 'Server error - using mock data as fallback',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    googleApiKey: !!process.env.GOOGLE_PLACES_API_KEY
  });
});

// Mock data functions
function getMockReviews() {
  return [
    {
      author_name: "Jennifer Lee",
      author_url: "https://maps.google.com/maps/contrib/123456789",
      language: "en",
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user",
      rating: 5,
      relative_time_description: "2 weeks ago",
      text: "Absolutely amazing experience! The IV therapy left me feeling rejuvenated and energized. The staff is incredibly professional and the space is so peaceful. I love the Japandi aesthetic - it's like stepping into a luxury spa. Highly recommend for anyone looking for wellness treatments.",
      time: Date.now() - 14 * 24 * 60 * 60 * 1000,
    },
    {
      author_name: "Marcus Rodriguez",
      author_url: "https://maps.google.com/maps/contrib/987654321",
      language: "en",
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user",
      rating: 5,
      relative_time_description: "1 month ago",
      text: "Found this place through Google and I'm so glad I did! The essential oils consultation was thorough and educational. The therapist really took time to understand my needs. The quality of their oils is exceptional and the effects are noticeable immediately.",
      time: Date.now() - 30 * 24 * 60 * 60 * 1000,
    },
    {
      author_name: "Sarah Kim",
      author_url: "https://maps.google.com/maps/contrib/456789123",
      language: "en",
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user",
      rating: 5,
      relative_time_description: "3 weeks ago",
      text: "Best wellness center I've ever visited. The beauty & anti-aging IV drip worked wonders for my skin. The environment is so serene - I actually fell asleep during the treatment! The staff remembers my preferences and makes each visit feel personalized.",
      time: Date.now() - 21 * 24 * 60 * 60 * 1000,
    },
    {
      author_name: "David Chen",
      author_url: "https://maps.google.com/maps/contrib/789123456",
      language: "en",
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user",
      rating: 5,
      relative_time_description: "2 months ago",
      text: "I've been coming here for their monthly wellness package and it's been life-changing. The combination of IV therapy and essential oils has completely transformed how I feel. The staff is knowledgeable and the space is absolutely beautiful.",
      time: Date.now() - 60 * 24 * 60 * 60 * 1000,
    },
    {
      author_name: "Amanda Foster",
      author_url: "https://maps.google.com/maps/contrib/321654987",
      language: "en",
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user",
      rating: 5,
      relative_time_description: "1 week ago",
      text: "The immune support IV drip was exactly what I needed during flu season. I felt better immediately and stayed healthy. The warm, welcoming atmosphere makes all the difference. This place truly cares about your wellness journey.",
      time: Date.now() - 7 * 24 * 60 * 60 * 1000,
    },
    {
      author_name: "Robert Wilson",
      author_url: "https://maps.google.com/maps/contrib/147258369",
      language: "en",
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user",
      rating: 5,
      relative_time_description: "5 days ago",
      text: "The stress relief essential oils have revolutionized my sleep quality. The team took time to educate me on proper usage and the benefits of each oil. You can tell they're passionate about what they do. The quality is outstanding!",
      time: Date.now() - 5 * 24 * 60 * 60 * 1000,
    },
  ];
}

function getMockPlaceDetails() {
  return {
    place_id: process.env.GOOGLE_PLACE_ID || "ChIJobhEZgBJzDERWh99VyPERKs",
    name: "Daily Love Wellness",
    formatted_address: "Your Business Address Here",
    rating: 4.9,
    user_ratings_total: 127,
    reviews: getMockReviews()
  };
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Google Reviews API: http://localhost:${PORT}/api/google-reviews`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    console.log(`⚠️  Google Places API key not found - using mock data`);
    console.log(`   Set GOOGLE_PLACES_API_KEY in your .env file to use real reviews`);
  } else {
    console.log(`✅ Google Places API key configured`);
  }
});

export default app;
