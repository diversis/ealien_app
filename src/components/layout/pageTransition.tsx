"use client";
import { AnimatePresence, m } from "framer-motion";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import LoaderDots from "../shared/loaderDots";

const PageTransition = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const router = useRouter();
    const pathName = usePathname(); // to use pathname as motion key

    const [show, setShow] = useState(true); // to handle mounting/unmounting

    const onDismiss = useCallback(() => {
        setShow(false);
        setTimeout(() => {
            router.back();
        }, 200); // 200ms, same as transition duration (0.2)
    }, [router]);
    return (
        <AnimatePresence>
            <m.div
                key={pathName}
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: "0%" }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{
                    duration: 0.5,
                    type: "tween",
                }}
                className="flex h-full w-full flex-col items-center"
            >
                {children}
            </m.div>
        </AnimatePresence>
    );
};
export default PageTransition;
