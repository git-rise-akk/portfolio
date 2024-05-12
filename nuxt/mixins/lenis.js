import {gsap} from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Lenis from "@studio-freight/lenis";

export const useLenis = (opt) => {
    const lenis = ref(null);
    onMounted(() => {
        // gsap.registerPlugin(ScrollTrigger)

        lenis.value = new Lenis({
            wrapper: opt.wrapper,
        });
        // lenis.value.on('scroll', ScrollTrigger.update)
        lenis.value.options.syncTouch = true;
        // gsap.ticker.add((time) => {
        //     lenis.value.raf(time * 1000)
        // })
        //
        // gsap.ticker.lagSmoothing(0)
    })

    onUnmounted(() => {
        lenis.value.destroy()
    })

    return { lenis }
}
