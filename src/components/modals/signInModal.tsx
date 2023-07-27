"use client";
import { signIn } from "next-auth/react";
import {
    ComponentPropsWithoutRef,
    forwardRef,
    useState,
} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Button,
    DialogActions,
    TextField,
    Typography,
    Box,
    Divider,
    Snackbar,
    Alert,
    FormGroup,
    Slide,
    Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import LoaderDots from "../shared/loaderDots";
import MUIBaseModal from "../shared/muibaseModal";
import { TransitionProps } from "@mui/material/transitions";

interface SignInModalProps
    extends ComponentPropsWithoutRef<"div"> {
    open: boolean;
    handleClose: () => void;
}

const SignInModal = ({
    open,
    handleClose,
    ...rest
}: SignInModalProps) => {
    const [signInClicked, setSignInClicked] =
        useState(false);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            keepMounted
            TransitionComponent={Transition}
            aria-labelledby="signin-modal-title"
            aria-describedby="signin-modal-description"
            className=""
            {...rest}
        >
            <Paper className="w-full overflow-hidden rounded-2xl shadow-xl md:border md:border-secondary-100">
                {/* <div className="flex flex-col items-center justify-center space-y-3 border-b border-secondary-100 bg-secondary-100 px-4 py-6 pt-8 text-center dark:bg-primary-700 md:px-16">
                    <h3 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">
                        Sign In
                    </h3>
                    <p className="text-sm text-surface-400 dark:text-secondary-200">
                        This is strictly for demo purposes - only your email and
                        profile picture will be stored.
                    </p>
                </div> */}

                <Box className="relative flex w-full flex-col items-center space-y-4 bg-surface-50/50 px-4 py-8 md:px-16">
                    <Button
                        variant="outlined"
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed"
                                : ""
                        } `}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("google");
                        }}
                    >
                        {signInClicked ? (
                            <LoaderDots />
                        ) : (
                            <>
                                {/* <FontAwesomeIcon
                                    icon={faGoogle}
                                    className="svg-icon-fasolid h-5  w-5"
                                /> */}
                                <p className="flex-grow">
                                    Sign In with Google
                                </p>
                            </>
                        )}
                    </Button>

                    <Button
                        variant="outlined"
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed"
                                : ""
                        } `}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("github");
                        }}
                    >
                        {signInClicked ? (
                            <LoaderDots />
                        ) : (
                            <>
                                {/* <FontAwesomeIcon
                                    icon={faGithub}
                                    className="svg-icon-fasolid h-5  w-5"
                                /> */}
                                <p className="flex-grow">
                                    Sign In with Github
                                </p>
                            </>
                        )}
                    </Button>

                    <Button
                        variant="outlined"
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed"
                                : ""
                        } `}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("vk");
                        }}
                    >
                        {signInClicked ? (
                            <LoaderDots />
                        ) : (
                            <>
                                {/* <FontAwesomeIcon
                                    icon={faVk}
                                    className="svg-icon-fasolid h-5  w-5"
                                /> */}
                                <p className="flex-grow">
                                    Sign In with VK
                                </p>
                            </>
                        )}
                    </Button>
                    <Button
                        variant="outlined"
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed"
                                : ""
                        } `}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("yandex");
                        }}
                    >
                        {signInClicked ? (
                            <LoaderDots />
                        ) : (
                            <>
                                {/* <FontAwesomeIcon
                                    icon={faYandex}
                                    className="svg-icon-fasolid h-5  w-5"
                                /> */}
                                <p className="flex-grow">
                                    Sign In with Yandex
                                </p>
                            </>
                        )}
                    </Button>
                </Box>
            </Paper>
        </Dialog>
    );
};
export default SignInModal;

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
