"use client";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

import { OPACITY_VARIANTS } from "@/lib/constants";
import { StaticImageData } from "next/image";
import Balancer from "react-wrap-balancer";
import BG from "@/components/shared/bg";
import Photo from "@/components/shared/photo";

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
    // const { scrollY, scrollYProgress } = useScroll({
    //     target: ref,
    //     offset: ["end end", "end start"],
    // });
    const isInView = useInView(ref);
    // const scale = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.5]);
    const isEven = id % 2 === 0;
    return (
        <m.section
            data-test={`feature-${"" + id}`}
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            className="align-items-start container relative flex  w-full flex-col-reverse overflow-visible  px-4 lg:px-8 xl:grid xl:grid-cols-12 xl:grid-rows-2 xl:px-12"
        >
            <div className="absolute bottom-[-10%] left-[-20%] right-[-20%]   -z-10 h-[40rem]  self-end  xl:[grid-area:2/1/3/13] ">
                <BG
                    testLabel={`feature-${id}`}
                    bgSrc={`/images/features/${bg}/2048.webp`}
                    classNames={{
                        root: `${
                            isEven
                                ? "clip-poly-right"
                                : "clip-poly-left"
                        } h-[90%]  w-full `,
                        bg: "bg-[position:50%_30%!important] bg-fixed",
                    }}
                />
            </div>
            <article
                data-test={`feature-${id}-article`}
                className={`flex w-full flex-col gap-y-12 overflow-x-hidden rounded-xl bg-primary-50/50 px-6 py-2 dark:bg-primary-900/50 xl:bg-transparent  ${
                    isEven
                        ? "xl:[grid-area:1/6/2/13]"
                        : "xl:[grid-area:1/1/2/8]"
                } dark:xl:bg-transparent`}
            >
                <h2 tabIndex={0} className="h2">
                    {title}
                </h2>
                <p
                    tabIndex={0}
                    className="text-shadow  text-lg xl:text-xl"
                >
                    <Balancer ratio={0.5}>{text}</Balancer>
                </p>
            </article>
            <div
                data-test={`feature-${id}-photo`}
                className={`flex aspect-square h-auto max-h-[50dvh] w-full justify-center xl:sticky xl:top-0 xl:mb-[25rem] xl:self-start xl:pt-40 ${
                    isEven
                        ? "xl:[grid-area:1/1/2/6]"
                        : "xl:[grid-area:1/8/2/13]"
                } `}
            >
                <div className="aspect-square h-auto w-full">
                    <Photo imgSrc={photo} />
                </div>
            </div>
        </m.section>
    );
}
