"use client";
import { useRef } from "react";
import {
    m,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";
import { StaticImageData } from "next/image";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
// import { Blockquote } from "@mantine/core";

import Balancer from "react-wrap-balancer";
import Photo from "@/components/shared/photo";
import { Typography } from "@mui/material";
import { SLIDE_Y_VARIANTS } from "@/lib/constants";
import { SLIDE_Y_P_VARIANTS } from "@/components/shared/animatedDiv";

export default function TestimonialsCard({
    name,
    photo,
}: {
    name: string;
    photo: StaticImageData;
}) {
    const ref = useRef(null);
    const { scrollY, scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "end start"],
    });
    const isInView = useInView(ref);
    // const scale = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.5]);

    return (
        <m.section
            ref={ref}
            className=" relative grid w-full grid-rows-[1fr_auto] place-items-center "
        >
            <div className="flex max-h-full w-full justify-center lg:w-72 xl:w-96">
                <Photo imgSrc={photo} />
            </div>
            <article className="relative flex w-full flex-col items-center lg:max-w-[40rem] xl:gap-y-12 ">
                <Typography
                    variant="h3"
                    tabIndex={isInView ? 0 : undefined}
                    className="h3 text-center uppercase"
                >
                    {name}
                </Typography>
                <div className="flex flex-col items-center gap-0">
                    <m.blockquote
                        variants={SLIDE_Y_P_VARIANTS}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        exit="hidden"
                        tabIndex={isInView ? 0 : undefined}
                        className="flex w-full items-center relative text-base text-primary-900 dark:text-primary-50 xl:text-lg"
                    >
                        <Balancer ratio={0.5} className="break-all w-full text-justify">
                            <em className="mr-2" />
                            Pharetra et ultrices neque
                            ornare aenean euismod elementum.
                            Nullam vehicula ipsum a arcu
                            cursus vitae congue mauris
                            rhoncus. Sed ullamcorper morbi
                            tincidunt ornare massa eget
                            egestas purus viverra.
                        </Balancer>
                        <FormatQuoteIcon className="absolute left-0 -top-12 z-[-1] h-12 w-12 fill-surface-500" />
                    </m.blockquote>
                </div>
            </article>
        </m.section>
    );
}
