import { useFormContext } from "react-hook-form";

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
