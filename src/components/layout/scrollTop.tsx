"use client";
import { AnimatePresence, m } from "framer-motion";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import useScrolled from "@/lib/hooks/use-scrolled";
import { SCALE_BOUNCE_VARIANTS } from "@/lib/constants";

// interface Props {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window?: () => Window;
//     children: React.ReactElement;
// }

export default function ScrollTop({
    children,
}: {
    children: React.ReactElement;
}) {
    // const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrolled(100);

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        const anchor = (
            (event.target as HTMLDivElement)
                .ownerDocument || document
        ).querySelector("#page-top");

        if (anchor) {
            anchor.scrollIntoView({
                block: "end",
            });
        }
    };
    const MBox = m(Box);
    return (
        <AnimatePresence>
            {trigger && (
                <m.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={SCALE_BOUNCE_VARIANTS}
                    onClick={handleClick}
                    role="presentation"
                    className="fixed bottom-16 right-4 z-[1000] lg:bottom-4"
                >
                    {children}
                </m.div>
            )}
        </AnimatePresence>
    );
}
