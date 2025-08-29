import { useEffect, useState } from 'react';

interface UseImagePreloaderProps {
  images: string[];
  onComplete?: () => void;
  onProgress?: (loaded: number, total: number) => void;
}

export const useImagePreloader = ({ 
  images, 
  onComplete, 
  onProgress 
}: UseImagePreloaderProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (images.length === 0) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          setLoadedImages(prev => {
            const newSet = new Set(prev);
            newSet.add(src);
            return newSet;
          });
          
          onProgress?.(loadedImages.size + 1, images.length);
          resolve();
        };
        
        img.onerror = () => {
          console.warn(`Failed to preload image: ${src}`);
          resolve(); // Continue even if some images fail
        };
        
        img.src = src;
      });
    };

    const preloadAllImages = async () => {
      try {
        await Promise.allSettled(images.map(preloadImage));
        setIsComplete(true);
        onComplete?.();
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsComplete(true);
        onComplete?.();
      }
    };

    preloadAllImages();
  }, [images, onComplete, onProgress]);

  const progress = images.length > 0 ? (loadedImages.size / images.length) * 100 : 0;

  return {
    loadedImages: Array.from(loadedImages),
    isComplete,
    progress,
    totalImages: images.length
  };
};
