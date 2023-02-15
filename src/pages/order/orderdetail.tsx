import React from 'react';
import 'boxicons/css/boxicons.min.css';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Catalog from '@/components/Catalog';
import { useState } from 'react';
import { Fragment } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import Head from 'next/head';
import { de } from 'date-fns/locale';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    }

interface Order {
    id: number;
    userId: string;
    userName: string;
    date: string;
    total: number;
    items: OrderItem[];
    }

interface OrderDetailProps {
    order: Order;
}

function OrderDetail({ order }: OrderDetailProps) {
    return (
        <>
        <div className="container mx-auto">
            <section className="text-gray-600 body-font overflow-hidden">
            <div className="px-5 py-12">
                <div className="flex flex-col">
                <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">Order Detail</h2>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-6 pt-6 pb-10 border-b border-gray-300">
                    <div className="col-span-1">
                        <div className="text-gray-500">Order ID</div>
                        <div className="font-medium">111</div>
                    </div>
                    <div className="col-span-1">
                        <div className="text-gray-500">Order Date</div>
                        <div className="font-medium">16/02/2023</div>
                    </div>
                    <div className="col-span-1">
                        <div className="text-gray-500">Customer ID</div>
                        <div className="font-medium">2134</div>
                    </div>
                    <div className="col-span-1">
                        <div className="text-gray-500">Customer Name</div>
                        <div className="font-medium">Jhondo bukan Jomblo</div>
                    </div>
                    </div>
                    <div className="pt-10">
                    <table className="w-full table-auto">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Keris Sakti empu-empu</td>
                                <td className="border px-4 py-2">Rp. 100.000</td>
                                <td className="border px-4 py-2">1</td>
                                <td className="border px-4 py-2">Rp. 100.000</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Bunga yang tumbuh hanya di sana</td>
                                <td className="border px-4 py-2">Rp. 50.000</td>
                                <td className="border px-4 py-2">2</td>
                                <td className="border px-4 py-2">Rp. 100.000</td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={3} className="text-right border-t px-4 py-2">
                            <strong>Total</strong>
                            </td>
                            <td className="border-t px-4 py-2">Rp. 200.000</td>
                        </tr>
                        </tfoot>
                        </table>
            </div>
            </div>
            </div>
            </div>
            </section>
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
        items: ["Artefak","Kerupuk"],
    }
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
                                <OrderDetail orders={orders} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    </>
)
}
