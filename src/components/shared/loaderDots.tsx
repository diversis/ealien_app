"use client";
import { OPACITY_VARIANTS } from "@/lib/constants";
import {
    HTMLMotionProps,
    MotionConfigProps,
    m,
} from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

interface LoaderDotsProps extends HTMLMotionProps<"div"> {}

export default function LoaderDots({
    ...rest
}: LoaderDotsProps) {
    return (
        <>
            <m.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={OPACITY_VARIANTS}
                className="flex aspect-[6/1] w-full flex-row gap-1"
                {...rest}
            >
                {[1, 2, 3, 4, 5].map((i, id) => (
                    <div
                        key={`loader-${i}`}
                        style={{
                            animation: `1s scale-pulse-full ${
                                id / 10
                            }s infinite ease-out`,
                        }}
                        className={` aspect-square h-full rounded-full  bg-primary-${i}00`}
                    ></div>
                ))}
            </m.div>
        </>
    );
}
