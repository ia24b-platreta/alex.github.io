import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/alex.github.io/',
  plugins: [react()],
});
