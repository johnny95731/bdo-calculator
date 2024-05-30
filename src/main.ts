// Composables
import { createApp } from 'vue';

// Components
import App from './App.vue';
import { registerPlugins } from '@/plugins';
// Global class
import '@/styles/class.scss';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
