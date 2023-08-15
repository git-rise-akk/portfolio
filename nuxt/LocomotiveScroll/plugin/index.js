import { createApp } from 'vue';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css'

const app = createApp({})
const install = () => {
    app.config.globalProperties.LocomotiveScroll = LocomotiveScroll;
}

if (typeof window !== 'undefined' && app) {
    app.use(install);
    if (install.installed) {
        install.installed = false
    }
}

export default install;
