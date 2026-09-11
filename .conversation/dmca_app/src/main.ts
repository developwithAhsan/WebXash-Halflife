import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import './assets/main.css';

// Guard against third-party cross-origin script errors (e.g. Disqus, browser extensions)
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (
      event.message === 'Script error.' ||
      (event.filename && (event.filename.includes('disqus') || event.filename.includes('googletagmanager')))
    ) {
      // Suppress cross-origin third-party script noise
      event.preventDefault();
      return true;
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      typeof event.reason.message === 'string' &&
      (event.reason.message.includes('disqus') || event.reason.message === 'Script error.')
    ) {
      event.preventDefault();
    }
  });
}

const app = createApp(App);
const pinia = createPinia();

app.config.errorHandler = (err, instance, info) => {
  console.warn('Vue handled error:', err, info);
};

pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.mount('#app');

