import Layout from "@/components/Layout";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Loading from "@/views/Loading";
import {api, idr} from "@/utils";
import Image from "next/image";
import Button from "@/components/Button";
import {ICart} from "@/types/ICart";
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {updateCart} from "@/store/cart";

const CartPage = () => {
    const router = useRouter();
    const {data: session, status} = useSession()
    const [carts, setCarts] = useState<ICart[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (status === "authenticated") {
            getCarts()
        }
    }, [status])

    useEffect(() => {
        let total = 0
        carts.map(cart => {
            total += cart.quantity * cart.product.price
        })
        setTotal(total)
    }, [carts])

    const getCarts = async () => {
        try {
            const response = await api.get(`/orders/carts`, {
                params: {
                    userId: session?.user.id
                }
            })
            setCarts(response.data.data)
        } catch (e) {
        }
    }

    const addQuantity = async (index: number) => {
        if (carts[index].product.stock > carts[index].quantity){
            carts[index].quantity++
        }
        setCarts([...carts])
    }

    const reduceQuantity = async (index: number) => {
        if (carts[index].quantity > 1){
            carts[index].quantity--
        }
        setCarts([...carts])
    }

    const removeCart = async (cartId: number) => {
        try {
            const response = await api.delete(`/orders/carts/${cartId}`)
            getCarts()
            dispatch(updateCart(true))
        } catch (e) {

        }
    }

    const saveCart = async (index: number) => {
        const cartId = carts[index].id
        try {
            const response = await api.patch(`/orders/carts/${cartId}`, {
                quantity: carts[index].quantity
            })
            getCarts()
            dispatch(updateCart(true))
        } catch (e) {

        }
    }

    const checkout = async () => {
        try {
            setIsLoading(true);
            const response = await api.post(`/orders`);
            return router.push(`/invoice/${response.data.data.id}`);
        } catch (e){

        } finally {
            setIsLoading(false)
        }
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
                                    carts.map((cart, index) => (
                                        <div key={cart.id} className="flex items-center py-2 border-b border-gray-200">
                                            <Image src={cart.product.images} alt="a" width={50} height={50} className="w-20 h-20"/>
                                            <div className="flex-1 ml-4">
                                                <p className="text-lg font-medium">{cart.product.name}</p>
                                                <p className="text-gray-500">{idr(cart.product.price)}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <button className="p-1 border border-gray-300 rounded-full" onClick={() => reduceQuantity(index)} onMouseLeave={() => saveCart(index)}>
                                                    <i className="bx bx-minus w-5 h-5 text-gray-400"/>
                                                </button>
                                                <p className="mx-2 font-medium">{cart.quantity}</p>
                                                <button className="p-1 border border-gray-300 rounded-full" onClick={() => addQuantity(index)} onMouseLeave={() => saveCart(index)}>
                                                    <i className="bx bx-plus w-5 h-5 text-gray-400"/>
                                                </button>

                                                <button className="p-1 border border-gray-300 rounded-full bg-red-500 ml-8" onClick={() => removeCart(cart.id)}>
                                                    <i className="bx bx-trash w-5 h-5 text-white"/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-lg font-medium">Total:</p>
                                    <p className="text-lg">{idr(total)}</p>
                                </div>
                                <div className="text-right mt-4">
                                    {
                                        carts.length > 0 && <Button isLoading={isLoading} onClickHandler={checkout} >Checkout</Button>
                                    }
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