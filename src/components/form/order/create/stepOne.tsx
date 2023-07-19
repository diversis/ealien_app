import { useEffect } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, m } from "framer-motion";
import { signOut, useSession } from "next-auth/react";

import { ControlledTextField } from "../../fields/controlledTextField";
import SignInModal from "@/components/auth/signInModal";
import Button from "@mui/material/Button";
import { Session } from "next-auth/core/types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function StepOne({
    session,
}: {
    session: Session | null;
}) {
    // const { data: session, status } = useSession();

    const { email, image, name } = session?.user || {};
    const { reset, register, control } = useFormContext();

    return (
        <Stack
            direction="column"
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            {session ? (
                <>
                    {!!email ? (
                        <>
                            <ControlledTextField
                                name="name"
                                control={control}
                                label="Name"
                                key="name"
                                id="name"
                                placeholder="Name"
                                variant="outlined"
                                className="rounded-md"
                                fullWidth
                                disabled
                                hidden
                            />
                            <ControlledTextField
                                name="email"
                                control={control}
                                label="Email"
                                key="email"
                                id="email"
                                autoComplete="email"
                                placeholder="Email"
                                variant="outlined"
                                className="rounded-md"
                                fullWidth
                                disabled
                                hidden
                            />
                            <Box>
                                <p>Logged in as</p>
                                <Image
                                    alt={email}
                                    src={
                                        image ||
                                        `https://avatars.dicebear.com/api/micah/${email}.svg`
                                    }
                                    width={40}
                                    height={40}
                                />

                                <p>{email}</p>
                                <Button
                                    onClick={() =>
                                        signOut({})
                                    }
                                >
                                    Sign out
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <p>Email not found</p>
                            <Button
                                onClick={() =>
                                    signOut({
                                        redirect: true,
                                        callbackUrl: "/",
                                    })
                                }
                            >
                                Sign out
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <ControlledTextField
                        name="name"
                        control={control}
                        label="Name"
                        key="name"
                        id="name"
                        placeholder="Name"
                        variant="outlined"
                        className="rounded-md"
                        fullWidth
                    />
                    <ControlledTextField
                        name="email"
                        control={control}
                        label="Email"
                        key="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Email"
                        variant="outlined"
                        className="rounded-md"
                        fullWidth
                    />
                    <Box>
                        <span className="mr-2">
                            Want an account?
                        </span>
                        <SignInModal />
                    </Box>
                </>
            )}
        </Stack>
    );
}
