/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
// Plugins
import vuetify from './vuetify';
import { createPinia } from 'pinia';
import { router } from './route.ts';

// Types
import type { App } from 'vue';


export function registerPlugins (app: App) {
  app.use(vuetify);
  app.use(createPinia());
  app.use(router);
}
