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
import Alert from "@/components/Alert";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import BasicTextArea from "@/components/Input/BasicTextArea";
import Image from "next/image";
import {IProductCategory} from "@/types/IProductCategory";


export interface ProductCategoryPageProps {
    productCategoryId: number
}

const ProductPage = ({productCategoryId} : ProductCategoryPageProps) => {
    const router = useRouter();
    const [productCategory, setProductCategory] = useState<IProductCategory>({
        description: "",
        id: 0,
        image: "/illustration/images.svg",
        name: ""
    })
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isImageLoading, setIsImageLoading] = useState(true)
    const inputFileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        getAndSetCurrentProductCategory()
    }, [])

    const updateProductCategoryFormSchema = yup.object().shape({
        name: yup.string()
            .required("Name is required"),
        description: yup.string()
            .required("Description is required"),
        image: yup.string()
            .required("Image is required")
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
            setProductCategory(currentProductCategory)
            setIsImageLoading(false)
            setValue("name", currentProductCategory.name);
            setValue("description", currentProductCategory.description);
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
            setValue("image", response.data.data.url);
            setProductCategory({...productCategory, image: response.data.data.url})
        } catch (e){

        } finally {
            setIsImageLoading(false)
        }
    }
    return (
        <>
            <Head>
                <title>Edit Product Category</title>
                <meta property="og:title" content="Product Return" key="title"/>
            </Head>
            <Layout>
                <AdminNavbar />
                <div className="container w-full px-5 py-24 mx-auto flex justify-center">
                    <div className="w-full flex">
                        <div className="w-3/12">
                            <div className="px-8 relative">
                                {
                                    <Image className="rounded w-full" src={productCategory.image} alt={productCategory.name} width={400} height={400} />
                                }
                                <div className="absolute bottom-1 right-8">
                                    <input type="file" className="hidden" ref={inputFileRef} onChange={() => onFileChange(event)} />
                                    <button type="button" className="border bg-white hover:text-slate-500 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center" onClick={handleSelectFile} disabled={isImageLoading}>
                                        {
                                            isImageLoading ? <i className="bx bx-loader bx-spin text-2xl"/> : <i className="bx bx-image-add text-2xl"/>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-9/12">
                            {
                                error && <Alert variant="danger">{error}</Alert>
                            }
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <BasicInput label="Product Category Name" type="text" error={errors["name"]} {...register("name")}  />
                                <BasicTextArea label="Description" type="text" error={errors["description"]} {...register("description")} />
                                <Button type="submit" isLoading={isLoading} >Update Product Category</Button>
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