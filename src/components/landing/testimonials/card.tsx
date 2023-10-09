"use client";
import { useRef } from "react";
import {
    HTMLMotionProps,
    m,
    useInView,
} from "framer-motion";
import { StaticImageData } from "next/image";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
// import { Blockquote } from "@mantine/core";

import Balancer from "react-wrap-balancer";
import Photo from "@/components/shared/Photo";
import { Typography } from "@mui/material";
import { SLIDE_Y_P_VARIANTS } from "@/components/shared/AnimatedDiv";

interface TestimonialsCardProps
    extends HTMLMotionProps<"div"> {
    name: string;
    photo: StaticImageData;
}

export default function TestimonialsCard({
    name,
    photo,
    ...rest
}: TestimonialsCardProps) {
    const ref = useRef(null);

    const isInView = useInView(ref);
    // const scale = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.5]);

    return (
        <m.div
            data-testid="testimonials-card"
            ref={ref}
            className=" relative grid w-full grid-rows-[1fr_auto] place-items-center "
            {...rest}
        >
            <div
                data-testid="testimonials-photo-wrapper"
                className="flex max-h-full w-full justify-center lg:w-72 xl:w-96"
            >
                <Photo imgSrc={photo} />
            </div>
            <article
                data-testid="testimonials-article"
                className="relative flex w-full flex-col items-center gap-y-6 lg:max-w-[40rem] lg:gap-y-12 "
            >
                <span
                    data-testid="testimonials-photo-article-name-wrapper"
                    className="w-full"
                >
                    <Typography
                        data-testid="testimonials-photo-article-h3"
                        variant="h3"
                        tabIndex={isInView ? 0 : undefined}
                        className="h3 text-center uppercase"
                    >
                        {name}
                    </Typography>
                </span>

                <div
                    data-testid="testimonials-photo-article-quote-container"
                    className="flex flex-col items-center gap-0"
                >
                    <m.blockquote
                        data-testid="testimonials-photo-article-quote"
                        variants={SLIDE_Y_P_VARIANTS}
                        initial="hidden"
                        animate={
                            isInView ? "visible" : "hidden"
                        }
                        exit="hidden"
                        tabIndex={isInView ? 0 : undefined}
                        className="relative flex w-full items-center text-base text-primary-900 dark:text-primary-50 xl:text-lg"
                    >
                        <Balancer
                            data-testid="testimonials-photo-article-quote-balancer"
                            ratio={0.5}
                            className="w-full break-all text-justify"
                        >
                            <em
                                data-testid="testimonials-photo-article-quote-em"
                                className="mr-2"
                            />
                            Pharetra et ultrices neque
                            ornare aenean euismod elementum.
                            Nullam vehicula ipsum a arcu
                            cursus vitae congue mauris
                            rhoncus. Sed ullamcorper morbi
                            tincidunt ornare massa eget
                            egestas purus viverra.
                        </Balancer>
                        <FormatQuoteIcon
                            data-testid="testimonials-photo-article-quote-icon"
                            className="absolute -top-6 left-0 z-[-1] h-12 w-12 fill-surface-500 lg:-top-12"
                        />
                    </m.blockquote>
                </div>
            </article>
        </m.div>
    );
}
