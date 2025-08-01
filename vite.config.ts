import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build configuration optimized for Fire TV
  build: {
    // Target modern browsers but ensure compatibility
    target: 'es2020',
    
    // Optimize for TV displays
    rollupOptions: {
      output: {
        // Ensure proper module format for TV browsers
        format: 'es',
        
        // Optimize chunk splitting for TV performance
        manualChunks: {
          vendor: ['react', 'react-dom'],
          rive: ['@rive-app/react-canvas'],
          router: ['react-router-dom']
        }
      }
    },
    
    // Enable source maps for debugging
    sourcemap: true,
    
    // Optimize bundle size
    minify: 'esbuild'
  },
  
  // Development server configuration
  server: {
    host: '0.0.0.0', // Allow external connections for TV testing
    port: 5173,
    strictPort: true,
    
    // Enable HTTPS for secure connections (set to true if needed for TV testing)
    // https: true,
    
    // CORS headers for TV browser compatibility
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  },
  
  // Optimize for TV displays
  css: {
    // Enable CSS source maps
    devSourcemap: true
  },
  
  // Define global constants
  define: {
    // Enable React DevTools in development
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    
    // TV-specific constants
    __TV_PLATFORM__: JSON.stringify('fire-tv'),
    __ANIMATION_BENCHMARK__: JSON.stringify(true)
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@rive-app/react-canvas',
      'react-router-dom'
    ]
  }
})
