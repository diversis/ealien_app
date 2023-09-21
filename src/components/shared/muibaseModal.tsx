"use client";
import Modal from "@mui/base/Modal";
import { Button } from "@mui/material";
import {
    ComponentPropsWithoutRef,
    ReactNode,
    forwardRef,
    useEffect,
    useState,
} from "react";
import {
    m,
    AnimatePresence,
    usePresence,
    useAnimate,
} from "framer-motion";
import {
    OPACITY_VARIANTS,
    SCALE_BOUNCE_VARIANTS,
} from "@/lib/constants/variants";

interface ModalProps
    extends ComponentPropsWithoutRef<"div"> {
    modalOpen?: boolean;
    triggerText?: string;
    children: ReactNode;
    classNames?: {
        root?: string;
        trigger?: string;
        content?: string;
    };
}

export default function MUIBaseModal({
    modalOpen = false,
    triggerText,
    children,
    classNames,
    ...rest
}: ModalProps) {
    const [open, setOpen] = useState(modalOpen);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpen}
                className={`${classNames?.trigger ?? ""}`}
            >
                {triggerText || "Open"}
            </Button>

            <Modal
                slots={{ backdrop: Backdrop }}
                open={open}
                onClose={handleClose}
                className={`fixed inset-0 z-[9000] flex flex-col place-items-center justify-center  ${
                    classNames?.root ?? ""
                }`}
                closeAfterTransition
                {...rest}
            >
                <Fade in={open}>
                    <div
                        key={`modal-wrapper`}
                        className={`relative rounded-xl bg-surface-50/50 p-8 backdrop-blur-sm dark:bg-surface-900/50 ${
                            classNames?.content ?? ""
                        }`}
                    >
                        <div className="absolute inset-0 -z-[1] rounded-xl bg-gradient-to-r from-accent-400 to-secondary-500"></div>
                        <div className="absolute inset-[2px] -z-[1] rounded-xl bg-surface-50 dark:bg-surface-900"></div>
                        {children}
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

const Backdrop = forwardRef<
    HTMLDivElement,
    { open?: boolean; className: string; ownerState?: any }
>(({ open, className, ownerState, ...rest }, ref) => {
    return (
        <div
            className="-z-1 [-webkit-tap-highlight-color: transparent;] fixed inset-0 flex place-items-center bg-surface-900/50"
            ref={ref}
            {...rest}
        />
    );
});

Backdrop.displayName = "Backdrop";

interface FadeProps {
    children: React.ReactElement;
    in?: boolean;
    onClick?: any;

    onEnter?: (
        node: HTMLElement,
        isAppearing: boolean,
    ) => void;
    onExited?: (
        node: HTMLElement,
        isAppearing: boolean,
    ) => void;
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(
    (
        {
            in: open,
            onEnter,
            onExited,
            children,

            ...rest
        },
        ref,
    ) => {
        // const [isPresent, safeToRemove] = usePresence();
        const [scope, animate] = useAnimate();

        useEffect(() => {
            const enterAnimation = async () => {
                if (onEnter) {
                    console.log("enter");
                    await animate(
                        "#modal-wrapper",
                        {
                            opacity: 1,
                        },
                        { duration: 5 },
                    );
                    onEnter(null as any, true);
                }
            };
            const exitAnimation = async () => {
                if (onExited) {
                    console.log("exit");
                    await animate(
                        "#modal-wrapper",
                        {
                            opacity: 0,
                        },
                        { duration: 5 },
                    );
                    onExited(null as any, true);
                    // safeToRemove();
                }

                if (open) {
                    enterAnimation();
                } else {
                    exitAnimation();
                }
            };
        }, [open]);
        return (
            <div id="modal-wrapper" ref={ref} {...rest}>
                {children}
            </div>
        );
    },
);

Fade.displayName = "Modal-Fade";
