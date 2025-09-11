import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Star, Quote, ExternalLink, MapPin, AlertCircle, CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getApiUrl } from '@/config/googlePlaces';

// ============================================================================
// 🎭 TEMPORARY MOCK DATA - REMOVE THIS SECTION WHEN YOU GET YOUR API KEY
// ============================================================================
// To remove: Delete the mockReviews array and mockPlaceData object below
// ============================================================================

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
  author_url?: string;
  time: number;
}

interface PlaceData {
  reviews: GoogleReview[];
  total: number;
  requested: number;
  placeRating: number;
  totalRatings: number;
  placeName: string;
  placeAddress: string;
  source: string;
  message: string;
  cacheInfo?: {
    cached: boolean;
    lastFetched: string;
    expiresIn: string;
    source: string;
  };
}

interface GooglePlacesReviewsProps {
  placeId?: string;
  maxReviews?: number;
  showProfilePhotos?: boolean;
}

const GooglePlacesReviews = ({ 
  placeId = "ChIJobhEZgBJzDERWh99VyPERKs", // Default place ID
  maxReviews = 6,
  showProfilePhotos = true 
}: GooglePlacesReviewsProps) => {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const { toast } = useToast();

  // Temporary mock data (remove this later when you get your Google Places API key)
  const mockReviews = [
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

  const mockPlaceData = {
    reviews: mockReviews.slice(0, maxReviews),
    total: mockReviews.length,
    requested: maxReviews,
    placeRating: 4.9,
    totalRatings: 127,
    placeName: "Daily Love Wellness",
    placeAddress: "Your Business Address Here",
    source: "Google Places API (Mock Data)",
    message: "Temporary mock data - add GOOGLE_PLACES_API_KEY to see real reviews",
    cacheInfo: {
      cached: true,
      lastFetched: new Date().toISOString(),
      expiresIn: "24 hours",
      source: "Mock Data (Temporary)"
    }
  };

  const fetchPlacesReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if we have an API key
      const response = await fetch(
        getApiUrl(`/api/google-reviews/places?placeId=${placeId}&maxResults=${maxReviews}`)
      );

      if (response.ok) {
        const data = await response.json();
        
        // Check if this is an error response about missing API key
        if (data.error && data.error.includes('API key not configured')) {
          console.log('No API key configured - using mock data');
          setPlaceData(mockPlaceData);
          toast({
            title: "Mock Data Loaded",
            description: "Using temporary mock data. Add GOOGLE_PLACES_API_KEY to see real reviews.",
            variant: "default",
          });
        } else {
          setPlaceData(data);
          toast({
            title: "Reviews Loaded",
            description: `Successfully loaded ${data.reviews?.length || 0} reviews from Google`,
            variant: "default",
          });
        }
      } else {
        // If API fails, fall back to mock data
        console.log('API failed - using mock data as fallback');
        setPlaceData(mockPlaceData);
        toast({
          title: "Mock Data Loaded",
          description: "API failed - using temporary mock data",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      
      // Use mock data on any error
      setPlaceData(mockPlaceData);
      setError('Failed to fetch reviews - using mock data');
      
      toast({
        title: "Mock Data Loaded",
        description: "Error occurred - using temporary mock data",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacesReviews();
  }, [placeId, maxReviews]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Fetching Google Reviews...</p>
      </div>
    );
  }

  if (showSetup) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <Info className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">
            Google Places API Setup Required
          </h3>
          <p className="text-muted-foreground mb-6">
            This is the recommended way to fetch Google Reviews. You need to set up a Google Places API key.
          </p>
          
          <div className="bg-muted p-4 rounded-lg text-left mb-6">
            <h4 className="font-semibold mb-2">Setup Steps:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Cloud Console</a></li>
              <li>Enable Google Places API</li>
              <li>Create API key</li>
              <li>Add to .env file: <code className="bg-background px-2 py-1 rounded">GOOGLE_PLACES_API_KEY=your_key_here</code></li>
            </ol>
          </div>
          
          <Button onClick={fetchPlacesReviews} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-primary mb-2">Error Loading Reviews</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchPlacesReviews} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (!placeData || placeData.reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="max-w-md mx-auto">
          <Quote className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">No Reviews Found</h3>
          <p className="text-muted-foreground mb-4">
            No reviews were found for this business location.
          </p>
          <Button onClick={fetchPlacesReviews} variant="outline">
            Refresh Reviews
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with place info */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          <h3 className="text-xl font-semibold text-primary">{placeData.placeName}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{placeData.placeAddress}</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < placeData.placeRating 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {placeData.placeRating} ({placeData.totalRatings} reviews)
          </span>
        </div>
      </div>

      {/* Mock Data Notice */}
      {placeData?.source?.includes('Mock Data') && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-yellow-900 mb-1">
                🎭 Temporary Mock Data
              </h3>
              <p className="text-sm text-yellow-800 mb-2">
                This is sample data to show how the reviews section will look. To see real Google reviews:
              </p>
              <ol className="text-xs text-yellow-700 space-y-1 list-decimal list-inside">
                <li>Get your Google Places API key</li>
                <li>Add to .env file: <code className="bg-yellow-100 px-1 py-0.5 rounded">GOOGLE_PLACES_API_KEY=your_key</code></li>
                <li>Restart your server</li>
              </ol>
              <p className="text-xs text-yellow-600 mt-2">
                <strong>To remove mock data later:</strong> Delete the mockReviews array and mockPlaceData object from this component.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeData.reviews.map((review, index) => (
          <Card
            key={index}
            className="shadow-lg bg-card border-0 h-full hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {showProfilePhotos && review.profile_photo_url && (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-8 h-8 rounded-full"
                        loading="lazy"
                      />
                    )}
                    <h3 className="font-semibold text-primary">
                      {review.author_name}
                    </h3>
                    <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">
                      Google Review
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.relative_time_description}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-1 mb-4">
                <Quote className="h-5 w-5 text-blue-500/40 mb-2" />
                <p className="text-muted-foreground leading-relaxed text-sm italic">
                  "{review.text}"
                </p>
              </div>

              {/* Google Attribution */}
              <div className="mt-auto pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Verified Google Review</span>
                  {review.author_url && (
                    <a
                      href={review.author_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <span>View on Google</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Source Attribution */}
      <div className="text-center py-4 border-t border-border">
        <div className="space-y-2">
          {/* Cache Status */}
          {placeData.cacheInfo && (
            <div className="flex items-center justify-center space-x-2 text-xs">
              {placeData.cacheInfo.cached ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600">
                    {placeData.source?.includes('Mock Data') ? 'Mock Data' : 'Cached'} • Last updated: {new Date(placeData.cacheInfo.lastFetched).toLocaleDateString()} • Expires in: {placeData.cacheInfo.expiresIn}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-600">
                    Fresh data • Will be cached for 24 hours
                  </span>
                </>
              )}
            </div>
          )}
          
          {/* API Source */}
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-blue-500" />
            <span>Powered by Google Places API - {placeData.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GooglePlacesReviews;
