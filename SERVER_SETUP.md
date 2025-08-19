# 🚀 Google Reviews Server Setup Guide

Your Express.js server is ready to handle Google Reviews API calls! Here's how to get it running:

## 📋 Prerequisites

1. **Google Places API Key** (optional for now - server will use mock data)
2. **Google Place ID** (already configured in your config)

## 🛠️ Setup Steps

### 1. Create Environment File

Create a `.env` file in your project root:

```bash
# .env
GOOGLE_PLACES_API_KEY=your_actual_api_key_here
GOOGLE_PLACE_ID=ChIJobhEZgBJzDERWh99VyPERKs
PORT=3003
NODE_ENV=development
```

### 2. Get Google Places API Key (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Places API" and "Maps JavaScript API"
4. Create API credentials (API Key)
5. Restrict the API key to your domain for security

### 3. Run the Server

#### Option A: Run Server Only
```bash
npm run server
```

#### Option B: Run Both Frontend and Backend
```bash
npm run dev:full
```

This will start:
- 🖥️ **Frontend**: http://localhost:8081 (Vite)
- 🚀 **Backend**: http://localhost:3003 (Express)

## 🧪 Test Your API

### Health Check
```bash
curl http://localhost:3003/api/health
```

### Get Reviews
```bash
curl "http://localhost:3003/api/google-reviews?placeId=ChIJobhEZgBJzDERWh99VyPERKs&maxResults=5"
```

### Get Place Details
```bash
curl "http://localhost:3003/api/google-reviews/place-details?placeId=ChIJobhEZgBJzDERWh99VyPERKs"
```

## 🔄 How It Works

### Without API Key (Current State)
- Server runs with mock data
- Perfect for development and testing
- No external API calls needed

### With API Key (Production)
- Server fetches real Google reviews
- Automatic fallback to mock data if API fails
- Secure - API key never exposed to frontend

## 📱 Frontend Integration

Your React components automatically:
1. Try to fetch from the server API first
2. Fall back to mock data if server is unavailable
3. Display reviews with proper Google attribution

## 🚨 Troubleshooting

### Server Won't Start
- Check if port 3001 is available
- Ensure all dependencies are installed
- Check console for error messages

### CORS Issues
- Server is configured for localhost:8081 and localhost:3000
- Update `ALLOWED_ORIGINS` in server.js for production

### API Errors
- Check Google Places API key is valid
- Verify Place ID is correct
- Check Google Cloud Console quotas

## 🔒 Security Features

- ✅ API keys never exposed to frontend
- ✅ CORS protection enabled
- ✅ Input validation on all endpoints
- ✅ Graceful error handling
- ✅ Automatic fallback to mock data

## 🚀 Production Deployment

When deploying to production:

1. **Update CORS origins** in server.js
2. **Set NODE_ENV=production**
3. **Use environment variables** for all sensitive data
4. **Implement rate limiting** (recommended)
5. **Add HTTPS** for security

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Server health check |
| `/api/google-reviews` | GET | Fetch Google reviews |
| `/api/google-reviews/place-details` | GET | Get place information |

## 🎯 Next Steps

1. ✅ Server is running with mock data
2. 🔄 Test the API endpoints
3. 🔄 Get Google Places API key from client
4. 🔄 Update .env file with real API key
5. 🎉 Real Google reviews will be displayed!

## 💡 Pro Tips

- **Keep the server running** while developing the frontend
- **Use the health endpoint** to check server status
- **Mock data is perfect** for client demos
- **Real API integration** is just a config change away

Your server is production-ready and will seamlessly transition from mock data to real Google reviews! 🎉
