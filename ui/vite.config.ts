import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

interface RewriteComfyImportsOptions {
  isDev: boolean;
}

// Plugin to correctly handle the ComfyUI scripts in development mode
const rewriteComfyImports = ({ isDev }: RewriteComfyImportsOptions) => {
  return {
    name: "rewrite-comfy-imports",
    resolveId(source: string) {
      if (!isDev) {
        return;
      }
      if (source === "/scripts/app.js") {
        // For development, we'll provide a mock implementation
        return path.resolve(__dirname, 'src/mocks/comfyui-mock.js');
      }
      if (source === "/scripts/api.js") {
        // For development, we'll provide a mock implementation
        return path.resolve(__dirname, 'src/mocks/comfyui-mock.js');
      }
      return null;
    },
  };
};

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    rewriteComfyImports({ isDev: mode === "development" })
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      // Don't bundle ComfyUI scripts - they will be loaded from the ComfyUI server
      external: ['/scripts/app.js', '/scripts/api.js'],
      input: {
        main: path.resolve(__dirname, mode === "development" ? 'src/main-standalone.tsx' : 'src/main.tsx'),
      },
      output: {
        // Output to the dist/example_ext directory
        dir: '../dist',
        entryFileNames: 'example_ext/[name].js',
        chunkFileNames: 'example_ext/[name]-[hash].js',
        assetFileNames: 'example_ext/[name][extname]',
        // Split React into a separate vendor chunk for better caching
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        }
      }
    }
  }
}))