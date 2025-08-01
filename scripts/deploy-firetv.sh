#!/bin/bash

# Fire TV Deployment Script
# This script builds the project and deploys it to a Fire TV device

set -e

echo "🚀 Fire TV Animation Benchmarking Tool - Deployment Script"
echo "========================================================"

# Configuration
DEVICE_IP="192.168.50.150:5555"  # Your Fire TV device IP
BUILD_DIR="dist"
REMOTE_DIR="/sdcard/Download/fire-tv-benchmark"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if device is connected
check_device() {
    print_status "Checking device connection..."
    if adb devices | grep -q "$DEVICE_IP.*device"; then
        print_success "Device $DEVICE_IP is connected and authorized"
    else
        print_error "Device $DEVICE_IP is not connected or not authorized"
        print_status "Available devices:"
        adb devices
        exit 1
    fi
}

# Build the project
build_project() {
    print_status "Building project for production..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Build completed successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# Deploy to Fire TV
deploy_to_device() {
    print_status "Deploying to Fire TV device $DEVICE_IP..."
    
    # Create remote directory
    adb -s $DEVICE_IP shell mkdir -p $REMOTE_DIR
    
    # Push build files to device
    print_status "Uploading build files..."
    adb -s $DEVICE_IP push $BUILD_DIR/* $REMOTE_DIR/
    
    if [ $? -eq 0 ]; then
        print_success "Files uploaded successfully"
    else
        print_error "File upload failed"
        exit 1
    fi
}

# Open in Fire TV browser
open_in_browser() {
    print_status "Opening application in Fire TV browser..."
    
    # Get the device's local IP (remove port)
    DEVICE_IP_ONLY=$(echo $DEVICE_IP | cut -d: -f1)
    
    # Open the HTML file in the default browser
    adb -s $DEVICE_IP shell am start -a android.intent.action.VIEW \
        -d "file://$REMOTE_DIR/index.html" \
        -t "text/html"
    
    print_success "Application opened in Fire TV browser"
    print_status "You can also manually navigate to: file://$REMOTE_DIR/index.html"
}

# Show device info
show_device_info() {
    print_status "Device information:"
    echo "Device IP: $DEVICE_IP"
    echo "Remote directory: $REMOTE_DIR"
    echo "Build directory: $BUILD_DIR"
    echo ""
}

# Main deployment process
main() {
    show_device_info
    check_device
    build_project
    deploy_to_device
    open_in_browser
    
    print_success "Deployment completed successfully!"
    print_status "The animation benchmarking tool is now running on your Fire TV"
    print_status "Use the Fire TV remote to navigate and test the animations"
}

# Run main function
main "$@" 