import Head from "next/head";
import Layout from "@/components/Layout";
import BasicInput from "@/components/Input/BasicInput";
import Button from "@/components/Button";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import BasicTextArea from "@/components/Input/BasicTextArea";
import React, {useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {api} from '@/utils'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/views/Loading";
import Unauthenticated from "@/views/Unauthenticated";
import Image from "next/image";
import {IUser} from "@/types/IUser";
import IProduct from "@/types/IProduct";
import {useRouter} from "next/router";
import {IProductCategory} from "@/types/IProductCategory";
import Alert from "@/components/Alert";
import BasicSelect from "@/components/Input/BasicSelect";


const ProductPage = () => {
    const router = useRouter();
    const [error, setError] = useState("")
    const [product, setProduct] = useState<IProduct>({description: "", id: "", images: "", name: "", price: 0, stock: 0, categoryId: 0})
    const [productCategories, setProductCategories] = useState<IProductCategory[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(false)
    const inputFileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        getProductCategories()
    }, [])

    const getProductCategories = async () => {
        try {
            const response = await api.get(`/products/categories`)
            setProductCategories(response.data.data)
        } catch (e: any){
            setError(e.message)
        }
    }

    const updateProductFormSchema = yup.object().shape({
        name: yup.string()
            .required("Name is required"),
        price: yup.number()
            .required("Price is required"),
        stock: yup.number()
            .required("Price is required"),
        description: yup.string()
            .required("Description is required"),
        images: yup.string()
            .required("images is required"),
        categoryId: yup.number()
            .required("Product category is required"),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(updateProductFormSchema)
    });

    async function onFormSubmit(formData: any) {
        setIsLoading(true);
        try {
            const data = await api.post(`/products`, formData);
            console.log("data >> ", data)
            toast(`Product successfully created!`, {
                type: "success"
            });
            setTimeout(() => {
                router.push("/admin/product")
            }, 3000)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSelectFile = () => {
        inputFileRef.current?.click()
    }
    const onFileChange = async (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        try {
            setIsImageLoading(true)
            let formData = new FormData()
            formData.append("file", event.target.files[0])
            const response = await api.post(`/files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setValue("images", response.data.data.url);
            setProduct({...product, images: response.data.data.url})
        } catch (e){

        } finally {
            setIsImageLoading(false)
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
                        <div className="w-3/12">
                            <div className="px-8 relative">
                                {
                                    product.images ? <Image className="rounded w-full" src={product.images} alt={product.name} width={400} height={400} /> : <Image className="rounded w-full" src="/select_image.png" alt={product.name} width={400} height={400} />
                                }
                                <div className="absolute bottom-1 right-8">
                                    <input type="file" className="hidden" ref={inputFileRef} onChange={() => onFileChange(event)} />
                                    <button type="button" className="border bg-white hover:text-slate-500 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center" onClick={handleSelectFile} disabled={isImageLoading}>
                                        {
                                            isImageLoading ? <i className="bx bx-loader bx-spin text-2xl"/> : <i className="bx bx-image-add text-2xl"/>
                                        }
                                    </button>
                                    { errors.images && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{`${errors.images.message}`}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="w-9/12">
                            {
                                error && <Alert variant="danger">{error}</Alert>
                            }
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <BasicInput label="Product Name" type="text" error={errors["name"]} {...register("name")}  />
                                <BasicInput label="Price" type="number" error={errors["price"]} {...register("price")} />
                                <BasicInput label="Stock" type="number" error={errors["stock"]} {...register("stock")} />
                                <BasicSelect label="Category" options={productCategories} defaultValue={product.categoryId} error={errors["categoryId"]} {...register("categoryId")} />
                                <BasicTextArea label="Description" type="text" error={errors["description"]} {...register("description")} />
                                <input type="hidden" {...register("images")} />
                                <Button type="submit" isLoading={isLoading} >Update Product</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ProductPage