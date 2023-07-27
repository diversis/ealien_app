"use client";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import {
    AnimatePresence,
    MotionConfig,
    m,
    LazyMotion,
    domMax,
} from "framer-motion";

import { Provider as RWBProvider } from "react-wrap-balancer";
import {
    SnackbarProvider,
    enqueueSnackbar,
} from "notistack";
import MUIThemeProvider from "@/components/mui/muiThemeProvider";
import SignInModal from "@/components/modals/signInModal";

export function Providers({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session;
}) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem={true}
                themes={["light", "dark"]}
            >
                <MUIThemeProvider>
                    <SnackbarProvider>
                        <LazyMotion
                            features={domMax}
                            strict
                        >
                            <MotionConfig reducedMotion="user">
                                <RWBProvider>
                                    {/* <Suspense fallback={<NextNProgress />}> */}
                                    {children}

                                    {/* </Suspense> */}
                                </RWBProvider>
                            </MotionConfig>
                        </LazyMotion>
                    </SnackbarProvider>
                </MUIThemeProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
