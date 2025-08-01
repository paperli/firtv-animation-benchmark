#!/bin/bash

# Open HTTP Server on Fire TV
# This script opens the HTTP server URL on your Fire TV

DEVICE_IP="192.168.50.150:5555"
HTTP_SERVER_IP="192.168.50.157"
HTTP_SERVER_PORT="8080"
HTTP_SERVER_URL="http://$HTTP_SERVER_IP:$HTTP_SERVER_PORT"

echo "🌐 Opening HTTP Server on Fire TV"
echo "================================="
echo "Server URL: $HTTP_SERVER_URL"
echo "Device: $DEVICE_IP"
echo ""

# Open the HTTP server URL in Fire TV browser
adb -s $DEVICE_IP shell am start -a android.intent.action.VIEW \
    -d "$HTTP_SERVER_URL" \
    -t "text/html"

echo "✅ HTTP server opened on Fire TV!"
echo "📱 The application should now load properly in Silk browser"
echo "🔗 URL: $HTTP_SERVER_URL" 