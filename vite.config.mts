// Plugins
import Vue from '@vitejs/plugin-vue';
import dynamicImport from 'vite-plugin-dynamic-import';
import tsconfigPaths from 'vite-tsconfig-paths';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import ViteFonts from 'unplugin-fonts/vite';

// Utilities
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    dynamicImport(),
    tsconfigPaths(),
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify(),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url)),
    //   'components': fileURLToPath(new URL('./src/components', import.meta.url)),
    //   'types': fileURLToPath(new URL('./src/features/types', import.meta.url)),
    // },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
});
