#!/bin/bash

# Open Development Server on Fire TV
# This script opens the local dev server URL on your Fire TV

DEVICE_IP="192.168.50.150:5555"
DEV_SERVER_IP="192.168.50.157"
DEV_SERVER_PORT="5173"
DEV_SERVER_URL="http://$DEV_SERVER_IP:$DEV_SERVER_PORT"

echo "🌐 Opening Development Server on Fire TV"
echo "========================================"
echo "Server URL: $DEV_SERVER_URL"
echo "Device: $DEVICE_IP"
echo ""

# Open the development server URL in Fire TV browser
adb -s $DEVICE_IP shell am start -a android.intent.action.VIEW \
    -d "$DEV_SERVER_URL" \
    -t "text/html"

echo "✅ Development server opened on Fire TV!"
echo "📱 The application should now load properly in Silk browser"
echo "🔗 URL: $DEV_SERVER_URL" 