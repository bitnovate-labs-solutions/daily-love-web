import React, { useEffect, useState } from 'react';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { IMAGE_OPTIMIZATION_CONFIG } from '@/config/imageOptimization';

interface ImagePerformanceMonitorProps {
  showMetrics?: boolean;
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void;
}

interface PerformanceMetrics {
  totalImages: number;
  loadedImages: number;
  progress: number;
  averageLoadTime: number;
  isComplete: boolean;
}

const ImagePerformanceMonitor: React.FC<ImagePerformanceMonitorProps> = ({
  showMetrics = false,
  onPerformanceUpdate
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalImages: 0,
    loadedImages: 0,
    progress: 0,
    averageLoadTime: 0,
    isComplete: false
  });

  const [loadTimes, setLoadTimes] = useState<Map<string, number>>(new Map());
  const [startTime] = useState<number>(performance.now());

  const { loadedImages, isComplete, progress, totalImages } = useImagePreloader({
    images: IMAGE_OPTIMIZATION_CONFIG.CRITICAL_IMAGES,
    onProgress: (loaded, total) => {
      const currentTime = performance.now();
      const loadTime = currentTime - startTime;
      
      setLoadTimes(prev => {
        const newMap = new Map(prev);
        newMap.set(`image-${loaded}`, loadTime);
        return newMap;
      });

      const newMetrics: PerformanceMetrics = {
        totalImages: total,
        loadedImages: loaded,
        progress: (loaded / total) * 100,
        averageLoadTime: Array.from(loadTimes.values()).reduce((a, b) => a + b, loadTime) / loaded,
        isComplete: loaded === total
      };

      setMetrics(newMetrics);
      onPerformanceUpdate?.(newMetrics);
    },
    onComplete: () => {
      const finalMetrics: PerformanceMetrics = {
        ...metrics,
        isComplete: true
      };
      setMetrics(finalMetrics);
      onPerformanceUpdate?.(finalMetrics);
    }
  });

  // Log performance metrics to console in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isComplete) {
      console.log('🖼️ Image Performance Metrics:', {
        totalImages: metrics.totalImages,
        loadedImages: metrics.loadedImages,
        progress: `${metrics.progress.toFixed(1)}%`,
        averageLoadTime: `${metrics.averageLoadTime.toFixed(2)}ms`,
        totalLoadTime: `${(performance.now() - startTime).toFixed(2)}ms`
      });
    }
  }, [isComplete, metrics, startTime]);

  if (!showMetrics) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs backdrop-blur-sm z-50">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span>Images: {loadedImages}/{totalImages}</span>
          <span>{metrics.progress.toFixed(0)}%</span>
        </div>
        <div className="w-32 bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${metrics.progress}%` }}
          />
        </div>
        {isComplete && (
          <div className="text-green-400 text-center">
            ✓ All images loaded
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePerformanceMonitor;
