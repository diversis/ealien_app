"use client";
import { ReactNode, useRef } from "react";

import { m, useInView } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
// import type {
//     Swiper,
//     SwiperSlide,
// } from "swiper/swiper-react.d.ts";
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
    className,
}: {
    children: ReactNode[];
    breakpoints?: {
        [width: number]: SwiperOptions;
        [ratio: string]: SwiperOptions;
    };
    autoplayDelay?: number;
    controls?: boolean;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    // const isInView = useInView(ref);
    return (
        <m.div ref={ref} className="relative w-full">
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
                                  slidesPerView: 3,
                                  spaceBetween: 0,
                              },
                              1280: {
                                  slidesPerView: 4,
                                  spaceBetween: "100px",
                              },
                          }
                }
                className={`relative w-full ${
                    className || ""
                }`}
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
                centeredSlides={true}
            >
                {children.map((child: ReactNode, el) => {
                    return (
                        <SwiperSlide
                            key={`slide-${el}`}
                            className="!grid max-h-full w-full max-w-full place-items-center place-self-center py-8 "
                        >
                            {child}
                        </SwiperSlide>
                    );
                })}
                {controls ? <SwiperNav /> : null}
            </Swiper>
        </m.div>
    );
}
