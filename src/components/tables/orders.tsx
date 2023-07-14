import Image from "next/image";

import { useCart } from "@/lib/hooks/use-cart";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    SerializableNext,
} from "@/lib/prisma/types";
import { Order } from "@prisma/client";

export default function OrdersTable({
    total,
    editable = false,
    orders,
}: {
    total?: number;
    editable?: boolean;
    orders?: SerializableNext<Order>[];
}) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setRender(true);
    }, []);
    // console.log("orders: ", orders);
    return (
        <>
            {render && !!orders && (
                <table className="table w-full table-fixed border-spacing-1 gap-y-6 rounded-xl border-y border-primary-900/25 text-center text-xs transition-colors dark:border-primary-50/25 lg:text-base">
                    <thead className="table-header-group w-full overflow-hidden border-b border-primary-900/25 dark:border-primary-50/25">
                        <tr className="table-row w-full [&>th:not(:last-child)]:border-r [&>th]:table-cell [&>th]:border-primary-900/25 [&>th]:px-2 [&>th]:py-2 dark:[&>th]:border-primary-50/25">
                            <th scope="col" className="  ">
                                Created At
                            </th>
                            <th scope="col" className="  ">
                                Paid
                            </th>
                            <th scope="col" className="  ">
                                Delivered
                            </th>
                            <th scope="col" className="   px-8">
                                Total Price
                            </th>
                            <th scope="col" className="  ">
                                Payment Method
                            </th>
                            <th scope="col" className=" "></th>
                        </tr>
                    </thead>
                    <tbody className="table-row-group w-full  transition-colors [&>*:nth-child(even)]:bg-primary-900/80 [&>*:nth-child(even)]:text-primary-50 dark:[&>*:nth-child(even)]:bg-primary-50/80 dark:[&>*:nth-child(even)]:text-primary-900">
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
                            const dateFormat = new Intl.DateTimeFormat("en-US");
                            return (
                                <tr
                                    key={`table-item-${id}`}
                                    className={`xl:table-row xl:text-left [&>td:not(:last-child)]:border-r [&>td]:table-cell [&>td]:h-full [&>td]:border-primary-900/25  dark:[&>td]:border-primary-50/25`}
                                >
                                    <td scope="row" className="">
                                        <span className="mx-auto px-2">
                                            {dateFormat.format(
                                                new Date(createdAt),
                                            )}
                                        </span>
                                    </td>

                                    <td scope="row" className=" text-center ">
                                        {isPaid && paidAt ? (
                                            <span className="px-2">
                                                {dateFormat.format(
                                                    new Date(paidAt),
                                                )}
                                            </span>
                                        ) : (
                                            <FiXCircle className="m-auto h-4 w-4 fill-red-500 lg:h-6 lg:w-6"></FiXCircle>
                                        )}
                                    </td>
                                    <td scope="row" className="text-center ">
                                        {isDelivered && deliveredAt ? (
                                            <span className="px-2">
                                                {dateFormat.format(
                                                    new Date(deliveredAt),
                                                )}
                                            </span>
                                        ) : (
                                            <FiXCircle className="m-auto h-4 w-4 fill-red-500 p-0 lg:h-6 lg:w-6 "></FiXCircle>
                                        )}
                                    </td>
                                    <td scope="row" className="   text-center ">
                                        <span className="px-0.5 lg:px-2">
                                            {totalPrice.toFixed(2)}
                                        </span>
                                    </td>
                                    <td scope="row" className="   text-center ">
                                        <span className="px-0.5 lg:px-2">
                                            {paymentMethod}
                                        </span>
                                    </td>

                                    <td scope="row" className="  w-10 lg:w-16">
                                        <p className="px-2">
                                            <Link
                                                href={`/order/${id}`}
                                                className="link-border group/details place-orders-center relative m-0 grid h-1/2 p-0  transition-all "
                                            >
                                                <FaEdit className="m-auto h-4 w-4 lg:h-6 lg:w-6" />
                                            </Link>
                                        </p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            {(!orders || orders.length < 1) && <div> No orders yet</div>}
        </>
    );
}
