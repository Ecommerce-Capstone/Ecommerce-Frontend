import React from 'react'
import 'boxicons/css/boxicons.min.css'
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Catalog from "@/components/Catalog";
import {useState} from "react";
import { Fragment } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import Head from 'next/head';

interface Order {
    id: number;
    userId: string;
    userName: string;
    date: string;
    total: number;
}

function OrderListTable({ orders }: { orders: Order[] }) {
    return (
        <>
            
                <div className="container mx-auto">
                        <div className="px-5 py-12">
                            <div className="flex flex-col">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                    <th className="px-4 py-2">No</th>
                                    <th className="px-4 py-2">ID User</th>
                                    <th className="px-4 py-2">Name of User</th>
                                    <th className="px-4 py-2">Date Order</th>
                                    <th className="px-4 py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                    <tr key={order.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{order.userId}</td>
                                        <td className="border px-4 py-2">{order.userName}</td>
                                        <td className="border px-4 py-2">{format(new Date(order.date), "MMMM d, yyyy")}</td>
                                        <td className="border px-4 py-2">${order.total.toFixed(2)}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                </div>
        </>
    )
}

export default function Orders() {
    const orders = [
    {
        id: 1,
        userId: "123",
        userName: "John Doe",
        date: "2022-01-01",
        total: 10.0,
    },
    {
        id: 2,
        userId: "456",
        userName: "Jane Smith",
        date: "2022-01-02",
        total: 20.0,
    },
    {
        id: 3,
        userId: "789",
        userName: "Bob Johnson",
        date: "2022-01-03",
        total: 30.0,
    },
]

return (
    <>
        <Layout>
            <div className="container mx-auto">
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="px-5 py-12">
                        <div className="flex flex-col">
                            <h2>
                                <title>Orders</title>
                            </h2>
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">
                                Order List
                                </h2>
                                <OrderListTable orders={orders} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    </>
)
}
