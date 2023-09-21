"use client";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

import { OPACITY_VARIANTS } from "@/lib/constants/variants";
import { StaticImageData } from "next/image";
import Balancer from "react-wrap-balancer";
import BG from "@/components/shared/Bg";
import Photo from "@/components/shared/Photo";
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
        <m.div
            data-test={`feature-${"" + id}`}
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            className="container relative isolate flex max-w-full flex-col-reverse  items-start px-4 lg:grid lg:grid-cols-12 lg:grid-rows-[1fr_20rem] lg:px-8 xl:px-12"
        >
            <div className="absolute -left-[5%] -right-[5%] bottom-[-10%] isolate -z-10 h-[40rem] xl:[grid-area:2/1/3/13]">
                <div
                    className={`absolute inset-0 [mask:linear-gradient(to_bottom,transparent_0%,#000_25%,#000_75%,transparent_100%)]`}
                >
                    <div
                        className={`h-full w-full  ${
                            id === 0
                                ? "bg-tertiary-200/5"
                                : id === 1
                                ? "bg-error-500/5"
                                : "bg-accent-300/5"
                        } backdrop-blur-sm [mask:linear-gradient(to_left,transparent_0%,#000_10%,#000_90%,transparent_100%)]`}
                    />
                </div>
                <BG
                    testLabel={`feature-${id}`}
                    bgSrc={`/images/features/${bg}/2048.webp`}
                    classNames={{
                        root: `${
                            isEven
                                ? "[clip-path:polygon(50%_0,0_100%,100%_33%,25%_100%,100%_55%,50%_100%,100%_0,0_67%,75%_0,0_45%)]"
                                : "[clip-path:polygon(50%_0,100%_100%,0%_33%,75%_100%,0%_55%,50%_100%,0%_0,100%_67%,25%_0,100%_45%)]"
                        } absolute inset-0 `,
                        bg: "bg-[position:50%_30%!important] bg-fixed bg-cover",
                    }}
                />
            </div>
            <article
                data-test={`feature-${id}-article`}
                className={`flex w-full flex-col gap-y-12 rounded-xl bg-primary-50/50 px-6 py-2  dark:bg-primary-900/50 lg:bg-transparent  ${
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
                className={`flex aspect-square h-auto max-h-[50dvh] w-full justify-center lg:sticky lg:top-0 lg:mb-[5rem] lg:self-start lg:pt-24 ${
                    isEven
                        ? "xl:[grid-area:1/1/2/6]"
                        : "xl:[grid-area:1/8/2/13]"
                } `}
            >
                <div className="aspect-square h-auto">
                    <Photo imgSrc={photo} />
                </div>
            </div>
        </m.div>
    );
}
