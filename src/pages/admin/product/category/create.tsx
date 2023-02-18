import Head from "next/head";
import Layout from "@/components/Layout";
import BasicInput from "@/components/Input/BasicInput";
import Button from "@/components/Button";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useRef, useState} from "react";
import {api} from '@/utils'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";
import {IProductCategory} from "@/types/IProductCategory";
import Alert from "@/components/Alert";

const ProductPage = () => {
    const router = useRouter();
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const updateProductCategoryFormSchema = yup.object().shape({
        name: yup.string()
            .required("Name is required")
    });

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(updateProductCategoryFormSchema)
    });

    async function onFormSubmit(formData: any) {
        setIsLoading(true);
        try {
            const data = await api.post(`/products/categories`, formData);
            toast(`Product category successfully created!`, {
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
                                <Button type="submit" isLoading={isLoading} >Create Product Category</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ProductPage