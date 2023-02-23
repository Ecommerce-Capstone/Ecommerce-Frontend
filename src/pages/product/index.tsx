import Head from "next/head";
import Layout from "@/components/Layout";
import Catalog from "@/components/Catalog";
import React, {useEffect, useState} from "react";
import {IProductCategory} from "@/types/IProductCategory";
import {api, cn} from "@/utils";
import {useSelector} from "react-redux";

interface ProductPageProps {
    categoryIdParam?: number
}

const ProductPage = ({categoryIdParam}:ProductPageProps) => {
    const [categories, setCategories] = useState<IProductCategory[]>([])
    const [categoryId, setCategoryId] = useState(categoryIdParam)
    const keyword = useSelector((state: any) => state.search.keyword)
    const [sort, setSort] = useState("")

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        try {
            const response = await api.get(`/products/categories`)
            setCategories(response.data.data)
        } catch (e){

        }
    }

    return (
        <>
            <Head>
                <title>Catalog</title>
                <meta property="og:title" content="Login" key="title"/>
            </Head>
            <Layout>
                <div className="container w-full px-5 py-8 mx-auto">
                    <div className="w-full flex justify-end mb-8">
                        <button type="button" onClick={() => setCategoryId(0)}
                                className={cn("py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200", categoryId === 0 && "bg-orange-300")}>
                            Semua Kategori
                        </button>
                        {
                            categories.map(category => (
                                <button key={category.id} type="button" onClick={() => setCategoryId(category.id)}
                                        className={cn("py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200", categoryId == category.id && "bg-orange-300")}>{category.name}
                                </button>
                            ))
                        }
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block p-2.5" onChange={(event) => setSort(event.target.value)}>
                            <option value="">Rekomendasi</option>
                            <option value="price,desc">Harga Tertinggi</option>
                            <option value="price,asc">Harga Terrendah</option>
                            <option value="sold,desc">Paling Laris</option>
                        </select>
                    </div>
                    <Catalog size={12} categoryId={categoryId} search={keyword} sort={sort} enablePagination={true} />
                </div>
            </Layout>
        </>
    )
}

export async function getServerSideProps(context: { query: { categoryId: number; }; }) {
    const  { categoryId } = context.query;
    return {
        props: {
            categoryIdParam: categoryId ?? 0
        }
    }
}

export default ProductPage