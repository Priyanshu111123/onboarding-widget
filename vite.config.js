import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.jsx',
      name: 'OnboardingWidget',
      fileName: 'onboarding-widget',
      formats: ['umd'], // universal format for script tag usage
    },
  },
});
