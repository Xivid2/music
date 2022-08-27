import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VeeValidatePlugin from './plugins/validation';
import './assets/tailwind.css';
import './assets/main.css';
import './includes/firebase';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VeeValidatePlugin);

app.mount('#app');
