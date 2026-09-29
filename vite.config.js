import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function pwaVersionPlugin() {
  return {
    name: 'pwa-version-plugin',
    buildStart() {
      const buildTime = Date.now();
      const versionData = {
        version: String(buildTime),
        builtAt: new Date(buildTime).toISOString(),
      };
      
      const publicDir = path.resolve(__dirname, 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      // 1. Write version.json
      fs.writeFileSync(
        path.join(publicDir, 'version.json'),
        JSON.stringify(versionData, null, 2),
        'utf8'
      );

      // 2. Update CACHE_NAME in public/sw.js
      const swPath = path.join(publicDir, 'sw.js');
      if (fs.existsSync(swPath)) {
        let swContent = fs.readFileSync(swPath, 'utf8');
        swContent = swContent.replace(
          /const CACHE_NAME = ['"][^'"]+['"];/,
          `const CACHE_NAME = 'cottoncalc-v-${buildTime}';`
        );
        fs.writeFileSync(swPath, swContent, 'utf8');
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pwaVersionPlugin()],
  server: {
    port: 3000,
    open: true,
  },
});
