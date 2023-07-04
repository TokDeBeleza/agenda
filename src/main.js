import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import { setupCalendar , Calendar, DatePicker} from 'v-calendar';
import 'v-calendar/style.css';


import registerGlobalComponent from '@/components/Base/';

const app = createApp(App);

registerGlobalComponent(app);
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.use(createPinia()).use(router).use(setupCalendar, {}).mount('#app');
