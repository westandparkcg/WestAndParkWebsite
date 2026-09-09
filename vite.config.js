import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        project: resolve(__dirname, 'project.html'),
        services: resolve(__dirname, 'services.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        raffle: resolve(__dirname, 'raffle.html'),
        raffleAdmin: resolve(__dirname, 'raffle-admin.html'),
        raffleFlyer: resolve(__dirname, 'raffle-flyer.html'),
      },
    },
  },
});
