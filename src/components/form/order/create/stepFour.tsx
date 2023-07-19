import { AnimatePresence, m } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";

import { ControlledTextField } from "../../fields/controlledTextField";
import SignInModal from "@/components/auth/signInModal";
import Button from "@mui/material/Button";
import { Session } from "next-auth/core/types";
import Box from "@mui/material/Box";
import { ControlledCountrySelect } from "../../fields/controlledCountrySelect";
import Table from "@mui/material/Table";
import {
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";

export default function StepFour() {
    const { getValues, reset, register, control } =
        useFormContext();
    return (
        <Table>
            <TableBody>
                {Object.entries(getValues()).map(
                    ([key, value]) => {
                        return (
                            <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell>
                                    {value}
                                </TableCell>
                            </TableRow>
                        );
                    },
                )}
            </TableBody>
        </Table>
    );
}
