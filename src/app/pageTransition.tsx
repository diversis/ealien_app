"use client";
import { AnimatePresence, m } from "framer-motion";
import {
    usePathname,
    useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

const PageTransition = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathName = usePathname();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(false);
        return () => setLoading(true);
    }, [pathName]);
    return (
        <AnimatePresence
            mode="wait"
            // initial={false}
        >
            {!loading && (
                <m.div
                    key="main-wrap"
                    initial={{
                        translateX: "-100%",
                        opacity: 0,
                    }}
                    animate={{
                        translateX: "0%",
                        opacity: 1,
                        transitionEnd: {
                            // temp workaround to fix trailing opacity and transform
                            transform: "none",
                        },
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.5,
                        },
                    }}
                    transition={{
                        translateX: "100%",
                        duration: 0.5,
                    }}
                    className="flex h-full w-full max-w-full flex-col items-center"
                >
                    {children}
                </m.div>
            )}
        </AnimatePresence>
    );
};
export default PageTransition;
