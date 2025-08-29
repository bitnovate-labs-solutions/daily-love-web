import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, X } from "lucide-react";
import { Button } from "./button";

interface CarouselProps {
  images: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showPlayPause?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  showPlayPause = true,
  className = "",
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Calculate how many pages we need (1 image per page on mobile, 3 on desktop)
  const imagesPerPage = window.innerWidth < 768 ? 1 : 3;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, totalPages]);

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const goToPrevious = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const goToNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const openImagePreview = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  const goToNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const goToPreviousImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  if (!images || images.length === 0) return null;

  // Get current page images
  const startIndex = currentPage * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  return (
    <>
      <div className={`relative w-full ${className}`}>
        {/* Main Grid Container */}
        <div className="relative w-full overflow-hidden rounded-lg">
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2">
            {currentImages.map((image, index) => (
              <div
                key={startIndex + index}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => openImagePreview(startIndex + index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                    <div className="bg-black/50 px-3 py-2 rounded-lg">
                      <p className="text-sm font-medium">Click to view</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Fill empty slots with placeholder if needed */}
            {currentImages.length < imagesPerPage && 
              Array.from({ length: imagesPerPage - currentImages.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                >
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              ))
            }
          </div>
        </div>

        {/* Navigation Arrows */}
        {showArrows && totalPages > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border-white/20 shadow-lg backdrop-blur-sm z-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border-white/20 shadow-lg backdrop-blur-sm z-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Play/Pause Button - Hidden */}
        {/* {showPlayPause && totalPages > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 border-white/20 shadow-lg backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        )} */}

        {/* Page Dots Indicator - Hidden on Mobile */}
        {showDots && totalPages > 1 && (
          <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Page Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          Page {currentPage + 1} / {totalPages}
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={closeImagePreview}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 border-white/20 shadow-lg backdrop-blur-sm z-10"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border-white/20 shadow-lg backdrop-blur-sm z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border-white/20 shadow-lg backdrop-blur-sm z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image */}
          <div className="relative w-full h-full max-w-7xl">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="w-full h-full object-contain rounded-lg"
            />
            

          </div>


        </div>
      )}
    </>
  );
};

export default Carousel;
