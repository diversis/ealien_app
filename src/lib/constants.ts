import { CustomValueType, Variants } from "framer-motion";

export const SPRING_LIGHT = { type: "spring", stiffness: 120, damping: 14 };
export const SPRING_BOUNCY = {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 3,
};
export const SPRING_2 = { type: "spring", stiffness: 320, damping: 32 };
export const TWEEN_LIGHT = { type: "tween", duration: 0.3, ease: "easeOut" };
export const LONG_EASE = { duration: 1, ease: "backInOut" };
export const PROGRESS_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        translateX: "-100%",
        transition: {
            duration: 0.2,
        },
    },
    visible: {
        opacity: [0, 0.7, 1],
        translateX: ["-100%", "-90%", "-75%"],
        transition: {
            // type: "tween",
            duration: 1,
        },
    },
    exit: {
        opacity: [1, 1, 0],
        translateX: ["-75%", "0%", "0%"],
        keyTimes: [0, 0.9, 1],
        transition: {
            // type: "tween",
            duration: 1,
            ease: "easeIn",
        },
    },
};

export const MODAL_VARIANTS: Variants = {
    hidden: {
        scale: 0,
        opacity: 0.5,
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "circOut",
        },
    },
    exit: {
        scale: 0,
        opacity: 0.5,
        transition: {
            duration: 0.5,
            ease: "circIn",
        },
    },
};

export const SCALE_BOUNCE_VARIANTS: Variants = {
    hidden: {
        scale: 0,
        opacity: 0,
        transition: {
            scale: { type: "spring", damping: 20, stiffness: 300 },
            opacity: { duration: 0.3, ease: "easeOut" },
        },
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            scale: { type: "spring", damping: 20, stiffness: 300 },
            opacity: { duration: 0.3, ease: "easeOut" },
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
        transition: {
            scale: { type: "tween", duration: 0.5, ease: "easeOut" },
            opacity: { duration: 0.3, ease: "easeOut" },
        },
    },
};

