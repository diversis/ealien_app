import { ReactNode } from "react";
import {
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import { useTheme } from "next-themes";

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
});

export default function MUIThemeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { systemTheme, theme, setTheme, resolvedTheme } =
        useTheme();

    return (
        <ThemeProvider
            theme={
                resolvedTheme === "light"
                    ? lightTheme
                    : darkTheme
            }
        >
            {children}
        </ThemeProvider>
    );
}
