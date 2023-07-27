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
import { SerializableNext } from "@/lib/prisma/types";
import { Order } from "@prisma/client";

export default function OrdersTable({
    total,
    editable = false,
    orders,
}: {
    total?: number;
    editable?: boolean;
    orders: SerializableNext<Order>[];
}) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setRender(true);
    }, []);
    // console.log("orders: ", orders);
    return (
        <TableContainer>
            {render && !!orders && (
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell className="  w-1/5 whitespace-nowrap"></TableCell>
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
                                scope="col"
                                className=" "
                            >
                                Payment Method
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
                                        createdAt
                                            ? "bg-tertiary-200/50"
                                            : ""
                                    }`}
                                    hover
                                >
                                    <TableCell
                                        scope="row"
                                        className=""
                                    >
                                        {dateFormat.format(
                                            new Date(
                                                createdAt,
                                            ),
                                        )}
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        className="  w-full   "
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
                                            <CancelIcon className="m-auto h-4 w-4 fill-red-500 lg:h-6 lg:w-6"></CancelIcon>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        className="  w-full   "
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
                                            <CancelIcon className="m-auto h-4 w-4 fill-red-500 lg:h-6 lg:w-6"></CancelIcon>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        className=" text-center "
                                    >
                                        {totalPrice.toFixed(
                                            2,
                                        )}
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        className="text-center "
                                    >
                                        {paymentMethod}
                                    </TableCell>

                                    <TableCell
                                        scope="row"
                                        className=""
                                    >
                                        <Link
                                            href={`/order/${id}`}
                                            className="link-border group/details place-orders-center relative m-0 grid h-1/2 p-0  transition-all "
                                        >
                                            <EditIcon className="m-auto h-4 w-4 lg:h-6 lg:w-6" />
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
