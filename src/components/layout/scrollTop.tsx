"use client";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import useScrollTrigger from "@mui/material/useScrollTrigger";

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
    const trigger = useScrollTrigger({
        target: window ? window : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

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

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                className="fixed bottom-4 right-4 z-[1000]"
            >
                {children}
            </Box>
        </Fade>
    );
}
