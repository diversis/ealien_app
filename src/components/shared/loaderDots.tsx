"use client";
import { OPACITY_VARIANTS } from "@/lib/constants";
import { m } from "framer-motion";

const LoaderDots = () => {
    return (
        <>
            <m.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={OPACITY_VARIANTS}
                className="flex aspect-[6/1] w-full flex-row gap-1"
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
};

export default LoaderDots;
