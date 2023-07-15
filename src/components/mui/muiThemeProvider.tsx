import { ReactNode } from "react";
import {
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
    CacheProvider,
    EmotionCache,
} from "@emotion/react";
import { useTheme } from "next-themes";
import NextAppDirEmotionCacheProvider from "./EmotionCache";

const fontFamily = [
    "Orbitron",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
].join(",");

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#846CEF",
            light: "#B2A3F5",
            dark: "#140849",
        },
        secondary: {
            main: "#18DCDC",
            light: "#A3F5F5",
            dark: "#084949",
        },
    },
    typography: {
        fontFamily: fontFamily,
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4723E7",
            light: "#B2A3F5",
            dark: "#140849",
        },
        secondary: {
            main: "#18DCDC",
            light: "#A3F5F5",
            dark: "#084949",
        },
    },
    typography: {
        fontFamily: fontFamily,
    },
});

export default function MUIThemeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { systemTheme, theme, setTheme, resolvedTheme } =
        useTheme();

    return (
        <NextAppDirEmotionCacheProvider
            options={{ key: "mui" }}
        >
            <ThemeProvider
                theme={
                    resolvedTheme === "light"
                        ? lightTheme
                        : darkTheme
                }
            >
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
