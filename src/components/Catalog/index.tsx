import ProductItem from "@/components/Catalog/ProductItem";
import React, {useEffect, useState} from "react";
import {api} from "@/utils";
import IProduct from "@/types/IProduct";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import {IPage} from "@/types/IPage";
import NotFound from "@/components/NotFound/NotFound";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface CatalogProps {
    size: number
    enablePagination?: boolean
    search?: string
    categoryId?: number
    sort?: string
}

const Catalog = ({size, search, categoryId, sort, enablePagination}: CatalogProps) => {
    enablePagination = enablePagination ?? false
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [products, setProducts] = useState<IProduct[]>([])
    const initialPage = {
        last: false,
        numberElement: 0,
        page: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0
    }
    const [pagination, setPagination] = useState<IPage>(initialPage)

    const onChangePageHandler = (destinationPage: number) => {
        setProducts([])
        setPage(destinationPage)
    }

    useEffect(() => {
        getProducts()
    }, [page, categoryId, search, sort])

    const getProducts = async () => {
        setProducts([])
        setPagination(initialPage)
        try {
            setIsLoading(true)
            const response = await api.get(`/products`, {
                params: {
                    page: page,
                    size: size ?? 6,
                    search: search,
                    categoryId: categoryId ? categoryId : null,
                    sort: sort
                }
            })
            setProducts(response.data.data)
            setPagination(response.data.page)
        } catch (e: any){
            if (e.message.status >= 500){
                toast(e.message.message, {
                    type: "error"
                });
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="container mx-auto">
                {
                    isLoading && <div className="w-full flex justify-center"><Spinner /></div>
                }
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 md:gap-4 2xl:gap-5 mb-4">
                    {
                        products.length > 0 ? products.map(product => (
                            <ProductItem key={product.id} product={product} />
                        )) : !isLoading && <NotFound />
                    }
                </div>
                {
                    enablePagination && <div className="w-full flex justify-end mt-8">
                        <Pagination page={pagination} onChangePageHandler={onChangePageHandler}/>
                    </div>
                }

            </div>
        </>
    )
}

export default Catalog;