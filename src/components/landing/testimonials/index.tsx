import {
    AnimatePresence,
    m,
    useInView,
    useScroll,
} from "framer-motion";
import { useRef } from "react";

import TestimonialsCard from "./card";

import { OPACITY_VARIANTS } from "@/lib/constants";

import guitaristPhoto from "@public/images/testimonials/guitarist/2048.webp";
import violinistPhoto from "@public/images/testimonials/violinist/2048.webp";
import pianistPhoto from "@public/images/testimonials/pianist/2048.webp";
import Carousel from "@/components/shared/carousel/carousel";
import { Typography } from "@mui/material";

const TESTIMONIALS = [
    { name: "some violinist", photo: violinistPhoto },
    { name: "some guitarist", photo: guitaristPhoto },
    { name: "some pianist", photo: pianistPhoto },
];

export default function TestimonialsSection() {
    const ref = useRef(null);
    const { scrollY, scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "end start"],
    });
    const isInView = useInView(ref);
    // const scale = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.5]);

    return (
        <m.section
            data-testid="testimonials-section"
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            className="relative flex min-h-screen w-full flex-col items-center px-4 md:min-h-[calc(100vh_-_6rem)]"
        >
            <Typography
                data-testid="testimonials-section-h2"
                variant="h2"
                tabIndex={0}
                className="h2 text-center"
            >
                Testimonials
            </Typography>

            <Carousel
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                }}
                autoplayDelay={20000}
                controls={false}
                className="h-min "
            >
                {TESTIMONIALS.map((item) => (
                    <TestimonialsCard
                        key={`testimonials-${item.name.replace(
                            " ",
                            "-",
                        )}`}
                        name={item.name}
                        photo={item.photo}
                    />
                ))}
            </Carousel>
        </m.section>
    );
}
