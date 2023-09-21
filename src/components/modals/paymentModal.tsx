import {
    ComponentPropsWithoutRef,
    forwardRef,
    useState,
} from "react";
import {
    Box,
    Dialog,
    Button,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

import { Order } from "@prisma/client";
import PayPalButtonsComponent from "../paypal/Buttons";
import {
    CompactOrderItem,
    CompactProduct,
    SerializedPrisma,
} from "@/lib/prisma/types";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface PaymentModalProps
    extends ComponentPropsWithoutRef<"div"> {
    order: SerializedPrisma<Order> & {
        orderItems: (SerializedPrisma<CompactOrderItem> & {
            product: SerializedPrisma<CompactProduct>;
        })[];
    };
    refreshOrder: () => Promise<void>;
}

export default function PaymentModal({
    order,
    refreshOrder,
    ...rest
}: PaymentModalProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // console.log(errors);
    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
                className="ml-auto"
                disabled={open}
            >
                Pay with PayPal
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                keepMounted
                TransitionComponent={Transition}
                aria-labelledby="payment-modal-title"
                aria-describedby="payment-modal-description"
                className=""
                classes={{
                    paper: "lg:min-w-[24rem] p-4 gap-y-4",
                }}
                {...rest}
            >
                <DialogTitle
                    id="payment-modal-title"
                    variant="h2"
                    className="!p-0 text-surface-900 dark:text-surface-50"
                >
                    Payment
                </DialogTitle>
                <Divider className="mb-2" />
                <Typography variant="subtitle1">
                    $ {order.totalPrice.toFixed(2)}
                </Typography>
                <Divider className="mb-2" />
                <PayPalButtonsComponent
                    order={order}
                    refreshOrder={refreshOrder}
                    handleClose={handleClose}
                />
                <Divider className="my-2" />
                <Box className="flex flex-row flex-wrap gap-2">
                    <WarningIcon className="h-6 w-6 flex-grow lg:h-8 lg:w-8" />
                    <Typography variant="body2">
                        Only for testing. No real purchase
                        is made.
                    </Typography>
                </Box>
            </Dialog>
        </>
    );
}
