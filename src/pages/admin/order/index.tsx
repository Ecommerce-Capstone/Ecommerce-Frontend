import React, {useEffect, useState} from "react";
import {IPage} from "@/types/IPage";
import {IOrder} from "@/types/IOrder";
import {api} from "@/utils";
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import ProductTable from "@/components/Table/ProductTable";
import Pagination from "@/components/Pagination";
import ConfirmDeleteProduct from "@/components/Modal/ConfirmDeleteProduct";
import OrderTable from "@/components/Table/OrderTable";
import AdminNavbar from "@/components/Navbar/AdminNavbar";

const OrderPage = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [page, setPage] = useState<IPage>({
        last: false,
        numberElement: 0,
        page: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0
    })
    const [currentPage, setCurrentPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [pendingDeletedOrderId, setPendingDeletedOrderId] = useState(0)

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/orders`, {
                params: {
                    page: currentPage
                }
            })
            setOrders(response.data.data)
            setPage(response.data.page)
        } catch (e: any){
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const onChangePageHandler = (destinationPage: number) => {
        setCurrentPage(destinationPage)
    }

    return (
        <>
            <Head>
                <title>Orders</title>
                <meta property="og:title" content="Products" key="title"/>
            </Head>
            <Layout>
                <AdminNavbar />
                <div className="container w-full px-5 mx-auto flex justify-center">
                    <section className="w-full text-gray-600 body-font overflow-hidden">
                        <div className="px-5 py-12">
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">Orders</h2>
                                {
                                    error && <Alert variant="danger">{error}</Alert>
                                }
                                {
                                    isLoading ? <Spinner /> : <OrderTable orders={orders} />
                                }
                                <div className="flex justify-end mt-8">
                                    <Pagination page={page} onChangePageHandler={onChangePageHandler}/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

export default OrderPage