# Fire TV Animation Benchmarking Tool

A comprehensive React-based tool for benchmarking animation performance on Fire TV devices. Features real-time performance monitoring, multiple animation types, and optimized TV navigation.

## Features

- 🎬 **Multiple Animation Types**: Rive animations and CSS+SVG spinners
- 📊 **Real-time Performance Monitoring**: FPS, memory usage, and CPU tracking
- 🎮 **TV-Optimized Navigation**: D-pad support with keyboard simulation
- 🌙 **Dark Theme**: Optimized for TV viewing
- 🚀 **Automated Deployment**: Scripts for easy Fire TV deployment
- 📈 **Performance Metrics**: Color-coded indicators and detailed analytics

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- ADB (Android Debug Bridge) installed
- Fire TV device connected to the same network
- Rive animation files (`.riv` files)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paperli/firtv-animation-benchmark.git
   cd firtv-animation-benchmark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   ./scripts/setup-env.sh
   ```
   Or manually copy `env.example` to `.env` and update the values.

4. **Add your Rive files**
   ```bash
   cp your-animations.riv public/assets/rive/
   ```

5. **Deploy to Fire TV**
   ```bash
   ./scripts/deploy-firetv.sh
   ```

## Environment Configuration

The tool uses environment variables for configuration. Create a `.env` file based on `env.example`:

```bash
# Fire TV Device Configuration
FIRE_TV_DEVICE_IP=192.168.50.150:5555

# Development Server Configuration
DEV_SERVER_IP=192.168.50.157
DEV_SERVER_PORT=5173

# HTTP Server Configuration
HTTP_SERVER_PORT=8080
```

### Setup Script

Use the interactive setup script to configure your environment:

```bash
./scripts/setup-env.sh
```

This script will:
- Prompt for your Fire TV device IP
- Auto-detect your computer's IP address
- Configure development and HTTP server ports
- Create the `.env` file automatically

## Deployment Scripts

### Main Deployment
```bash
./scripts/deploy-firetv.sh
```
Builds the project and deploys to your configured Fire TV device.

### Quick Deployment
```bash
./scripts/deploy-simple.sh
```
Automatically detects available Fire TV devices and deploys.

### Development Server
```bash
./scripts/open-dev-server.sh
```
Opens the development server URL on your Fire TV.

### HTTP Server
```bash
./scripts/open-http-server.sh
```
Opens the HTTP server URL on your Fire TV.

## Usage

### Navigation Controls

- **Arrow Keys**: Navigate between animations
- **Enter/Return**: Select animation
- **Escape**: Go back
- **M Key**: Toggle performance monitoring
- **D Key**: Toggle detailed metrics view

### Performance Monitoring

The tool provides real-time performance metrics:

- **FPS**: Frame rate with color coding (green ≥55, yellow 45-54, red <45)
- **Memory**: Used memory in MB and percentage
- **CPU**: CPU load estimation
- **Frame Time**: Average time per frame
- **Dropped Frames**: Count of frames exceeding target time

### Animation Types

1. **Rive Spinner 1**: Uses `ui_components.riv` with 'spinner' artboard
2. **Rive Spinner 2**: Uses `launch_loading.riv` with default artboard
3. **CSS+SVG Spinner**: Pure CSS animation with SVG

## Development

### Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   └── styles/             # CSS design system
├── scripts/                # Deployment and setup scripts
├── public/assets/rive/     # Rive animation files
└── .taskmaster/           # Project management
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Animations

1. Add your `.riv` file to `public/assets/rive/`
2. Create a new component in `src/components/`
3. Add the animation to the `animations` array in `src/App.tsx`

## Troubleshooting

### Fire TV Connection Issues

1. **Check ADB connection**:
   ```bash
   adb devices
   ```

2. **Enable ADB on Fire TV**:
   - Go to Settings > Device & Software > Developer Options
   - Enable ADB debugging

3. **Connect via network**:
   ```bash
   adb connect YOUR_FIRE_TV_IP:5555
   ```

### Performance Issues

- Ensure your Fire TV is on the same network as your development machine
- Check that the correct IP addresses are configured in `.env`
- Verify that ports are not blocked by firewall

### Build Issues

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`
- Verify all dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on Fire TV device
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the troubleshooting section
- Review the deployment scripts
- Ensure your environment is properly configured
