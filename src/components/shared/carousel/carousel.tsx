"use client";
import { ReactNode, useRef } from "react";

import { m, useInView } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import {
    Autoplay,
    Keyboard,
    Navigation,
    A11y,
} from "swiper/modules";
import "swiper/css/bundle";

import { OPACITY_VARIANTS } from "@/lib/constants";
import SwiperNav from "./swiperNav";
import { SwiperOptions } from "swiper/types";

const imageSizes = "100vw, (min-width: 1280px) 50vw";

export default function Carousel({
    children,
    breakpoints,
    autoplayDelay = 5000,
    controls = true,
}: {
    children: ReactNode[];
    breakpoints?: {
        [width: number]: SwiperOptions;
        [ratio: string]: SwiperOptions;
    };
    autoplayDelay?: number;
    controls?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);
    return (
        <m.section ref={ref} className="relative w-full">
            <Swiper
                breakpoints={
                    breakpoints
                        ? breakpoints
                        : {
                              // when window width is >= 320px
                              320: {
                                  slidesPerView: 1,
                                  spaceBetween: 0,
                              },
                              768: {
                                  slidesPerView: 2,
                                  spaceBetween: 0,
                              },
                              1280: {
                                  slidesPerView: 3,
                                  spaceBetween: "80px",
                              },
                          }
                }
                className="relative h-full w-full !overflow-y-visible"
                spaceBetween={50}
                // slidesPerView={isMobile ? 1 : 2}
                onSlideChange={(swiper) => {
                    // console.log(swiper.activeIndex);
                }}
                onSwiper={(swiper) => {}}
                modules={[
                    Autoplay,
                    Keyboard,
                    Navigation,
                    A11y,
                ]}
                autoplay={{
                    delay: autoplayDelay,
                }}
                direction="horizontal"
                loop={true}
                centeredSlides={false}
            >
                {children.map((child: ReactNode, el) => {
                    return (
                        <SwiperSlide
                            key={`slide-${el}`}
                            className="grid h-full w-full max-w-full place-items-center place-self-center "
                        >
                            <m.div
                                initial="hidden"
                                animate={
                                    isInView
                                        ? "visible"
                                        : "hidden"
                                }
                                variants={OPACITY_VARIANTS}
                                exit="exit"
                                className="relative grid h-full  max-h-full w-full max-w-full place-items-center"
                            >
                                {child}
                            </m.div>
                        </SwiperSlide>
                    );
                })}
                {controls ? <SwiperNav /> : null}
            </Swiper>
        </m.section>
    );
}
