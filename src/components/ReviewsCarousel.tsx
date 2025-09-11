import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getApiUrl } from '@/config/googlePlaces';

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
}

interface ReviewsCarouselProps {
  placeId?: string;
  maxReviews?: number;
  showProfilePhotos?: boolean;
  autoPlay?: boolean;
  interval?: number;
  reviewsPerPage?: number;
}

const ReviewsCarousel = ({ 
  placeId = "ChIJobhEZgBJzDERWh99VyPERKs",
  maxReviews = 5,
  showProfilePhotos = true,
  autoPlay = true,
  interval = 6000,
  reviewsPerPage = 3
}: ReviewsCarouselProps) => {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const fetchPlacesReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        getApiUrl(`/api/google-reviews/places?placeId=${placeId}&maxResults=${maxReviews}`)
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data.error) {
          console.log('API error:', data.error);
          setError(data.error);
          setPlaceData(null);
        } else {
          // Sort reviews by date (most recent first)
          const sortedData = {
            ...data,
            reviews: data.reviews.sort((a: GoogleReview, b: GoogleReview) => b.time - a.time)
          };
          setPlaceData(sortedData);
        }
      } else {
        console.log('API failed');
        setError('Failed to fetch reviews');
        setPlaceData(null);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to fetch reviews');
      setPlaceData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacesReviews();
  }, [placeId, maxReviews]);

  // Calculate total pages
  const totalPages = placeData ? Math.ceil(placeData.reviews.length / reviewsPerPage) : 0;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !placeData || totalPages <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, placeData, totalPages]);

  const goToPrevious = () => {
    if (!placeData || totalPages <= 1) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    if (!placeData || totalPages <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleExpanded = (reviewIndex: number) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewIndex)) {
        newSet.delete(reviewIndex);
      } else {
        newSet.add(reviewIndex);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading reviews...</p>
      </div>
    );
  }

  if (error || !placeData || placeData.reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews available at this time.</p>
      </div>
    );
  }

  // Get current page reviews
  const startIndex = currentIndex * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = placeData.reviews.slice(startIndex, endIndex);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-in-out">
        {currentReviews.map((review, index) => (
          <div key={startIndex + index} className={`shadow-lg wellness-glow bg-card border-0 rounded-2xl transition-all duration-300 ${
            expandedReviews.has(startIndex + index) ? 'h-auto min-h-[450px]' : 'h-[450px]'
          }`}>
            <div className="p-8 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {showProfilePhotos && review.profile_photo_url && (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-10 h-10 rounded-full border-2 border-wellness-sage/20"
                        loading="lazy"
                      />
                    )}
                    <div>
                      <h3 className="font-serif font-semibold text-primary text-lg">
                        {review.author_name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {review.relative_time_description}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center bg-wellness-sage/10 text-wellness-sage px-3 py-1 rounded-full text-xs font-medium">
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google Review
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-wellness-warm text-wellness-warm"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-1 mb-6 overflow-hidden">
                <div className="relative h-full">
                  <svg className="absolute -top-2 -left-2 h-6 w-6 text-wellness-sage/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.066.916-3.982 2.666-3.982 5.849 0 2.655 1.415 4.119 3.002 5.65l-1.999 2.33zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.066.916-3.982 2.666-3.982 5.849 0 2.655 1.415 4.119 3.002 5.65l-1.999 2.33z"/>
                  </svg>
                  <div className="pl-4">
                    <p className={`text-muted-foreground leading-relaxed text-base italic transition-all duration-300 ${
                      expandedReviews.has(startIndex + index) ? '' : 'line-clamp-6'
                    }`}>
                      "{review.text}"
                    </p>
                    {review.text.length > 200 && (
                      <button
                        onClick={() => toggleExpanded(startIndex + index)}
                        className="mt-2 flex items-center space-x-1 text-wellness-sage hover:text-wellness-sage/80 transition-colors text-sm font-medium"
                      >
                        <span>
                          {expandedReviews.has(startIndex + index) ? 'Show less' : 'Read more'}
                        </span>
                        {expandedReviews.has(startIndex + index) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-6 border-t border-wellness-sage/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-wellness-sage font-medium">Verified Customer</span>
                  {review.author_url && (
                    <a
                      href={review.author_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-wellness-sage hover:text-wellness-sage/80 transition-colors font-medium"
                    >
                      <span>View on Google</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-12 space-x-6">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="bg-wellness-sage/10 hover:bg-wellness-sage/20 text-wellness-sage border-wellness-sage/30 shadow-lg backdrop-blur-sm w-12 h-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Play/Pause Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
            className="bg-wellness-sage/10 hover:bg-wellness-sage/20 text-wellness-sage border-wellness-sage/30 shadow-lg backdrop-blur-sm w-12 h-12"
          >
            {isPlaying ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </Button>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="bg-wellness-sage/10 hover:bg-wellness-sage/20 text-wellness-sage border-wellness-sage/30 shadow-lg backdrop-blur-sm w-12 h-12"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Page Indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-wellness-sage scale-110 shadow-lg"
                  : "bg-wellness-sage/30 hover:bg-wellness-sage/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsCarousel;
