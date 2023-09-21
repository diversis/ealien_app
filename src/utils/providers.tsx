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
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { Provider as RWBProvider } from "react-wrap-balancer";
import {
    SnackbarProvider,
    enqueueSnackbar,
    closeSnackbar,
} from "notistack";

import MUIThemeProvider from "@/components/mui/MuiThemeProvider";
import SignInModal from "@/components/modals/SignInModal";
import { ReactNode, useState } from "react";
import useWindowSize from "@/lib/hooks/use-window-size";
import { Button } from "@mui/material";

export function Providers({
    children,
    session,
}: {
    children: ReactNode;
    session: Session;
}) {
    const { isMobile, isDesktop } = useWindowSize();
    const [client] = useState(new QueryClient());
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={client}>
                <ReactQueryStreamedHydration>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem={true}
                        themes={["light", "dark"]}
                    >
                        <MUIThemeProvider>
                            <SnackbarProvider
                                anchorOrigin={{
                                    horizontal: "left",
                                    vertical: isMobile
                                        ? "top"
                                        : "bottom",
                                }}
                                action={(snackbarId) => (
                                    <Button
                                        onClick={() =>
                                            closeSnackbar(
                                                snackbarId,
                                            )
                                        }
                                        variant="text"
                                    >
                                        Dismiss
                                    </Button>
                                )}
                            >
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
                </ReactQueryStreamedHydration>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </SessionProvider>
    );
}
