import React, {useEffect, useState} from "react";
import {IOrder} from "@/types/IOrder";
import {IPage} from "@/types/IPage";
import {api} from "@/utils";
import {useSession} from "next-auth/react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import OrderTable from "@/components/Table/OrderTable";
import Pagination from "@/components/Pagination";
import Loading from "@/views/Loading";

const OrderPage = () => {
    const {data: session, status} = useSession()
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

    useEffect(() => {
        if (status === "authenticated"){
            getOrders()
        }
    }, [status])

    const getOrders = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/orders`, {
                params: {
                    page: currentPage,
                    userId: session?.user.id
                }
            })
            setOrders(response.data.data)
            setPage(response.data.page)
        } catch (e: any){
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    const onChangePageHandler = (destinationPage: number) => {
        setCurrentPage(destinationPage)
    }

    if (status === "loading") {
        return (<Loading/>)
    }

    return (
        <>
            <Head>
                <title>Orders</title>
                <meta property="og:title" content="Products" key="title"/>
            </Head>
            <Layout>
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