import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import { Order } from "@prisma/client";
import {
    CompactOrderItem,
    SerializedPrisma,
    CompactProduct,
} from "@/lib/prisma/types";

const ButtonWrapper = ({
    currency,
    showSpinner,
}: {
    currency: string;
    showSpinner: boolean;
}) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }] =
        usePayPalScriptReducer();

    return (
        <>
            {showSpinner && isPending && (
                <div className="spinner" />
            )}
        </>
    );
};

export default function ButtonsPaypal({
    order,
}: {
    order: SerializedPrisma<Order> & {
        orderItems: (SerializedPrisma<CompactOrderItem> & {
            product: SerializedPrisma<CompactProduct>;
        })[];
    };
}) {
    return (
        <PayPalScriptProvider
            options={{
                clientId:
                    "AZuLejCRKSNYbmVmCUi76Jh4MEHq5CUdVVJFqlxwUYMGyEJZryS5FQ37kzBI91Gi2uGnpPXpMypBhI4X",
                components: "buttons",
                currency: "USD",
            }}
        >
            <ButtonWrapper
                currency={"USD"}
                showSpinner={false}
            />
            <PayPalButtons
                style={{ layout: "vertical" }}
                disabled={false}
                forceReRender={[order.totalPrice]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    description:
                                        orderDescription,
                                    amount: {
                                        currency_code:
                                            currency,
                                        value: order.totalPrice,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                // onApprove={function (data, actions) {
                //     return actions.order.capture().then(function (details) {
                //         const{x, y} = details
                //         console.log('details: ' + x + ' | ' + y)
                //         successPaymentHandler(details)
                //     });
                // }
                // }
                onApprove={function (data, actions) {
                    return actions.order
                        .capture()
                        .then(function (details) {
                            successPaymentHandler(details);
                        });
                }}
            />
        </PayPalScriptProvider>
    );
}
