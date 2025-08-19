// Google Places API Configuration
// Note: In production, these API calls should be made server-side to protect your API key

export const GOOGLE_PLACES_CONFIG = {
  // Replace with your actual Google Place ID
  // You can find this in your Google My Business dashboard or by using the Google Places API
  PLACE_ID: "ChIJobhEZgBJzDERWh99VyPERKs",

  // Google Places API endpoint (this would be your server endpoint)
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

// Function to fetch Google reviews (placeholder for server-side implementation)
export const fetchGoogleReviews = async (
  placeId: string = GOOGLE_PLACES_CONFIG.PLACE_ID,
  maxResults: number = GOOGLE_PLACES_CONFIG.MAX_REVIEWS
): Promise<GoogleReview[]> => {
  try {
    // In production, this would be a call to your server endpoint
    // which would then call the Google Places API with your API key
    const response = await fetch(
      `${GOOGLE_PLACES_CONFIG.API_ENDPOINT}?placeId=${placeId}&maxResults=${maxResults}`
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

// Function to get place details (placeholder for server-side implementation)
export const fetchPlaceDetails = async (
  placeId: string = GOOGLE_PLACES_CONFIG.PLACE_ID
): Promise<GooglePlaceDetails | null> => {
  try {
    // In production, this would be a call to your server endpoint
    const response = await fetch(
      `${GOOGLE_PLACES_CONFIG.API_ENDPOINT}/place-details?placeId=${placeId}`
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
