import 'boxicons/css/boxicons.min.css'
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Catalog from "@/components/Catalog";
import React, {useEffect, useState} from "react";
import {api} from "@/utils";
import IProduct from "@/types/IProduct";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import Head from "next/head";
import {useSession} from "next-auth/react";
import Loading from "@/views/Loading";
import Alert from "@/components/Alert";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {addCart, updateCart} from "@/store/cart";

interface ProductDetailPageProps {
    productId: number
}

const ProductDetailPage = ({ productId }: ProductDetailPageProps) => {
    console.log("product id >> ", productId)
    const {data:session, status} = useSession()
    const [count, setCount] = useState(1);
    const [product, setProduct] = useState<IProduct>({
        categoryId: 0,
        description: "",
        id: "",
        images: "",
        name: "",
        price: 0,
        stock: 0
    })
    const [isCartLoading, setIsCartLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        try {
            const response = await api.get(`/products/${productId}`)
            setProduct(response.data.data)
        } catch (e){

        }
    }

    const setQuantity = (qty: number) => {
        if (product.stock >= qty){
            setCount(qty)
        }
    }

    const addToCart = async () => {
        try {
            setIsCartLoading(true)
            const response = await api.post(`/orders/carts`, {
                productId: product.id,
                quantity: count
            })
            dispatch(updateCart(true))
            toast(`Product added to cart`, {
                type: "success"
            });
        } catch (e: any){
            toast(e.message, {
                type: "error"
            });
            console.log("error >> ", e)
        } finally {
            setIsCartLoading(false)
        }
    }

    if (status === "loading"){
        return (<Loading />)
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>{product.name}</title>
                    <meta property="og:title" content="Product" key="title"/>
                </Head>
                <div className="container mx-auto">
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="px-5 py-12">
                            <div className="flex flex-wrap">
                                <Image src={product.images} alt={product.name} width={400} height={400} className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"/>
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <div className="pb-5">
                                        <div className="mb-2 md:mb-2.5 block -mt-1.5" role="button">
                                            <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl hover:text-brand">
                                                {product.name}
                                            </h2>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                                                {product.price}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="leading-relaxed">
                                        {product.description}
                                    </p>
                                    {
                                        session ? <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
                                            <div className="flex items-center justify-between rounded overflow-hidden shrink-0 h-11 md:h-14 bg-[#f3f5f9]">
                                                <button className="flex items-center justify-center shrink-0 h-full transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none w-10 h-10 rounded-full transform scale-80 lg:scale-100 text-brand-dark hover:bg-fill-four ltr:ml-auto rtl:mr-auto" onClick={() => setQuantity(count - 1)}>
                                                    <i className="bx bx-minus" />
                                                </button>
                                                <span className="font-semibold text-brand-dark flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default shrink-0 text-base md:text-[17px] w-12 md:w-20 xl:w-28">
                                                {count}
                                            </span>
                                                <button className="group flex items-center justify-center h-full shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none w-10 h-10 rounded-full scale-80 lg:scale-100 text-heading hover:bg-fill-four ltr:mr-auto rtl:ml-auto" onClick={() => setQuantity(count + 1)}>
                                                    <i className="bx bx-plus" />
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <Button type="button" onClickHandler={addToCart} isLoading={isCartLoading} className="w-full">
                                                    <i className="bx bx-cart-add mr-4 font-bold" />
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div> : <div className="mt-8">
                                            <Alert variant="warning" className="mt-4" >Silakan login untuk membeli item ini</Alert>
                                            <Link href="/auth/signin">
                                                <Button>Login</Button>
                                            </Link>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-wrap items-center justify-between mb-5 md:mb-6">
                        <div className="-mt-1.5 mb-0"><h2
                            className="text-brand-dark text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-manrope">Related
                            products</h2></div>
                    </div>

                    <Catalog size={6} />
                </div>
            </Layout>
        </>
    )
}

export async function getServerSideProps(context: { params: { id: number; }; }) {
    const  { id } = context.params;
    return {
        props: {
            productId: id
        }
    }
}

export default ProductDetailPage;