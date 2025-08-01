#!/bin/bash

# Simple Fire TV Deployment Script
# Automatically detects and uses available devices

set -e

echo "🚀 Fire TV Animation Benchmarking Tool - Quick Deploy"
echo "==================================================="

# Build the project first
echo "📦 Building project..."
npm run build

# Find the first available device
DEVICE=$(adb devices | grep "device$" | head -1 | awk '{print $1}')

if [ -z "$DEVICE" ]; then
    echo "❌ No authorized devices found. Please check your Fire TV connections."
    echo "Available devices:"
    adb devices
    exit 1
fi

echo "📱 Using device: $DEVICE"

# Deploy to device
echo "📤 Deploying to Fire TV..."
REMOTE_DIR="/sdcard/Download/fire-tv-benchmark"

# Create directory and push files
adb -s $DEVICE shell mkdir -p $REMOTE_DIR
adb -s $DEVICE push dist/* $REMOTE_DIR/

echo "✅ Deployment completed!"
echo "🌐 Opening in Fire TV browser..."

# Open in browser
adb -s $DEVICE shell am start -a android.intent.action.VIEW \
    -d "file://$REMOTE_DIR/index.html" \
    -t "text/html"

echo "🎉 Application is now running on your Fire TV!"
echo "📺 Use your Fire TV remote to navigate and test the animations"
echo "🔗 Manual URL: file://$REMOTE_DIR/index.html" 