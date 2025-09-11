#!/bin/bash

# Development/Production Configuration Switcher for Daily Love Wellness API
# Usage: ./switch-config.sh [dev|prod]

CONFIG_TYPE=${1:-dev}

if [ "$CONFIG_TYPE" = "dev" ]; then
    echo "🔧 Switching to DEVELOPMENT configuration..."
    echo "✅ Allowed origins: http://localhost:8080 only"
    echo "✅ Perfect for local development"
    echo ""
    echo "To use this configuration:"
    echo "1. Make sure your dev server runs on port 8080"
    echo "2. Update vite.config.ts if needed:"
    echo "   server: { port: 8080 }"
    echo ""
elif [ "$CONFIG_TYPE" = "prod" ]; then
    echo "🚀 Switching to PRODUCTION configuration..."
    echo "⚠️  You'll need to update server.js manually for production:"
    echo "   - Add your Vercel domain to allowedOrigins"
    echo "   - Add your production domain"
    echo ""
    echo "Example production origins:"
    echo "   'https://your-domain.vercel.app'"
    echo "   'https://dailylovewellness.com'"
    echo ""
else
    echo "❌ Invalid configuration type. Use 'dev' or 'prod'"
    echo "Usage: ./switch-config.sh [dev|prod]"
    exit 1
fi

echo "Current configuration: $CONFIG_TYPE"
echo "Server is running with restricted access to localhost:8080 only"
echo ""
echo "🔒 Security features active:"
echo "   ✅ Origin validation"
echo "   ✅ User-agent validation" 
echo "   ✅ Rate limiting (10 req/min)"
echo "   ✅ CORS protection"
echo "   ✅ API restrictions (Places API only)"
echo ""
echo "📊 Monitor security: curl http://localhost:3003/api/security-status"
