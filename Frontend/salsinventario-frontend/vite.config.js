import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const customJsxLoader = {
  name: 'custom-jsx-loader',
  transform(code, id) {
    if (id.endsWith('.js')) {
      return {
        code: code.replace(/\.js$/, '.jsx'), // Cambia la extensión a ".jsx"
        map: null,
      };
    }
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), customJsxLoader],
})