export const SPIN_VARIANTS: Variants = {
    hidden: {
        rotate: "-7200deg",
        opacity: 0,
        scale: 0,
        transition: {
            type: "tween",
            duration: 0.5,
        },
    },
    visible: {
        rotate: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "tween",
            duration: 3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            type: "tween",
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export const SCALE_VARIANTS: Variants = {
    hidden: {
        scale: 0,

        transition: {
            ease: "easeOut",
            duration: 0.15,
        },
    },
    visible: {
        scale: 1,

        transition: { ease: "easeOut", duration: 0.15 },
    },
    exit: {
        scale: 0,

        transition: { ease: "easeOut", duration: 0.15 },
    },
};

// export const SELECT_ITEM_VARIANTS: Variants = {
//     hidden: {
//         scale: 0,
//         opacity: 0.2,
//         transition: {
//             duration: 0.2,
//             ease: "easeIn",
//         },
//     },
//     visible: {
//         scale: 1,
//         opacity: 1,
//         transition: {
//             duration: 0.2,
//             ease: "easeIn",
//         },
//     },
//     exit: {
//         scale: 0,
//         opacity: 0.2,
//         transition: {
//             duration: 0.3,
//             ease: "easeIn",
//         },
//     },
// };

export const SELECT_ITEM_VARIANTS: Variants = {
    hidden: {
        scale: 0,
        opacity: 0.2,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
    exit: {
        scale: 0,
        opacity: 0.2,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

export const SELECT_CONTENT_VARIANTS: Variants = {
    hidden: {
        scale: 0,
        opacity: 0.2,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeIn",
            delayChildren: 0.3,
            staggerChildren: 0.02,
        },
    },
    exit: {
        scale: 0,
        opacity: 0.2,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

export const ACCORDION_CONTENT_VARIANTS: Variants = {
    hidden: {
        height: "0%",
        opacity: 0.2,
        transition: {
            duration: 0.5,
            ease: "easeIn",
            when: "beforeChildren",
        },
    },
    visible: {
        height: "100%",
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeIn",
            when: "beforeChildren",
        },
    },
};

export const TOOLTIP_VARIANTS_TOP: Variants = {
    hidden: {
        translateY: "100%",
        opacity: 0.2,
        transition: {
            duration: 0.1,
            ease: "easeIn",
            when: "beforeChildren",
        },
    },
    visible: {
        translateY: "0%",
        opacity: 1,
        transition: {
            duration: 0.1,
            ease: "easeIn",
            when: "beforeChildren",
        },
    },
    exit: {
        translateY: "100%",
        opacity: 0.2,
        transition: {
            duration: 0.1,
            ease: "easeIn",
            when: "afterChildren",
        },
    },
};

export const COLLAPSIBLE_VARIANTS: Variants = {
    hidden: {
        translateY: "-100%",
        opacity: 0.2,
        transition: {
            duration: 0.1,
            ease: "easeIn",
            when: "beforeChildren",
        },
    },
    visible: {
        translateY: "0%",
        opacity: 1,
        transition: {
            duration: 0.1,
            ease: "easeIn",
            when: "beforeChildren",
            staggerChildren: 0.02,
        },
    },
    exit: {
        translateY: "-100%",
        opacity: 0.2,
        transition: {
            duration: 0.2,
            ease: "easeIn",
            staggerChildren: 0.02,
        },
    },
};

export const OPACITY_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export const PATH_DRAW_VARIANTS: Variants = {
    hidden: {
        pathLength: 0,
        opacity: 0,
    },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: {
                type: "tween",
                ease: "easeOut",
                duration: 3,
            },
            opacity: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    },
    exit: {
        pathLength: 0,
        opacity: 0,
        transition: {
            pathLength: { type: "tween", ease: "easeOut", duration: 0.1 },
            opacity: {
                duration: 0.03,
                ease: "easeOut",
            },
        },
    },
};

export const LOADER_DOTS_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            duration: 0.5,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export const PULSE_SCALE_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        scale: [0, 1],
        transition: {
            duration: 0.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "mirror",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export const SLIDEX_SPRING_VARIANTS: Variants = {
    hidden: {
        translateX: "-100%",
        transition: SPRING_LIGHT,
    },
    visible: {
        translateX: "0%",
        transition: SPRING_LIGHT,
    },
    exit: {
        translateX: "100%",
        transition: SPRING_LIGHT,
    },
};

export const SLIDEX_RIGHT_SPRING_VARIANTS: Variants = {
    hidden: {
        translateX: "100%",
        transition: SPRING_LIGHT,
    },
    visible: {
        translateX: "0%",
        transition: SPRING_LIGHT,
        transitionEnd: { transform: "none" },
    },
    exit: {
        translateX: "-100%",
        transition: SPRING_LIGHT,
    },
};

export const SLIDEX_VARIANTS: Variants = {
    hidden: {
        transform: "translateX(-100%)",
        transition: TWEEN_LIGHT,
    },
    visible: {
        translateX: ["-100%", "-10%", "0%"],
        transform: ["translateX(-100%)", "translateX(0%)", "none"],
        keyTimes: [0, 0.7, 1],
        transition: TWEEN_LIGHT,
    },
    exit: {
        translateX: "100%",
        transition: TWEEN_LIGHT,
    },
};

export const MOON_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        transform: "translateX(-100%)",
        transition: TWEEN_LIGHT,
    },
    visible: {
        opacity: [0, 1, 1],
        translateX: ["-100%", "-10%", "0%"],
        transform: ["translateX(-100%)", "translateX(0%)", "none"],
        keyTimes: [0, 0.7, 1],
        transition: TWEEN_LIGHT,
    },
    exit: {
        opacity: 0,
        translateX: "100%",
        transition: TWEEN_LIGHT,
    },
};

export const SLIDE_Y_TOP_VARIANTS: Variants = {
    hidden: {
        translateY: "100%",
        opacity: 0,
        transition: SPRING_2,
    },
    visible: {
        translateY: "0%",
        opacity: 1,
        transition: {
            ...SPRING_2,
            staggerChildren: 0.05,
            delayChildren: 0.05,
            when: "beforeChildren",
        },
    },
    exit: {
        translateY: "100%",
        opacity: 0,
        transition: {
            ...SPRING_2,
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

export const SLIDE_Y_VARIANTS: Variants = {
    hidden: {
        translateY: "-100%",
        opacity: 0,
        transition: SPRING_2,
    },
    visible: {
        translateY: "0%",
        opacity: 1,
        transition: {
            ...SPRING_2,
        },
    },
    exit: {
        translateY: "-100%",
        opacity: 0,
        transition: {
            ...SPRING_2,
        },
    },
};

export const EXPAND_VARIANTS: Variants = {
    hidden: {
        display: "grid",
        gridTemplateRows: "0fr",
        opacity: 0,
    },
    visible: {
        display: "grid",
        gridTemplateRows: "1fr",
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeInOut",
            staggerChildren: 0.04,
        },
    },
    exit: {
        display: "grid",
        gridTemplateRows: "0fr",
        opacity: 0,
        transition: {
            duration: 1,
            ease: "easeInOut",
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
};

export const EXPAND_CTA_VARIANTS: Variants = {
    hidden: {
        display: "grid",
        gridTemplateRows: "0fr",
        opacity: 0,
    },
    visible: {
        display: "grid",
        gridTemplateRows: "1fr",
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeInOut",
            delayChildren: 0.5,
            staggerChildren: 0.04,
            when: "beforeChildren",
        },
    },
    exit: {
        display: "grid",
        gridTemplateRows: "0fr",
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
};

export const EXPAND_CIRCLE_VARIANTS: Variants = {
    hidden: {
        display: "grid",
        gridTemplateRows: "0fr",
        opacity: 0,
        scale: 0,
    },
    visible: {
        display: "grid",
        gridTemplateRows: "1fr",
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
            delayChildren: 0.5,
            staggerChildren: 0.04,
            when: "beforeChildren",
        },
    },
    exit: {
        display: "grid",
        gridTemplateRows: "0fr",
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
};

export const WIDTH_VARIANTS: Variants = {
    hidden: {
        // display: "grid",
        width: "0%",
        // opacity: 0,
    },
    visible: {
        // display: "grid",
        width: "100%",
        // opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            staggerChildren: 0.04,
        },
    },
    exit: {
        // display: "grid",
        width: "0%",
        // opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
};

export const SLIDEX_R_VARIANTS: Variants = {
    hidden: {
        translateX: "100%",
        transition: TWEEN_LIGHT,
    },
    visible: {
        translateX: "0%",
        transition: TWEEN_LIGHT,
    },
    exit: {
        translateX: "-100%",
        transition: TWEEN_LIGHT,
    },
};
export const SUN_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        translateX: "100%",
        transition: TWEEN_LIGHT,
    },
    visible: { opacity: 1, translateX: "0%", transition: TWEEN_LIGHT },
    exit: { opacity: 0, translateX: "-100%", transition: TWEEN_LIGHT },
};

export const SLIDEX_R_ONLY_VARIANTS: Variants = {
    hidden: {
        translateX: "100%",
        transition: TWEEN_LIGHT,
    },
    visible: {
        translateX: "0%",
        transition: TWEEN_LIGHT,
    },
    exit: {
        translateX: "100%",
        transition: TWEEN_LIGHT,
    },
};

export const TITLE_VARIANTS: Variants = {
    hidden: {
        maskImage:
            "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
        WebkitMaskImage:
            "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
        maskSize: "800%",
        WebkitMaskSize: "800%",
        maskPosition: "70% 0%",
        WebkitMaskPosition: "70% 0%",

        opacity: 1,
    },
    visible: {
        opacity: 1,

        maskPosition: "45% 0%",

        WebkitMaskPosition: "45% 0%",

        transition: {
            duration: 3,
            type: "tween",
            ease: "easeOut",

            // times: [0, 0.2, 0.3, 1],
        },
    },
    exit: {
        maskImage:
            "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
        WebkitMaskImage:
            "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
        maskSize: "800%",
        WebkitMaskSize: "800%",
        maskPosition: "70% 0%",
        WebkitMaskPosition: "70% 0%",

        opacity: 1,
        transition: {
            duration: 1,
            type: "tween",
            ease: "easeOut",

            // times: [0, 0.2, 0.3, 1],
        },
    },
};

export const SUBTITLE_VARIANTS: Variants = {
    hidden: {
        maskImage:
            "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
        WebkitMaskImage:
            "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
        maskSize: "800%",
        WebkitMaskSize: "800%",
        maskPosition: "70% 0%",
        WebkitMaskPosition: "70% 0%",

        opacity: 1,
    },
    visible: {
        opacity: 1,

        maskPosition: "45% 0%",

        WebkitMaskPosition: "45% 0%",

        transition: {
            duration: 2,
            delay: 1,
            type: "tween",
            ease: "easeOut",

            // times: [0, 0.2, 0.3, 1],
        },
    },
    exit: {
        maskImage:
            "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
        WebkitMaskImage:
            "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
        maskSize: "800%",
        WebkitMaskSize: "800%",
        maskPosition: "70% 0%",
        WebkitMaskPosition: "70% 0%",

        opacity: 1,
        transition: {
            duration: 1,
            type: "tween",
            ease: "easeOut",

            // times: [0, 0.2, 0.3, 1],
        },
    },
};

export const SENTENCE_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.03,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.03,
            staggerDirection: -1,
            when: "afterChildren",
        },
    },
};

export const SENTENCE1_VARIANTS: Variants = {
    ...SENTENCE_VARIANTS,
    visible: {
        ...SENTENCE_VARIANTS.visible,
        transition: {
            // delay: 1,
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
};
export const SENTENCE2_VARIANTS: Variants = {
    ...SENTENCE_VARIANTS,
    visible: {
        ...SENTENCE_VARIANTS.visible,
        transition: {
            delay: 2.5,
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
};
export const SENTENCE3_VARIANTS: Variants = {
    ...SENTENCE_VARIANTS,
    visible: {
        ...SENTENCE_VARIANTS.visible,
        transition: {
            delay: 4.5,
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
};

export const LETTER_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
    },
};
export const ARTICLE_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren: 1,

            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.5,
            staggerDirection: -1,
            when: "afterChildren",
        },
    },
};

export const STAGGER_VARIANTS: Variants = {
    hidden: {},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            staggerChildren: 0.1,
            when: "beforeChildren",
        },
    },
    exit: {
        transition: {
            duration: 0.2,
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: "afterChildren",
        },
    },
};

export const CTA_BUTTON_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        scale: [0, 1, 5, 1],
        opacity: [0, 0.5, 0.7, 1],
        transition: {
            ...SPRING_BOUNCY,
            times: [0, 0.1, 0.5, 1],
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
    },
};

export const HR_VARIANTS: Variants = {
    hidden: {
        scale: 0,
        opacity: 0.5,
        transition: TWEEN_LIGHT,
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: LONG_EASE,
    },
    exit: {
        scale: 0,
        opacity: 0.5,
        transition: TWEEN_LIGHT,
    },
};
