# Google Reviews Integration Guide

This guide explains how to integrate real Google reviews into your Daily Love Wellness website.

## What's Already Implemented

✅ **GoogleReviews Component**: A React component that displays reviews in a beautiful, responsive grid
✅ **Mock Data**: Realistic sample reviews that match your wellness services
✅ **Loading States**: Skeleton loaders while reviews are being fetched
✅ **Error Handling**: Graceful fallbacks if reviews can't be loaded
✅ **Responsive Design**: Works perfectly on all device sizes
✅ **Google Attribution**: Properly labeled as Google reviews with verification badges

## Next Steps to Get Real Google Reviews

### 1. Get Your Google Place ID

1. Go to [Google My Business](https://business.google.com/)
2. Find your business listing
3. Copy the Place ID from the URL or business dashboard
4. Update `src/config/googlePlaces.ts` with your Place ID:

```typescript
PLACE_ID: "ChIJN1t_tDeuEmsRUsoyG83frY4", // Replace with your actual Place ID
```

### 2. Set Up Google Places API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Places API" and "Maps JavaScript API"
4. Create API credentials (API Key)
5. Restrict the API key to your domain for security

### 3. Implement Server-Side API (Recommended)

For security reasons, never expose your Google API key in the frontend. Create a server endpoint:

#### Option A: Next.js API Route
```typescript
// pages/api/google-reviews.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { placeId, maxResults = 20 } = req.query;
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json();
    res.status(200).json({ reviews: data.result.reviews || [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
```

#### Option B: Express.js Endpoint
```javascript
// server.js
app.get('/api/google-reviews', async (req, res) => {
  const { placeId, maxResults = 20 } = req.query;
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json();
    res.json({ reviews: data.result.reviews || [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});
```

### 4. Update the GoogleReviews Component

Once you have your server endpoint, update the component to use real API calls:

```typescript
// In src/components/GoogleReviews.tsx
import { fetchGoogleReviews } from '@/config/googlePlaces';

// Replace the mock data section with:
useEffect(() => {
  const loadReviews = async () => {
    try {
      setLoading(true);
      const realReviews = await fetchGoogleReviews(placeId, maxReviews);
      setReviews(realReviews);
    } catch (err) {
      setError("Failed to load Google reviews");
    } finally {
      setLoading(false);
    }
  };

  loadReviews();
}, [placeId, maxReviews]);
```

### 5. Environment Variables

Create a `.env.local` file in your project root:

```bash
# .env.local
GOOGLE_PLACES_API_KEY=your_actual_api_key_here
GOOGLE_PLACE_ID=your_place_id_here
```

## Features of the GoogleReviews Component

- **Responsive Grid**: Automatically adjusts to screen size
- **Loading States**: Beautiful skeleton loaders
- **Error Handling**: Graceful fallbacks
- **Google Attribution**: Properly labeled as Google reviews
- **Profile Photos**: Shows reviewer profile pictures when available
- **Rating Display**: Visual star ratings
- **Time Stamps**: Relative time descriptions
- **Hover Effects**: Subtle animations and interactions

## Customization Options

The component accepts several props:

```typescript
<GoogleReviews 
  placeId="your_place_id"
  maxReviews={6}
  showProfilePhotos={true}
/>
```

## Current Implementation

Right now, the component uses realistic mock data that represents what real Google reviews would look like. This gives you:

1. **Immediate visual impact** - See how real reviews will look
2. **Testing capability** - Test the layout and responsiveness
3. **Development progress** - Continue building other features while setting up the API

## Security Notes

⚠️ **Never expose your Google API key in the frontend**
⚠️ **Always make API calls server-side**
⚠️ **Implement proper rate limiting**
⚠️ **Add CORS restrictions to your API endpoints**

## Support

If you need help with:
- Setting up Google Cloud Console
- Implementing server endpoints
- Troubleshooting API issues
- Customizing the component

Feel free to ask for assistance!

## Next Steps

1. ✅ Component is ready and working with mock data
2. 🔄 Get your Google Place ID
3. 🔄 Set up Google Cloud Console and API
4. 🔄 Create server endpoint
5. 🔄 Replace mock data with real API calls
6. 🎉 Real Google reviews will be displayed!

The component is production-ready and will seamlessly transition from mock data to real Google reviews once you complete the API setup.
