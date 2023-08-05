import { createApp } from 'vue'
import LocomotiveScroll from '@/LocomotiveScroll/plugin/index.js'

const app = createApp({});
app.use(LocomotiveScroll);
app.mount('#app');
