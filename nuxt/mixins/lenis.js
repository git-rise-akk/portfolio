import {gsap} from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Lenis from "@studio-freight/lenis";

export const useLenis = () => {
    const lenis = ref(null);
    onMounted(() => {
        gsap.registerPlugin(ScrollTrigger)

        // появление первого блока справа автоматом
        // let tl = gsap.timeline({
        //    scrollTrigger: {
        //        trigger: '.one-block',
        //        start: 'top bottom',
        //        end: 'bottom center',
        //        markers: true,
        //    }
        // });
        // tl.to(".one-block", {
        //     x: 0,
        //     opacity: 1,
        // });


        // появление блоков справа и слева при скролле
        // var sections = gsap.utils.toArray('.album');
        //
        // sections.forEach((block, index) => {
        //     console.log(index)
        //     gsap.to(block, {
        //         x: 0,
        //         // y: 0,
        //         opacity: 1,
        //         duration: 1.5,
        //         rotate: 0,
        //         delay: index === 0 ? 0.6 : 0,
        //         scrollTrigger: {
        //             trigger: block,
        //             start: '15% 70%',
        //             // start: '15% 80%', для фото
        //             // scrub: true,
        //             end: '70% center',
        //             markers: true,
        //             toggleActions: "restart none none reverse"
        //         }
        //     });
        //
        // });

        // паралакс
        // var sections = gsap.utils.toArray('.video');
        //
        // sections.forEach((block, index) => {
        //
        //     gsap.to(block, {
        //         y: 0,
        //         duration: index % 2 === 0 ? 0.7 : 0.3,
        //         scrollTrigger: {
        //             trigger: block,
        //             start: 'top 70%',
        //             scrub: true,
        //             end: 'bottom center',
        //             markers: true,
        //         }
        //     });
        //
        // })

        // анимация на главной
        // var sections = gsap.utils.toArray('.video');
        //
        // sections.forEach((block, index) => {
        //
        //     gsap.to(block, {
        //         y: 0,
        //         duration: index % 2 === 0 ? 0.7 : 0.3,
        //         scrollTrigger: {
        //             trigger: block,
        //             start: 'top 70%',
        //             scrub: true,
        //             end: 'bottom center',
        //             markers: true,
        //         }
        //     });
        //
        // })

        // анимация при скролле первой секции на главной
        let home = gsap.timeline({
           scrollTrigger: {
               trigger: '.video',
               start: 'top top',
               end: 'bottom top',
               scrub: true,
           }
        });
        home.to(".video", {
            scale: 1.2,
        });

        // анимация секции about
        let aboutImag = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-images-two',
                start: 'top 70%',
                end: 'bottom top',
                markers: true,
            }
        });
        aboutImag.to(".about-images-two", {
            x: 0,
            opacity: 1,
            duration: 1,
        });

        lenis.value = new Lenis();
        lenis.value.on('scroll', ScrollTrigger.update)
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
