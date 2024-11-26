// Composables
import { createVuetify } from 'vuetify';
import { defaults } from 'utils/vuetify/defaults';
import { light } from 'utils/vuetify/light';


export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'light',
      themes: {
        light,
      },
    },
    defaults
  });
  app.vueApp.use(vuetify);
});
