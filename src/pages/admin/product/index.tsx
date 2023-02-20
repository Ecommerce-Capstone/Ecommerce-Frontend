import Head from "next/head";
import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {api, cn} from "@/utils";
import Pagination from "@/components/Pagination";
import IProduct from "@/types/IProduct";
import {IPage} from "@/types/IPage";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductTable from "@/components/Table/ProductTable";
import Spinner from "@/components/Spinner";
import ConfirmDeleteProduct from "@/components/Modal/ConfirmDeleteProduct";
import Alert from "@/components/Alert";
import Link from "next/link";
import Button from "@/components/Button";

const ProductsPage = () => {
    const [products, setProducts] = useState<IProduct[]>([])
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
    const [pendingDeletedProductId, setPendingDeletedProductId] = useState(0)

    useEffect(() => {
        getProducts()
    }, [currentPage])

    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/products`, {
                params: {
                    page: currentPage
                }
            })
            setProducts(response.data.data)
            setPage(response.data.page)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const onChangePageHandler = (destinationPage: number) => {
        setCurrentPage(destinationPage)
    }

    const confirmDeleteProduct = (productId: number) => {
        setPendingDeletedProductId(productId)
    }


    const deleteProduct = async () => {
        try {
            setIsLoading(true)
            const response = await api.delete(`/products/${pendingDeletedProductId}`)
            getProducts()
            toast(`Product successfully deleted`, {
                type: "success"
            });
            setPendingDeletedProductId(0)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Products</title>
                <meta property="og:title" content="Products" key="title"/>
            </Head>
            <Layout>
                <div className="container w-full px-5 mx-auto flex justify-center">
                    <section className="w-full text-gray-600 body-font overflow-hidden">
                        <div className="px-5 py-12">
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">Products</h2>
                                <div className="flex justify-end my-2">
                                    <Link href="/admin/product/create" >
                                        <Button>Create Product</Button>
                                    </Link>
                                </div>
                                {
                                    error && <Alert variant="danger">{error}</Alert>
                                }
                                {
                                    isLoading ? <Spinner /> : <ProductTable products={products} confirmDeleteProductHandler={confirmDeleteProduct} />
                                }
                                <div className="flex justify-end mt-8">
                                    <Pagination page={page} onChangePageHandler={onChangePageHandler}/>
                                </div>
                                {
                                    pendingDeletedProductId > 0 && <ConfirmDeleteProduct deleteProductHandler={deleteProduct} confirmDeleteProductHandler={confirmDeleteProduct} />
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

export default ProductsPage