import Head from "next/head";
import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {api} from "@/utils";
import Pagination from "@/components/Pagination";
import {IPage} from "@/types/IPage";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "@/components/Spinner";
import Alert from "@/components/Alert";
import Link from "next/link";
import Button from "@/components/Button";
import {IProductCategory} from "@/types/IProductCategory";
import ProductCategoryTable from "@/pages/admin/product/category/components/ProductCategoryTable";
import ConfirmDeleteProductCategory from "@/pages/admin/product/category/components/ConfirmDeleteProductCategory";

const ProductCategoriesPage = () => {
    const [productCategories, setProductCategories] = useState<IProductCategory[]>([])
    const [page, setPage] = useState<IPage>({
        last: false,
        number_element: 0,
        page: 0,
        size: 0,
        total_elements: 0,
        total_pages: 0
    })
    const [currentPage, setCurrentPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [pendingDeletedProductCategoryId, setPendingDeletedProductCategoryId] = useState(0)

    useEffect(() => {
        getProductCategories()
    }, [currentPage])

    const getProductCategories = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/products/categories`, {
                params: {
                    page: currentPage
                }
            })
            setProductCategories(response.data.data)
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

    const confirmDeleteProductCategory = (productCategoryId: number) => {
        console.log("product category >> ", productCategoryId)
        setPendingDeletedProductCategoryId(productCategoryId)
    }


    const deleteProductCategory = async () => {
        try {
            setIsLoading(true)
            const response = await api.delete(`/products/categories/${pendingDeletedProductCategoryId}`)
            getProductCategories()
            toast(`Product category successfully deleted`, {
                type: "success"
            });
            setPendingDeletedProductCategoryId(0)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Product Categories</title>
                <meta property="og:title" content="Products" key="title"/>
            </Head>
            <Layout>
                <div className="container w-full px-5 mx-auto flex justify-center">
                    <section className="w-full text-gray-600 body-font overflow-hidden">
                        <div className="px-5 py-12">
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">Product Categories</h2>
                                <div className="flex justify-end my-2">
                                    <Link href="/admin/product/category/create" >
                                        <Button>Create Product Category</Button>
                                    </Link>
                                </div>
                                {
                                    error && <Alert variant="danger">{error}</Alert>
                                }
                                {
                                    isLoading ? <Spinner /> : <ProductCategoryTable productCategories={productCategories} confirmDeleteProductCategoryHandler={confirmDeleteProductCategory} />
                                }
                                <div className="flex justify-end mt-8">
                                    <Pagination page={page} onChangePageHandler={onChangePageHandler}/>
                                </div>
                                {
                                    pendingDeletedProductCategoryId > 0 && <ConfirmDeleteProductCategory deleteProductCategoryHandler={deleteProductCategory} confirmDeleteProductCategoryHandler={confirmDeleteProductCategory} />
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

export default ProductCategoriesPage