import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';
import AppNavigation from './components/layouts/AppNavigation.vue';
import AppFooter from './components/layouts/AppFooter.vue';

const app = createApp(App);

app.component('AppNavigation', AppNavigation);
app.component('AppFooter', AppFooter);

app.use(router);
app.mount('#app');
