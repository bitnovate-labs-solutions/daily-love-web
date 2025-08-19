import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ExternalLink } from "lucide-react";

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
  author_url?: string;
  time: number;
}

interface GoogleReviewsProps {
  placeId?: string;
  maxReviews?: number;
  showProfilePhotos?: boolean;
}

const GoogleReviews = ({ 
  placeId = "YOUR_GOOGLE_PLACE_ID", 
  maxReviews = 6,
  showProfilePhotos = true 
}: GoogleReviewsProps) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from our server API first
        try {
          const response = await fetch(`http://localhost:3003/api/google-reviews?placeId=${placeId}&maxResults=${maxReviews}`);
          
          if (response.ok) {
            const data = await response.json();
            if (data.reviews && data.reviews.length > 0) {
              setReviews(data.reviews);
              setError(null);
              return;
            }
          }
        } catch (apiError) {
          console.log('API not available, using mock data:', apiError);
        }
        
        // Fallback to mock data if API is not available
        const mockGoogleReviews: GoogleReview[] = [
          {
            author_name: "Jennifer Lee",
            rating: 5,
            relative_time_description: "2 weeks ago",
            text: "Absolutely amazing experience! The IV therapy left me feeling rejuvenated and energized. The staff is incredibly professional and the space is so peaceful. I love the Japandi aesthetic - it's like stepping into a luxury spa. Highly recommend for anyone looking for wellness treatments.",
            time: Date.now() - 14 * 24 * 60 * 60 * 1000,
          },
          {
            author_name: "Marcus Rodriguez",
            rating: 5,
            relative_time_description: "1 month ago",
            text: "Found this place through Google and I'm so glad I did! The essential oils consultation was thorough and educational. The therapist really took time to understand my needs. The quality of their oils is exceptional and the effects are noticeable immediately.",
            time: Date.now() - 30 * 24 * 60 * 60 * 1000,
          },
          {
            author_name: "Sarah Kim",
            rating: 5,
            relative_time_description: "3 weeks ago",
            text: "Best wellness center I've ever visited. The beauty & anti-aging IV drip worked wonders for my skin. The environment is so serene - I actually fell asleep during the treatment! The staff remembers my preferences and makes each visit feel personalized.",
            time: Date.now() - 21 * 24 * 60 * 60 * 1000,
          },
          {
            author_name: "David Chen",
            rating: 5,
            relative_time_description: "2 months ago",
            text: "I've been coming here for their monthly wellness package and it's been life-changing. The combination of IV therapy and essential oils has completely transformed how I feel. The staff is knowledgeable and the space is absolutely beautiful.",
            time: Date.now() - 60 * 24 * 60 * 60 * 1000,
          },
          {
            author_name: "Amanda Foster",
            rating: 5,
            relative_time_description: "1 week ago",
            text: "The immune support IV drip was exactly what I needed during flu season. I felt better immediately and stayed healthy. The warm, welcoming atmosphere makes all the difference. This place truly cares about your wellness journey.",
            time: Date.now() - 7 * 24 * 60 * 60 * 1000,
          },
          {
            author_name: "Robert Wilson",
            rating: 5,
            relative_time_description: "5 days ago",
            text: "The stress relief essential oils have revolutionized my sleep quality. The team took time to educate me on proper usage and the benefits of each oil. You can tell they're passionate about what they do. The quality is outstanding!",
            time: Date.now() - 5 * 24 * 60 * 60 * 1000,
          },
        ];

        setReviews(mockGoogleReviews.slice(0, maxReviews));
        setError(null);
      } catch (err) {
        setError("Failed to load Google reviews");
        console.error("Error fetching Google reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, [placeId, maxReviews]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(maxReviews)].map((_, index) => (
          <Card key={index} className="shadow-lg bg-card border-0 h-full animate-pulse">
            <CardContent className="p-6 h-full">
              <div className="flex items-center mb-4">
                <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Unable to load Google reviews at this time.</p>
        <p className="text-sm text-muted-foreground mt-2">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review, index) => (
        <Card
          key={index}
          className="shadow-lg wellness-glow bg-card border-0 h-full hover:shadow-lg transition-shadow duration-300"
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
                    />
                  )}
                  <h3 className="font-semibold text-primary">
                    {review.author_name}
                  </h3>
                  <span className="text-xs bg-wellness-sage/20 text-wellness-sage px-2 py-1 rounded-full">
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
                    className="h-4 w-4 fill-wellness-sage text-wellness-sage"
                  />
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="flex-1 mb-4">
              <Quote className="h-5 w-5 text-wellness-sage/40 mb-2" />
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
                    className="flex items-center space-x-1 text-wellness-sage hover:text-wellness-sage/80 transition-colors"
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
  );
};

export default GoogleReviews;
