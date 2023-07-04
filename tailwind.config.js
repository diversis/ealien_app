const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        extend: {
            screens: {
                xs: { raw: "(min-width: 320px)" },
                over9000: { raw: "(min-width: 1920px)" },
                // => @media (min-width: 1920px) { ... }
            },
            colors: {
                primary: {
                    50: "#F0EDFD",
                    100: "#D1C8F9",
                    200: "#B2A3F5",
                    300: "#846CEF",
                    400: "#6547EB",
                    500: "#4723E7",
                    600: "#3716CA",
                    700: "#281093",
                    800: "#1E0C6E",
                    900: "#140849",
                },
                accent: {
                    50: "#FCF8ED",
                    100: "#F6EBCB",
                    200: "#F0DEA8",
                    300: "#E7CA73",
                    400: "#DEB73F",
                    500: "#D1A623",
                    600: "#AE8A1E",
                    700: "#8C6F18",
                    800: "#695312",
                    900: "#46370C",
                },
                secondary: {
                    50: "#EAD9FC",
                    100: "#D5B4F9",
                    200: "#C08EF6",
                    300: "#AB68F3",
                    400: "#9642F0",
                    500: "#811DED",
                    600: "#630FBD",
                    700: "#4F0C97",
                    800: "#3B0971",
                    900: "#28064B",
                },
                tertiary: {
                    50: "#EDFDFD",
                    100: "#C8F9F9",
                    200: "#A3F5F5",
                    300: "#7EF1F1",
                    400: "#47EBEB",
                    500: "#18DCDC",
                    600: "#14B8B8",
                    700: "#109393",
                    800: "#0C6E6E",
                    900: "#084949",
                },
                error: {
                    50: "#F9DCE0",
                    100: "#F6CBD0",
                    200: "#F0A8B1",
                    300: "#EA8591",
                    400: "#E46271",
                    500: "#DE3F52",
                    600: "#D12338",
                    700: "#9E1E2E",
                    800: "#6C1825",
                    900: "#59121C",
                },
                surface: {
                    50: "#EBEBEB",
                    100: "#D6D6D6",
                    200: "#C2C2C2",
                    300: "#ADADAD",
                    400: "#999999",
                    500: "#7A7A7A",
                    600: "#5C5C5C",
                    700: "#3D3D3D",
                    800: "#292929",
                    900: "#141414",
                },
            },
            fontFamily: {
                orbitron: ["Orbitron", ...fontFamily.sans],
            },
            fontSize: {
                xs: "0.875rem",
                sm: "0.9375rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.75rem",
                "2xl": "2rem",
                "3xl": "2.5rem",
                "4xl": "3.5rem",
                "5xl": "5rem",
                "6xl": "6.25rem",
                "7xl": "7.375rem",
            },
            letterSpacing: {
                exp: "2px",
                wide: "2.35px",
                wider: "2.7px",
                widest: "4.75px",
            },
            gridTemplateRows: {
                home: "1fr 10rem",
            },
            backgroundImage: {
                conic: "conic-gradient(from 0.25turn,transparent 0%,transparent 20%,hsla(181, 100%, 51%, 1) 25%,transparent 30%,transparent 70%,hsla(281, 100%, 51%, 1) 75%,transparent 80%)",
                "conic-title":
                    "conic-gradient(from 0.25turn,#5DFDB5 0%,#E5B524 20%,#ADC2D7 40%,#FFB370 60%,#92ADC9 80%,#5DFDB5 100%)",
                "conic-title-dark":
                    "conic-gradient(from 0.25turn,#02A25A 0%,#EAC148 20%,#5B83AE 40%,#FF9233 60%,#36516D 80%,#02A25A 100%)",

                "rep-conic":
                    "repeating-conic-gradient(from 0turn,transparent 0%,transparent 20%,#F0D47F 25%,transparent 30%,transparent 40%,#5DFDB5 45%,transparent 50%)",
                "rep-conic-dark":
                    "repeating-conic-gradient(from 0.25turn,transparent 0%,transparent 20%,#CC5F00 25%,transparent 30%,transparent 40%,#016943 45%,transparent 50%)",

                "repeating-conic":
                    "repeating-conic-gradient(from 0turn at 50% 50%,hsl(231, 77%, 90%) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
                radial: "radial-gradient(circle at 150% 10%, #A9A0A8, #CFFEDB 50%, #AFFEDB 70%, #F8ECC9 75%)",
                "radial-dark":
                    "radial-gradient(circle at 150% 10%,#011712 50%, #101010 70%, #090300 75%)",
            },
            animation: {
                "fade-in":
                    "fade-in 1s forwards cubic-bezier(0.01365, 0.014, 0.24, 0.1)",
                "bg-slide": "bg-slide 25s ease-in infinite",
                "bg-rotate": "rotate 10s linear infinite",
                "bg-scale": "scale-xl 10s linear infinite",
                "bg-slide-ln":
                    "bg-slide-ln 10s linear infinite",
                "scale-pulse":
                    "scale-pulse 700ms ease-in-out",
                "slide-down":
                    "slideDown 300ms cubic-bezier(0.650, -0.600, 0.585, 1.540)",
                "slide-up":
                    "slideUp 300ms cubic-bezier(0.650, -0.600, 0.585, 1.540)",
                "slide-right": "slideRight 100ms ease-out",
                "slide-from-left":
                    "slideFromLeft 100ms ease-out",
                "toast-slide-right":
                    "toastSlideRight 100ms ease-out",
                "toast-slide-left":
                    "toastSlideleft 100ms ease-out",
                "rotate-infinite":
                    "rotate 650ms cubic-bezier(0.250, 0.350, 0.085, 0.0) infinite",
                pen: "pen 3s linear alternate forwards",
                "pen-inf":
                    "pen2 8s linear alternate infinite",
                "pen-logo":
                    "pen-logo 5s linear alternate forwards",
                "pen-logo-inf":
                    "pen-logo 2s linear alternate infinite",
            },
            keyframes: {
                "fade-in": {
                    "0%": "opacity: 0",
                    "100%": "opacity: 1",
                },
                "bg-slide": {
                    "0%, 100%": {
                        "background-position": "top left",
                    },
                    "25%": {
                        "background-position": "top right",
                    },
                    "50%": {
                        "background-position":
                            "bottom right",
                    },
                    "75%": {
                        "background-position":
                            "bottom left",
                    },
                },
                "bg-slide-ln": {
                    "0%, 100%": {
                        "background-position": "left",
                    },
                    "50%": {
                        "background-position": "right",
                    },
                },
                rotate: {
                    "0%": { transform: "rotate(0deg)" },
                    "50%": { transform: "rotate(180deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "scale-xl": {
                    "0%,100%": {
                        "background-size": "200% 200%",
                        "background-position": "right",
                    },
                    "50%": {
                        "background-size": "400% 400%",
                        "background-position": "left",
                    },
                },
                "scale-pulse": {
                    "0%,100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.1)" },
                },

                slideDown: {
                    "0%": { height: 0, opacity: 0 },
                    "100%": {
                        height: "var(--radix-accordion-content-height)",
                        opacity: 1,
                    },
                },
                slideUp: {
                    "0%": {
                        height: "var(--radix-accordion-content-height)",
                        opacity: 1,
                    },
                    "100%": { height: 0, opacity: 0 },
                },
                toastSlideRight: {
                    "0%": {
                        translateX:
                            "var(--radix-toast-swipe-end-x)",
                        opacity: 1,
                    },
                    "100%": {
                        translateX: "100%",
                        opacity: 0,
                    },
                },
                toastSlideLeft: {
                    "0%": {
                        translateX:
                            "var(--radix-toast-swipe-end-x)",
                        opacity: 1,
                    },
                    "100%": {
                        translateX: "-100%",
                        opacity: 0,
                    },
                },
                slideFromLeft: {
                    "0%": {
                        translateX: "100%",
                        opacity: 1,
                    },
                    "100%": {
                        translateX: "0%",
                        opacity: 0,
                    },
                },
                pen: {
                    "0%": {
                        "stroke-dashoffset": "1000",
                    },
                    "100%": {
                        "stroke-dashoffset": "0",
                    },
                },
                pen1: {
                    "0%": {
                        "stroke-dashoffset": "5000",
                    },
                    "50%": {
                        "stroke-dashoffset": "0",
                    },
                    "100%": {
                        "stroke-dashoffset": "5000",
                    },
                },
                pen2: {
                    "0%": {
                        "stroke-dashoffset": "1000",
                    },
                    "50%": {
                        "stroke-dashoffset": "0",
                    },
                    "100%": {
                        "stroke-dashoffset": "1000",
                    },
                },
                "pen-logo": {
                    "0%": {
                        "stroke-dashoffset": "1.1",
                    },
                    "100%": {
                        "stroke-dashoffset": "0",
                    },
                },
            },
            transitionTimingFunction: {
                fancy: "cubic-bezier(0.650, -0.600, 0.585, 1.540);",
                "fancy-xl":
                    "cubic-bezier(0.650, -2.600, 0.585, 5.940);",
                select: "cubic-bezier(.13,.77,.75,-1.59);",
                interact: "cubic-bezier(1,.13,0,.46);",
                "interact-2":
                    "cubic-bezier(.12,2,.65,.63);",
            },
            boxShadow: {
                md: "2px 2px 4px 0",
                sm: "1px 1px 2px 0",
                card: "0 4px 8px 2px",
                inner: "inset 2px 2px 2px 0",
                "inner-2": "inset 0 2px 4px 0",
                "inner-b": "inset 0 -2px 4px 0",
                "inner-l": "inset 2px 0 2px 2px",
                "inner-r": "inset -2px 0 2px 2px",
                exp: "0 0 1rem 0.3em hsla(231, 77%, 90%, 0.3), inset 5px -5px 1em 0.25em hsla(230, 35%, 7%, 0.1)",
                loader: "0 4px 0 0 #02CA70, 2px 0 0 1px #016943,",
            },
        },
    },
    safelist: [
        {
            pattern:
                /bg-(primary|secondary|accent|surface|tertiary)-(100|200|300|400|500|600|700|800|900)/, // You can display all the colors that you need
            variants: ["lg", "hover", "focus", "lg:hover"],
        }, // Optional
    ],
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant("data-active", "&[data-active]");
            addVariant("data-selected", "&[data-selected]");
            addVariant("data-hovered", "&[data-hovered]");
            addVariant("disabled", "&:disabled");
            addVariant("open", '&[data-state="open"]');
            addVariant("closed", '&[data-state="closed"]');
            addVariant(
                "group-open",
                ':merge(.group)[data-state="open"] &',
            );
            addVariant(
                "group-closed",
                ':merge(.group)[data-state="closed"] &',
            );
            addVariant(
                "data-placeholder",
                "&[data-placeholder]",
            );
            addVariant(
                "highlighted",
                "&[data-highlighted]",
            );
            addVariant(
                "data-checked",
                '&[data-state="checked"]',
            );
            addVariant(
                "swipe-move",
                '&[data-swipe="move"]',
            );
            addVariant(
                "swipe-cancel",
                '&[data-swipe="cancel"]',
            );
            addVariant("swipe-end", '&[data-swipe="end"]');
        }),
        require("@tailwindcss/container-queries"),
    ],
};
