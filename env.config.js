// Environment Configuration for Google Reviews Server
// Copy this to a .env file in your project root

module.exports = {
  // Google Places API Configuration
  // Get your API key from: https://console.cloud.google.com/
  GOOGLE_PLACES_API_KEY: "your_google_places_api_key_here",
  
  // Your Google Place ID (from Google My Business)
  GOOGLE_PLACE_ID: "ChIJobhEZgBJzDERWh99VyPERKs",
  
  // Server Configuration
  PORT: 3003,
  NODE_ENV: "development",
  
  // CORS Origins (update with your actual domain in production)
  ALLOWED_ORIGINS: "http://localhost:8081,http://localhost:3000"
};

/*
To use this configuration:

1. Create a .env file in your project root
2. Add these variables:
   GOOGLE_PLACES_API_KEY=your_actual_api_key
   GOOGLE_PLACE_ID=your_actual_place_id
   PORT=3001
   NODE_ENV=development

3. The server will automatically load these from the .env file
*/
