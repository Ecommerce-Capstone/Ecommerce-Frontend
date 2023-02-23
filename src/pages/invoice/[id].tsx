import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {IOrderItem} from "@/types/IOrderItem";
import {IOrder} from "@/types/IOrder";
import {api, idr} from "@/utils";
import Link from "next/link";
import Button from "@/components/Button";
import _ from "lodash"
import {Stomp} from "@stomp/stompjs";
// @ts-ignore
import * as SockJS from 'sockjs-client';
import moment from "moment"
import Head from "next/head";

interface InvoicePageProps {
    orderId: number
}

const InvoicePage = ({orderId}: InvoicePageProps) => {
    const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    const [order, setOrder] = useState<IOrder>({
        createdAt: 0,
        paymentUrl: "", status: "", id: 0, total: 0, user: undefined, userId: 0})
    const [orderItem, setOrderItem] = useState<IOrderItem[]>([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        getOrder()
        getOrderItem()
        connectWs()
    }, [])

    useEffect(() => {
        countTotal()
    }, [orderItem])

    const countTotal = () => {
        let t = 0;
        orderItem.map(oi => {
            t += oi.price * oi.quantity
        })
        setTotal(t)
    }

    const getOrder = async () => {
        try {
            const response = await api.get(`/orders/${orderId}`)
            setOrder(response.data.data)
        } catch (e) {

        }
    }

    const getOrderItem = async () => {
        try {
            const response = await api.get(`/orders/${orderId}/items`)
            setOrderItem(response.data.data)
        } catch (e) {

        }
    }

    const connectWs = () => {
        const socket = new SockJS(websocketUrl);
        const client = Stomp.over(socket)
        client.connect({}, function (frame: any) {
            client.subscribe(`/i/order-${orderId}`, function (message) {
                const m = JSON.parse(message.body);
                setOrder(m)
            });
        });
    }
    return (
        <>
            <Head>
                <title>Invoice</title>
                <meta property="og:title" content="Products" key="title"/>
            </Head>
            <Layout>
                <div className="container mx-auto my-14">
                    <div className="flex-shrink max-w-full px-4 w-full mb-6">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-3">
                                <div className="flex flex-col">
                                    <p className="text-sm">{order?.user?.address}</p>
                                </div>
                                <div className="text-4xl uppercase font-bold">Invoice</div>
                            </div>
                            <div className="flex flex-row justify-between py-3">
                                <div className="flex-1">
                                    <p><strong>Bill to:</strong><br/>
                                        {order?.user?.fullName}<br/>
                                        {order?.user?.address}<br/>
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-2">
                                        <div className="flex-1 font-semibold">Invoice ID</div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">INV#{order.id}</div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="flex-1 font-semibold">Invoice Date</div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">{moment(order.createdAt).toLocaleString()}</div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="flex-1 font-semibold">Status</div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">
                                            {order.status}
                                            {
                                                order.status === "UNPAID" && <span>
                                                <br/>
                                                <Link href={order.paymentUrl} target="_blank" className="text-blue-500 font-medium">Bayar</Link>
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4">
                                <table className="table-bordered w-full ltr:text-left rtl:text-right text-gray-600">
                                    <thead className="border-b">
                                    <tr className="bg-gray-100">
                                        <th>Products</th>
                                        <th className="text-center">Qty</th>
                                        <th className="text-center">Unit price</th>
                                        <th className="text-center">Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        orderItem.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="flex flex-wrap flex-row items-center">
                                                        <div className="self-center">
                                                            <img className="h-12 w-12 mx-4 my-1 rounded" src={item.productImages}/>
                                                        </div>
                                                        <div className="leading-5 flex-1 ltr:ml-2 rtl:mr-2 mb-1">
                                                            {item.productName}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">{item.quantity}</td>
                                                <td className="text-center">{idr(item.price)}</td>
                                                <td className="text-center">{idr(item.quantity * item.price)}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colSpan={2}/>
                                        <td className="text-center"><b>Total</b></td>
                                        <td className="text-center font-bold">{idr(total)}</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export async function getServerSideProps(context: { params: { id: number; }; }) {
    const {id} = context.params;
    return {
        props: {
            orderId: id
        }
    }
}

export default InvoicePage