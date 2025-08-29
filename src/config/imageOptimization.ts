// Image optimization configuration
export const IMAGE_OPTIMIZATION_CONFIG = {
  // Critical images that should be preloaded
  CRITICAL_IMAGES: [
    '/dailylove_banner.png',
    '/dailylove_logo.png',
    '/src/assets/daily_love_shop.jpg',
    '/src/assets/daily_love_bed.jpg',
    '/src/assets/iv_drip_therapy.jpg',
    '/src/assets/essential-oils.jpg'
  ],

  // Images that should load eagerly (above the fold)
  PRIORITY_IMAGES: [
    '/dailylove_banner.png',
    '/dailylove_logo.png',
    '/src/assets/shop_board.jpg'
  ],

  // Lazy loading threshold (pixels before image comes into view)
  LAZY_LOAD_THRESHOLD: 50,

  // Image quality settings
  QUALITY: {
    HIGH: 0.9,
    MEDIUM: 0.8,
    LOW: 0.6
  },

  // Responsive image breakpoints
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE: 1280
  },

  // Placeholder settings
  PLACEHOLDER: {
    WIDTH: 20,
    HEIGHT: 20,
    BLUR: 10
  },

  // WebP support detection
  WEBP_SUPPORTED: typeof window !== 'undefined' && 
    document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0
};

// Image preloading strategy
export const PRELOAD_STRATEGY = {
  // Critical images load immediately
  CRITICAL: 'eager',
  
  // Above-fold images load with high priority
  ABOVE_FOLD: 'eager',
  
  // Below-fold images load lazily
  BELOW_FOLD: 'lazy',
  
  // Gallery images load on demand
  GALLERY: 'lazy'
};

// Generate responsive image sizes
export const generateImageSizes = (breakpoints: number[]) => {
  return breakpoints
    .map(bp => `(min-width: ${bp}px) ${100 / Math.ceil(12 / bp)}vw`)
    .join(', ');
};

// Get optimal image format
export const getOptimalFormat = (originalFormat: string): string => {
  if (IMAGE_OPTIMIZATION_CONFIG.WEBP_SUPPORTED && originalFormat === 'jpg') {
    return 'webp';
  }
  return originalFormat;
};
