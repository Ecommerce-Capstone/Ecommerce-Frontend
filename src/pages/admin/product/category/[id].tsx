import Head from "next/head";
import Layout from "@/components/Layout";
import BasicInput from "@/components/Input/BasicInput";
import Button from "@/components/Button";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from "react";
import {api} from '@/utils'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";
import Alert from "@/components/Alert";


export interface ProductCategoryPageProps {
    productCategoryId: number
}

const ProductPage = ({productCategoryId} : ProductCategoryPageProps) => {
    const router = useRouter();
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAndSetCurrentProductCategory()
    }, [])

    const updateProductCategoryFormSchema = yup.object().shape({
        name: yup.string()
            .required("Name is required")
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(updateProductCategoryFormSchema)
    });

    const getAndSetCurrentProductCategory = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/products/categories/${productCategoryId}`)
            const currentProductCategory = response.data.data
            setValue("name", currentProductCategory.name);
        } catch (e: any){
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function onFormSubmit(formData: any) {
        setIsLoading(true);
        try {
            const data = await api.patch(`/products/categories/${productCategoryId}`, formData);
            toast(`Product category successfully updated!`, {
                type: "success"
            });
            setTimeout(() => {
                router.push("/admin/product/category")
            }, 3000)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Head>
                <title>Product Return</title>
                <meta property="og:title" content="Product Return" key="title"/>
            </Head>
            <Layout>
                <div className="container w-full px-5 py-24 mx-auto flex justify-center">
                    <div className="w-full flex">
                        <div className="w-9/12">
                            {
                                error && <Alert variant="danger">{error}</Alert>
                            }
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <BasicInput label="Product Category Name" type="text" error={errors["name"]} {...register("name")}  />
                                <Button type="submit" isLoading={isLoading} >Update Product</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export async function getServerSideProps(context: { params: { id: number; }; }) {
    const  { id } = context.params;
    return {
        props: {
            productCategoryId: id
        }
    }
}

export default ProductPage