import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Optimized Vite configuration for AWS Amplify deployment
// Focuses on minimal bundle size and fast loading
export default defineConfig({
  plugins: [react()],

  // Build optimizations for production
  build: {
    // Enable minification for smaller bundle size
    minify: 'terser',

    // Optimize terser settings for maximum compression
    terserOptions: {
      compress: {
        // Remove console.logs in production
        drop_console: true,
        drop_debugger: true,
        // Remove unused code
        dead_code: true,
        // Optimize conditionals
        conditionals: true,
        // Optimize loops
        loops: true,
        // Remove unused variables
        unused: true
      },
      mangle: {
        // Mangle variable names for smaller size
        toplevel: true
      }
    },

    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        // Split vendor libraries into separate chunks
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // Lucide icons (largest dependency)
          'icons-vendor': ['lucide-react'],
          // Bootstrap CSS (separate chunk for caching)
          'bootstrap-vendor': ['bootstrap']
        },

        // Optimize chunk file names for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    // Target modern browsers for smaller bundle
    target: 'es2020',

    // Optimize CSS
    cssCodeSplit: true,

    // Source maps only for debugging (disable in production)
    sourcemap: false,

    // Optimize asset handling
    assetsInlineLimit: 4096, // Inline small assets

    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },

  // Dependency optimization
  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev server
    include: [
      'react',
      'react-dom'
    ],
    // Exclude lucide-react for better tree-shaking
    exclude: ['lucide-react']
  }
});
