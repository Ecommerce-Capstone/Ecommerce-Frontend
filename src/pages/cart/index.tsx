import Layout from "@/components/Layout";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Loading from "@/views/Loading";
import {api} from "@/utils";
import {MinusIcon, PlusIcon} from "@heroicons/react/solid";
import Image from "next/image";
import Button from "@/components/Button";

const CartPage = () => {
    const {data: session, status} = useSession()
    const [carts, setCarts] = useState([])

    useEffect(() => {
        if (status === "authenticated") {
            getCarts()
        }
    }, [status])

    const getCarts = async () => {
        try {
            const response = await api.get(`/orders/carts`, {
                params: {
                    userId: session?.user.id
                }
            })
            setCarts(response.data.data)
        } catch (e) {
            console.log("error >> ", e)
        }
    }

    const addQuantity = async (cartId: number) => {
        try {
            const response = await api.patch(`/orders/carts/${cartId}`, {
                quantity: 1
            })
            setCarts(response.data.data)
        } catch (e) {
            console.log("error >> ", e)
        }
    }

    const reduceQuantity = async (cartId: number) => {

    }

    const removeCart = async (cartId: number) => {

    }

    if (status === "loading") {
        return (<Loading/>)
    }
    return (
        <>
            <Head>
                <title>Cart</title>
                <meta property="og:title" content="Cart" key="title"/>
            </Head>
            <Layout>
                <div className="container mx-auto">
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="px-5 py-12">
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">
                                    Shopping Cart
                                </h2>
                                {
                                    carts.map(cart => (
                                        <div key={cart.id} className="flex items-center py-2 border-b border-gray-200">
                                            <Image src="http://placeimg.com/640/480" alt="a" width={50} height={50}
                                                   className="w-20 h-20"/>
                                            <div className="flex-1 ml-4">
                                                <p className="text-lg font-medium">Product Name</p>
                                                <p className="text-gray-500">120000</p>
                                            </div>
                                            <div className="flex items-center">
                                                <button className="p-1 border border-gray-300 rounded-full">
                                                    <i className="bx bx-minus w-5 h-5 text-gray-400"/>
                                                </button>
                                                <p className="mx-2 font-medium">{cart.quantity}</p>
                                                <button className="p-1 border border-gray-300 rounded-full">
                                                    <i className="bx bx-plus w-5 h-5 text-gray-400"/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-lg font-medium">Total:</p>
                                    <p className="text-lg">120000</p>
                                </div>
                                <div className="text-right mt-4">
                                    <Button >Checkout</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

export default CartPage