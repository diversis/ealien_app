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
import { ControlledRadioGroup } from "../../fields/controlledRadioGroup";
import {
    FormControlLabel,
    Radio,
    Stack,
} from "@mui/material";

export default function StepThree() {
    // const { data: session, status } = useSession();

    const { control } = useFormContext();

    return (
        <Stack
            direction="column"
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <ControlledRadioGroup
                name="paymentMethod"
                control={control}
                label="select preferred payment method"
                key="paymentMethod"
                id="paymentMethod"
                placeholder="Name"
                className="rounded-md"
            >
                <FormControlLabel
                    id="paypal"
                    value="paypal"
                    label="Paypal"
                    control={<Radio />}
                />
                <FormControlLabel
                    id="cc"
                    value="cc"
                    label="Credit Card"
                    control={<Radio />}
                    disabled
                />
            </ControlledRadioGroup>
        </Stack>
    );
}