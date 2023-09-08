import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // Configura un alias para .js para .jsx si deseas que los archivos .js se interpreten como .jsx
      '/.js$': '.jsx',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  // Otras configuraciones de Vite...
});
