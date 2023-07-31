import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SerializedPrisma } from "@/lib/prisma/types";
import { Order } from "@prisma/client";

export default function OrdersTable({
    total,
    editable = false,
    orders,
}: {
    total?: number;
    editable?: boolean;
    orders: SerializedPrisma<Order>[];
}) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setRender(true);
    }, []);
    // console.log("orders: ", orders);
    return (
        <TableContainer
            classes={{
                root: "bg-surface-50/25 dark:bg-surface-900/25",
            }}
        >
            {render && !!orders && (
                <Table stickyHeader>
                    <TableHead>
                        <TableRow className="[&>*:not(:last-child)]:border-r  [&>*]:border-surface-500/25">
                            <TableCell
                                align="center"
                                scope="col"
                                className=""
                            >
                                Created At
                            </TableCell>
                            <TableCell
                                align="center"
                                scope="col"
                                className="  "
                            >
                                Paid
                            </TableCell>
                            <TableCell
                                align="center"
                                scope="col"
                                className="  "
                            >
                                Delivered
                            </TableCell>
                            <TableCell
                                align="center"
                                scope="col"
                                className="   px-8"
                            >
                                Total Price
                            </TableCell>
                            <TableCell
                                align="center"
                                scope="col"
                                className=" "
                            >
                                Payment Method
                            </TableCell>
                            <TableCell
                                align="center"
                                scope="col"
                                className=" "
                            >
                                Edit
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="[&>*:nth-of-type(even)]:bg-secondary-100/20">
                        {orders.map((order) => {
                            const {
                                id,
                                createdAt,
                                deliveredAt,
                                isDelivered,
                                isPaid,
                                paidAt,
                                paymentMethod,
                                totalPrice,
                            } = order;
                            const dateFormat =
                                new Intl.DateTimeFormat(
                                    "en-US",
                                );
                            return (
                                <TableRow
                                    key={`order-${order.id}`}
                                    className={`${
                                        isPaid
                                            ? "bg-tertiary-200/50"
                                            : ""
                                    } [&>*:not(:last-child)]:border-r  [&>*]:border-surface-500/25`}
                                    hover
                                >
                                    <TableCell
                                        scope="row"
                                        className=""
                                        align="center"
                                    >
                                        {dateFormat.format(
                                            new Date(
                                                createdAt,
                                            ),
                                        )}
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        align="center"
                                        className=""
                                    >
                                        {isPaid &&
                                        paidAt ? (
                                            <>
                                                {dateFormat.format(
                                                    new Date(
                                                        paidAt,
                                                    ),
                                                )}
                                            </>
                                        ) : (
                                            <CancelIcon className="mx-auto h-4 w-4 fill-red-500 lg:h-6 lg:w-6"></CancelIcon>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        align="center"
                                        className="  "
                                    >
                                        {isDelivered &&
                                        deliveredAt ? (
                                            <>
                                                {dateFormat.format(
                                                    new Date(
                                                        deliveredAt,
                                                    ),
                                                )}
                                            </>
                                        ) : (
                                            <CancelIcon className="mx-auto h-4 w-4 fill-red-500 lg:h-6 lg:w-6"></CancelIcon>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        align="center"
                                        className=" text-center "
                                    >
                                        {totalPrice.toFixed(
                                            2,
                                        )}
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        align="center"
                                        className="text-center "
                                    >
                                        {paymentMethod}
                                    </TableCell>

                                    <TableCell
                                        scope="row"
                                        align="center"
                                        className=""
                                    >
                                        <Link
                                            href={`/order/${id}`}
                                            className="link-border group/details place-orders-center relative m-0 grid h-1/2 p-0  transition-all "
                                        >
                                            <EditIcon className="mx-auto h-4 w-4 lg:h-6 lg:w-6" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
            {(!orders || orders.length < 1) && (
                <div> No orders yet</div>
            )}
        </TableContainer>
    );
}
