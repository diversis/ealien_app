"use client";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

import { OPACITY_VARIANTS } from "@/lib/constants";
import { StaticImageData } from "next/image";
import Balancer from "react-wrap-balancer";
import BG from "@/components/shared/bg";
import Photo from "@/components/shared/photo";
import { Typography } from "@mui/material";

export default function Feature({
    id,
    title,
    photo,
    text,
    bg = "guitarist",
}: {
    id: number;
    title: string;
    photo: StaticImageData;
    text: string;
    bg?: string;
}) {
    const ref = useRef(null);

    const isInView = useInView(ref);
    const isEven = id % 2 === 0;
    return (
        <m.section
            data-test={`feature-${"" + id}`}
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            className="align-items-start container relative flex max-w-full flex-col-reverse  px-4 lg:px-8 xl:grid xl:grid-cols-12 xl:grid-rows-[1fr_20rem] xl:px-12"
        >
            <div className="absolute bottom-[-10%]  left-0 right-0 h-[40rem] self-end overflow-x-clip overflow-y-visible  xl:[grid-area:2/1/3/13]">
                <div className="absolute inset-y-0 left-[-20%] right-[-20%] -z-10">
                    <BG
                        testLabel={`feature-${id}`}
                        bgSrc={`/images/features/${bg}/2048.webp`}
                        classNames={{
                            root: `${
                                isEven
                                    ? "clip-poly-right"
                                    : "clip-poly-left"
                            } h-full w-full `,
                            bg: "bg-[position:50%_30%!important] bg-fixed bg-cover",
                        }}
                    />
                </div>
            </div>
            <article
                data-test={`feature-${id}-article`}
                className={`flex w-full flex-col gap-y-12 rounded-xl bg-primary-50/50 px-6 py-2 dark:bg-primary-900/50 xl:bg-transparent  ${
                    isEven
                        ? "xl:[grid-area:1/6/2/13]"
                        : "xl:[grid-area:1/1/2/8]"
                } dark:xl:bg-transparent`}
            >
                <Typography
                    variant="h3"
                    tabIndex={0}
                    className="h3 text-center"
                >
                    {title}
                </Typography>
                <hr className="mx-auto h-0 w-0 border-l border-surface-900/25 dark:border-surface-50/25 lg:h-40" />
                <Typography
                    tabIndex={0}
                    className="text-shadow rounded-lg from-surface-50/50 to-transparent p-1 !text-lg dark:from-surface-900/50 lg:bg-gradient-to-t lg:!text-xl"
                >
                    <Balancer ratio={0.5}>{text}</Balancer>
                </Typography>
                <hr className="mx-auto h-0 w-0 lg:h-40 " />
            </article>
            <div
                data-test={`feature-${id}-photo`}
                className={`flex aspect-square h-auto max-h-[50dvh] w-full justify-center xl:sticky xl:top-0 xl:mb-[5rem] xl:self-start xl:pt-40 ${
                    isEven
                        ? "xl:[grid-area:1/1/2/6]"
                        : "xl:[grid-area:1/8/2/13]"
                } `}
            >
                <div className="aspect-square h-auto">
                    <Photo imgSrc={photo} />
                </div>
            </div>
        </m.section>
    );
}
