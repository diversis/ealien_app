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
import GitHub from "@mui/icons-material/GitHub";
import Google from "@mui/icons-material/Google";

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
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-secondary-100 bg-secondary-100 px-4 py-6 pt-8 text-center dark:bg-primary-700 md:px-16">
                    <Typography variant="body2">
                        This is strictly for demo purposes.
                    </Typography>
                </div>

                <Box className="relative flex w-full flex-col items-center space-y-4 bg-surface-50/50 px-4 py-8 md:px-16">
                    <Button
                        variant="outlined"
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed"
                                : ""
                        } flex w-full items-center gap-2 lg:gap-4`}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("google");
                        }}
                    >
                        {signInClicked ? (
                            <LoaderDots className="h-8 min-w-[20rem]" />
                        ) : (
                            <>
                                <Google className="h-8 w-8" />
                                <Typography
                                    variant="body1"
                                    className="flex-grow"
                                >
                                    Sign In with Google
                                </Typography>
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
                        } flex w-full items-center gap-2 lg:gap-4`}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("github");
                        }}
                    >
                        {signInClicked ? (
                            <LoaderDots className="h-8 min-w-[20rem]" />
                        ) : (
                            <>
                                <GitHub className="h-8 w-8" />
                                <Typography
                                    variant="body1"
                                    className="flex-grow"
                                >
                                    Sign In with Github
                                </Typography>
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
