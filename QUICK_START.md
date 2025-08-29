# Quick Start: Google Places API with Daily Caching

## 🚀 Get Started in 3 Steps

### 1. Start the Server
```bash
npm run server
```
Server will run on `http://localhost:3003`

### 2. Test API Endpoints
```bash
# Health check
curl http://localhost:3003/api/health

# Cache status
curl http://localhost:3003/api/google-reviews/cache-status

# Fetch reviews (requires API key)
curl http://localhost:3003/api/google-reviews/places?placeId=YOUR_PLACE_ID
```

### 3. View Your Website
Open your browser and navigate to:
```
http://localhost:8080
```
The "What Our Clients Say" section will show mock data until you add your API key.

## 🔑 Required Setup

### Environment Variables
Create a `.env` file with:
```bash
PORT=3003
NODE_ENV=development
GOOGLE_PLACES_API_KEY=your_api_key_here
```

### Google Places API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google Places API
4. Create API key
5. Add to your `.env` file
6. Restart server

## 🧪 Testing the System

1. **Without API Key**: See mock data in "What Our Clients Say" section
2. **With API Key**: Real Google reviews appear automatically
3. **Daily Caching**: Reviews fetched once per day, served instantly

## 📱 Available Components

- **GooglePlacesReviews**: Main component for displaying Google reviews
- **Daily Caching**: Automatic 24-hour refresh cycle
- **Mock Data**: Temporary sample data (easy to remove)

## 🔍 API Endpoints

- `GET /api/health` - Health check
- `GET /api/google-reviews/places` - Fetch Google reviews with caching
- `GET /api/google-reviews/cache-status` - View cache information
- `POST /api/google-reviews/refresh-cache` - Manually refresh cache

## 🚨 Troubleshooting

- **"API key not configured"**: Add GOOGLE_PLACES_API_KEY to .env file
- **"Place ID not found"**: Verify your Google Business Place ID
- **CORS errors**: Check server CORS configuration
- **Cache issues**: Use refresh endpoint to force update

## 📚 Features

- **Daily Caching**: Fetch once per day, serve instantly
- **Rich Review Data**: Full content, ratings, user photos
- **Professional UI**: Beautiful review cards with your design
- **Easy Setup**: Just add API key to .env file
- **Mock Data**: Works immediately without setup

## 🎯 Next Steps

1. Get your Google Places API key
2. Add to .env file
3. Restart server
4. Remove mock data from GooglePlacesReviews.tsx
5. Enjoy live Google reviews!
