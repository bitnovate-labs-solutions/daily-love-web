// API Configuration Utility
// This handles dynamic API URLs for different environments

export const getApiBaseUrl = (): string => {
  // In production (Vercel), use relative URLs
  if (typeof window !== 'undefined') {
    // Client-side: use current origin
    return window.location.origin;
  }
  
  // Server-side or fallback
  if (process.env.NODE_ENV === 'production') {
    // Production: use relative URLs
    return '';
  }
  
  // Development: use localhost
  return 'http://localhost:3003';
};

export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${endpoint}`;
};

// Google Places API Configuration
export const GOOGLE_PLACES_CONFIG = {
  // Replace with your actual Google Place ID
  PLACE_ID: "ChIJobhEZgBJzDERWh99VyPERKs",

  // Google Places API endpoint
  API_ENDPOINT: "/api/google-reviews",

  // Maximum number of reviews to fetch
  MAX_REVIEWS: 20,

  // Review language preference
  LANGUAGE: "en",

  // Sort order for reviews (most_relevant, newest, rating)
  SORT_ORDER: "newest" as "most_relevant" | "newest" | "rating",
};

// Types for Google Places API responses
export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

export interface GoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

// Function to fetch Google reviews
export const fetchGoogleReviews = async (
  placeId: string = GOOGLE_PLACES_CONFIG.PLACE_ID,
  maxResults: number = GOOGLE_PLACES_CONFIG.MAX_REVIEWS
): Promise<GoogleReview[]> => {
  try {
    const response = await fetch(
      getApiUrl(`${GOOGLE_PLACES_CONFIG.API_ENDPOINT}?placeId=${placeId}&maxResults=${maxResults}`)
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.reviews || [];
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    throw error;
  }
};

// Function to get place details
export const fetchPlaceDetails = async (
  placeId: string = GOOGLE_PLACES_CONFIG.PLACE_ID
): Promise<GooglePlaceDetails | null> => {
  try {
    const response = await fetch(
      getApiUrl(`${GOOGLE_PLACES_CONFIG.API_ENDPOINT}/place-details?placeId=${placeId}`)
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.placeDetails || null;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};