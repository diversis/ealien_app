"use client";
import { SPRING_LIGHT } from "@/lib/constants/variants";
import {
    HTMLMotionProps,
    Variants,
    m,
    useInView,
} from "framer-motion";
import { useRef } from "react";

interface AnimatedDivProps extends HTMLMotionProps<"div"> {
    classNameWrapper?: string;
    direction?: Direction;
    animationType?: AnimationType;
    duration?: number;
    animateInView?: boolean;
    overflowHidden?: boolean;
    delay?: {
        visible?: number;
        hidden?: number;
        exit?: number;
    };
}

export type Direction = "top" | "bottom" | "right" | "left";
export type AnimationType = "slide" | "spring" | "opacity";

export const SLIDE_Y_P_VARIANTS: Variants = {
    hidden: {
        translateY: "-100%",
        opacity: 0,
        transition: SPRING_LIGHT,
    },
    visible: {
        translateY: "0%",
        opacity: 1,
        transition: {
            ...SPRING_LIGHT,
            staggerChildren: 0.05,
            delayChildren: 0.05,
            when: "beforeChildren",
        },
    },
    exit: {
        translateY: "-100%",
        opacity: 0,
        transition: {
            ...SPRING_LIGHT,
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

export default function AnimatedDiv({
    children,
    className,
    classNameWrapper,
    direction,
    animationType,
    duration,
    animateInView = true,
    variants,
    overflowHidden = true,
    delay,
    ...rest
}: AnimatedDivProps) {
    const ref = useRef(null);
    const isInView = useInView(ref);

    const resultVariants: Variants = variants
        ? variants
        : {
              hidden: {
                  ...(direction &&
                      (direction === "top"
                          ? { translateY: "-50%" }
                          : direction === "bottom"
                          ? { translateY: "50%" }
                          : direction === "left"
                          ? { translateX: "-20%" }
                          : direction === "right"
                          ? { translateX: "20%" }
                          : { opacity: 0 })),
                  transition: {
                      type: "spring",
                      damping: 15,
                      stiffness: 120,
                      delay: delay?.hidden,
                  },
              },
              visible: {
                  ...(direction &&
                      (direction === "top" ||
                      direction === "bottom"
                          ? { translateY: "0%" }
                          : direction === "left" ||
                            direction === "right"
                          ? { translateX: "0%" }
                          : { opacity: 1 })),
                  transition: {
                      type: "spring",
                      damping: 15,
                      stiffness: 120,
                      delay: delay?.visible,
                  },
              },
              exit: {
                  ...(direction &&
                      (direction === "top"
                          ? { translateY: "-50%" }
                          : direction === "bottom"
                          ? { translateY: "50%" }
                          : direction === "left"
                          ? { translateX: "-20%" }
                          : direction === "right"
                          ? { translateX: "20%" }
                          : { opacity: 0 })),
                  transition: {
                      type: "spring",
                      damping: 15,
                      stiffness: 120,
                      delay: delay?.exit,
                  },
              },
          };

    return (
        <m.div
            tabIndex={0}
            initial="hidden"
            animate={
                animateInView
                    ? isInView
                        ? "visible"
                        : "hidden"
                    : "visible"
            }
            exit="exit"
            ref={ref}
            className={`${
                overflowHidden ? "overflow-hidden " : " "
            } ${classNameWrapper ? classNameWrapper : ""}`}
            {...rest}
        >
            <m.div
                variants={resultVariants}
                className={className}
            >
                {children}
            </m.div>
        </m.div>
    );
}
