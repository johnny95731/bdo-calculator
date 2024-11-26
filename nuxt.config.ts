import { join } from 'path';
import { fileURLToPath, URL } from 'url';

import { defineNuxtConfig } from 'nuxt/config';
import dynamicImport from 'vite-plugin-dynamic-import';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import ViteFonts from 'unplugin-fonts/vite';


const srcDir = 'src';
const fromSrcDir = (path: string) => {
  return fileURLToPath(new URL(join(srcDir, path), import.meta.url));
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  ssr: true,
  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    devLogs: true,
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  srcDir,
  alias: {
    'stores': fromSrcDir('features/stores'),
    'types': fromSrcDir('features/types'),
    'utils': fromSrcDir('utils'),
  },
  dir:{
    pages: 'views'
  },

  build: {
    transpile: ['vuetify'],
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    fromSrcDir('assets/global-class.scss'),
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@nuxt/eslint',
    '@pinia/nuxt',
  ],

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    vue: {
      template: { transformAssetUrls }
    },
    plugins: [
      dynamicImport(),
      ViteFonts({
        google: {
          families: [{
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          }],
        },
      }),
    ],
  },
  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     failOnError: false,
  //   },
  // },
});
