import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/styles.css';
import AppNavigation from './components/layouts/AppNavigation.vue';
import AppFooter from './components/layouts/AppFooter.vue';
import { useUserStore } from './store/userStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.component('AppNavigation', AppNavigation);
app.component('AppFooter', AppFooter);

const userStore = useUserStore();

userStore.init().then(() => {
	app.mount('#app');
});
