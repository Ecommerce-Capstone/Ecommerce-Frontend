import Head from "next/head";
import Layout from "@/components/Layout";
import BasicInput from "@/components/HighlightCategory/Input/BasicInput";
import Button from "@/components/Button";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import BasicTextArea from "@/components/HighlightCategory/Input/BasicTextArea";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {api} from '@/utils'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/views/Loading";
import Unauthenticated from "@/views/Unauthenticated";


export interface ProductPageProps {
    productId: number
}

const ProductPage = ({productId} : ProductPageProps) => {
    console.log("props >> ", productId)
    const [error, setError] = useState("")
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAndSetCurrentProduct()
    }, [])

    const updateProductFormSchema = yup.object().shape({
        name: yup.string()
            .required("Name is required"),
        price: yup.number()
            .required("Price is required"),
        description: yup.string()
            .required("Description is required"),
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

    const getAndSetCurrentProduct = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/products/${productId}`)
            const currentProduct = response.data.data
            setValue("name", currentProduct.name);
            setValue("price", currentProduct.price);
            setValue("description", currentProduct.description);
            console.log("product >> ", product)
        } catch (e){

        } finally {
            setIsLoading(false)
        }
    }


    async function onFormSubmit(formData: any) {
        setIsLoading(true);
        try {
            const data = await api.patch(`/products/${productId}`, formData);
            toast(`Product successfully updated!`, {
                type: "success"
            });
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

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
                        <img className="rounded w-full" src="https://picsum.photos/200" alt="" />
                        <div className="absolute bottom-1 right-8">
                            <button type="button" className="border bg-white hover:text-slate-500 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                <i className="bx bx-image-add text-2xl"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-9/12">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <BasicInput label="Product Name" type="text" error={errors["product_name"]} {...register("product_name")}  />
                        <BasicInput label="Order Number" type="text" error={errors["price"]} {...register("price")} />
                        <BasicInput label="description" type="text" error={errors["description"]} {...register("description")} />
                        <Button type="submit" isLoading={isLoading} >Update Product</Button>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
</>
}

export async function getServerSideProps(context: { params: { id: number; }; }) {
    const  { id } = context.params;
    return {
        props: {
            productId: id
        }
    }
}

export default ProductPage