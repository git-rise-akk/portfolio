import { createApp } from 'vue'
import LocomotiveScroll from '@/LocomotiveScroll/component/index.vue'

const app = createApp({});
app.component('LocomotiveScroll', LocomotiveScroll);
app.mount('#app');
