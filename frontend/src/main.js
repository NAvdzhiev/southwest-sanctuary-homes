import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/styles.css';
import AppNavigation from './components/layouts/AppNavigation.vue';
import AppFooter from './components/layouts/AppFooter.vue';

const app = createApp(App);

const pinia = createPinia();

app.component('AppNavigation', AppNavigation);
app.component('AppFooter', AppFooter);

app.use(pinia);
app.use(router);
app.mount('#app');
