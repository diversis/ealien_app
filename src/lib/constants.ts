import { CustomValueType, Variants } from "framer-motion";

export const DOMAIN = "https://aalien-app.vercel.app/";

export const DRAWER_BLEEDING = 56;

export const REVIEWS_PER_PAGE = 5

//framer motion variants
export const SPRING_2 = {
    type: "spring",
    stiffness: 320,
    damping: 32,
};

export const SPRING_LIGHT = {
    type: "spring",
    stiffness: 120,
    damping: 14,
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

export const SCALE_BOUNCE_VARIANTS: Variants = {
    hidden: {
        scale: 0,
        opacity: 0,
        transition: {
            scale: {
                type: "spring",
                damping: 20,
                stiffness: 300,
            },
            opacity: { duration: 0.3, ease: "easeOut" },
        },
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            scale: {
                type: "spring",
                damping: 20,
                stiffness: 300,
            },
            opacity: { duration: 0.3, ease: "easeOut" },
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
        transition: {
            scale: {
                type: "tween",
                duration: 0.5,
                ease: "easeOut",
            },
            opacity: { duration: 0.3, ease: "easeOut" },
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
