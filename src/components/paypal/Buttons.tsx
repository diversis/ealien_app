import axios, { AxiosError } from "axios";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";

import { Order } from "@prisma/client";
import {
    CompactOrderItem,
    SerializedPrisma,
    CompactProduct,
} from "@/lib/prisma/types";
import LoaderDots from "../shared/LoaderDots";

export default function PayPalButtonsComponent({
    order,
    refreshOrder,
    handleClose,
}: {
    order: SerializedPrisma<Order> & {
        orderItems: (SerializedPrisma<CompactOrderItem> & {
            product: SerializedPrisma<CompactProduct>;
        })[];
    };
    refreshOrder: () => Promise<void>;
    handleClose: () => void;
}) {
    const { enqueueSnackbar, closeSnackbar } =
        useSnackbar();
    const clientId =
        process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    const createMutation = useMutation<
        { data: any },
        AxiosError,
        any,
        Response
    >({mutationFn:(data): any =>
        axios.post("/api/paypal/createOrder", {
            data,
        })}
    );

    const captureMutation = useMutation<
        string,
        AxiosError,
        any,
        Response
    >({mutationFn:(data): any =>
        axios.post("/api/paypal/captureOrder", data)}
    );

    if (!clientId) return null;

    const paypalCreateOrder = async () => {
        try {
            let response = await createMutation.mutateAsync(
                { orderID: order.id },
            );
            if (
                response.data?.paypalID &&
                typeof response.data?.paypalID === "string"
            ) {
                enqueueSnackbar({
                    message: `created paypal order`,
                    variant: "success",
                    autoHideDuration: 6000,
                });
                return response.data.paypalID;
            }
            enqueueSnackbar({
                message: `Failed to receive paypal order ID`,
                variant: "error",
                autoHideDuration: 6000,
            });
        } catch (error) {
            // Your custom code to show an error like showing a toast:
            // toast.error('Some Error Occured')
            const message =
                !!error &&
                typeof error === "object" &&
                "message" in error &&
                typeof error.message === "string"
                    ? "\n" + error.message
                    : "";
            enqueueSnackbar({
                message: `Failed to create paypal order.${message}`,
                variant: "error",
                autoHideDuration: 6000,
            });
            return null;
        }
    };
    const paypalCaptureOrder = async (
        data: OnApproveData,
    ) => {
        try {
            let response =
                await captureMutation.mutateAsync({
                    orderID: data.orderID,
                });
            if (response) {
                // Order is successful
                // Your custom code
                // Like showing a success toast:
                // toast.success('Amount Added to Wallet')
                // And/Or Adding Balance to Redux Wallet
                // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))

                refreshOrder();
                enqueueSnackbar({
                    message: `Payment successful`,
                    variant: "success",
                    autoHideDuration: 6000,
                });
                handleClose();
            }
        } catch (error) {
            // Order is not successful
            // Your custom code
            // Like showing an error toast
            // toast.error('Some Error Occured')
            const message =
                !!error &&
                typeof error === "object" &&
                "message" in error &&
                typeof error.message === "string"
                    ? "\n" + error.message
                    : "";
            enqueueSnackbar({
                message: `Failed to create paypal order.${message}`,
                variant: "error",
                autoHideDuration: 6000,
            });
        }
    };
    return (
        <PayPalScriptProvider
            options={{
                clientId,
                components: "buttons",
                currency: "USD",
            }}
        >
            <ButtonWrapper
                currency={"USD"}
                showLoader={false}
            />
            <PayPalButtons
                style={{
                    layout: "vertical",
                    shape: "rect",
                    color: "gold",
                }}
                disabled={false}
                forceReRender={[order.totalPrice]}
                fundingSource={undefined}
                createOrder={paypalCreateOrder}
                onApprove={paypalCaptureOrder}
            />
        </PayPalScriptProvider>
    );
}

interface OnApproveData {
    billingToken?: string | null;
    facilitatorAccessToken: string;
    orderID: string;
    payerID?: string | null;
    paymentID?: string | null;
    subscriptionID?: string | null;
    authCode?: string | null;
}

const ButtonWrapper = ({
    currency,
    showLoader,
}: {
    currency?: string;
    showLoader: boolean;
}) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }] =
        usePayPalScriptReducer();

    return <>{showLoader && isPending && <LoaderDots />}</>;
};
