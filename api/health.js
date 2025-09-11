import cors from 'cors';

// Environment-based CORS configuration
const getAllowedOrigins = () => {
  const baseOrigins = [
    'http://localhost:8080', // Development
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev port
  ];
  
  // Add production domains if they exist
  const productionDomains = [
    'https://daily-love-wellness.vercel.app',
    'https://dailylovewellness.com',
    'https://www.dailylovewellness.com'
  ];
  
  // Add Vercel preview URLs
  if (process.env.VERCEL_URL) {
    productionDomains.push(`https://${process.env.VERCEL_URL}`);
  }
  
  // In production or Vercel environment, add all domains
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return [...baseOrigins, ...productionDomains];
  }
  
  // In development, include all origins for flexibility
  return [...baseOrigins, ...productionDomains];
};

export default async function handler(req, res) {
  // Enable CORS
  const corsMiddleware = cors({
    origin: getAllowedOrigins(),
    credentials: true
  });
  
  // Apply CORS middleware
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'Daily Love Wellness API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    vercel: !!process.env.VERCEL,
    security: {
      rateLimitEnabled: true,
      originValidation: true,
      userAgentValidation: true,
      apiRestrictions: 'Places API only'
    }
  });
}
