import {gsap} from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Lenis from "@studio-freight/lenis";

export const useLenis = () => {
    const lenis = ref(null);
    onMounted(() => {
        gsap.registerPlugin(ScrollTrigger)
        // паралакс
        // const sections = gsap.utils.toArray('.page-videos .video');
        //
        // sections.forEach((block, index) => {
        //     gsap.to(block, {
        //         y: 0,
        //         duration: 0.7,
        //         scrollTrigger: {
        //             trigger: block,
        //             start: 'top 70%',
        //             scrub: true,
        //             end: 'bottom center',
        //             markers: true,
        //         }
        //     });
        // });

        lenis.value = new Lenis();
        lenis.value.on('scroll', ScrollTrigger.update)
        lenis.value.options.syncTouch = true;
        gsap.ticker.add((time) => {
            lenis.value.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)
    })

    onUnmounted(() => {
        lenis.value.destroy()
    })

    return { lenis }
}
