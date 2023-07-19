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
import { ControlledCountrySelect } from "../../fields/controlledCountrySelect";

export default function StepTwo() {
    // const { data: session, status } = useSession();

    const { reset, register, control } = useFormContext();

    return (
        <m.div className="flex flex-col gap-y-4 py-2">
            <ControlledTextField
                name="address"
                control={control}
                label="Address"
                key="address"
                id="address"
                placeholder="Address"
                autoComplete="street-address"
                variant="outlined"
                className="rounded-md"
                fullWidth
            />
            <ControlledTextField
                name="city"
                control={control}
                key="city"
                id="city"
                label="City"
                placeholder="city"
                autoComplete="home city"
                variant="outlined"
                className="rounded-md"
                fullWidth
            />
            <ControlledTextField
                name="postalCode"
                control={control}
                key="postalCode"
                id="postalCode"
                label="Postal code"
                placeholder="postalCode"
                autoComplete="postal-code"
                variant="outlined"
                className="rounded-md"
                fullWidth
            />
            <ControlledCountrySelect
                name="country"
                control={control}
                key="country"
            />
        </m.div>
    );
}
