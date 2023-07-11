"use client";
import { signIn } from "next-auth/react";
import { ComponentPropsWithoutRef, useState } from "react";

import LoaderDots from "../shared/loaderDots";
import MUIBaseModal from "../shared/muibase-modal";

interface SignInModalProps
    extends ComponentPropsWithoutRef<"div"> {
    triggerText?: string;
    productName: string;
    classNames?: {
        root?: string;
        trigger?: string;
    };
}

const SignInModal = () => {
    const [signInClicked, setSignInClicked] =
        useState(false);
    return (
        <MUIBaseModal title="Authorization">
            <div className="w-full overflow-hidden rounded-2xl shadow-xl md:border md:border-secondary-100">
                {/* <div className="flex flex-col items-center justify-center space-y-3 border-b border-secondary-100 bg-secondary-100 px-4 py-6 pt-8 text-center dark:bg-primary-700 md:px-16">
                    <h3 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">
                        Sign In
                    </h3>
                    <p className="text-sm text-surface-400 dark:text-secondary-200">
                        This is strictly for demo purposes - only your email and
                        profile picture will be stored.
                    </p>
                </div> */}

                <div className="relative flex w-full flex-col items-center space-y-4 bg-surface-50/50 px-4 py-8 md:px-16">
                    <button
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed border-secondary-500/50 bg-secondary-600/50"
                                : "border border-secondary-500 bg-primary-50 text-surface-900 transition-colors duration-500 [&:is(:hover,:focus)]:bg-tertiary-500/25 "
                        } button shadowbox-button relative flex  h-10 w-full min-w-[22ch] items-center justify-center space-x-3 rounded-md border text-sm shadow-sm backdrop-blur-sm transition-all duration-75 focus:outline-none`}
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
                    </button>

                    <button
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed border-secondary-500/50 bg-secondary-600/50"
                                : "border border-secondary-500 bg-primary-50 text-surface-900 transition-colors duration-500 [&:is(:hover,:focus)]:bg-tertiary-500/25"
                        } button shadowbox-button relative flex  h-10 w-full min-w-[22ch] items-center justify-center space-x-3 rounded-md border text-sm shadow-sm backdrop-blur-sm transition-all duration-75 focus:outline-none`}
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
                    </button>

                    <button
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed border-secondary-500/50 bg-secondary-600/50"
                                : "border border-secondary-500 bg-primary-50 text-surface-900 transition-colors duration-500 [&:is(:hover,:focus)]:bg-tertiary-500/25"
                        } button shadowbox-button relative flex  h-10 w-full min-w-[22ch] items-center justify-center space-x-3 rounded-md border text-sm shadow-sm backdrop-blur-sm transition-all duration-75 focus:outline-none`}
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
                    </button>
                    <button
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed border-secondary-500/50 bg-secondary-600/50"
                                : "border border-secondary-500 bg-primary-50 text-surface-900 transition-colors duration-500 [&:is(:hover,:focus)]:bg-tertiary-500/25"
                        } button shadowbox-button relative flex  h-10 w-full min-w-[22ch] items-center justify-center space-x-3 rounded-md border text-sm shadow-sm backdrop-blur-sm transition-all duration-75 focus:outline-none`}
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
                    </button>
                </div>
            </div>
        </MUIBaseModal>
    );
};
export default SignInModal;
