    import Head from "next/head";
    import Layout from "@/components/Layout";
    import BasicInput from "@/components/HighlightCategory/Input/BasicInput";
    import Button from "@/components/Button";
    import * as yup from "yup";
    import {useForm} from "react-hook-form";
    import {yupResolver} from '@hookform/resolvers/yup';
    import {api} from '@/utils'
    import {toast} from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    const AddProductPage = () => {
    const addProductFormSchema = yup.object().shape({
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
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(addProductFormSchema)
    });

    async function onFormSubmit(formData: any) {
        try {
        const data = await api.post(`/products`, formData);
        toast(`Product successfully added!`, {
            type: "success"
        });
        } catch (e: any) {
        toast(`Error: ${e.message}`, {
            type: "error"
        });
        }
    }

    return (
        <>
        <Head>
            <title>Add Product</title>
            <meta property="og:title" content="Add Product" key="title"/>
        </Head>
        <Layout>
            <div className="container w-full px-5 py-24 mx-auto flex justify-center">
            <div className="w-full flex">
                <div className="w-9/12">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                <BasicInput label="Product Name" type="text" error={errors["product_name"]} {...register("product_name")}  />
                        <BasicInput label="Order Number" type="text" error={errors["price"]} {...register("price")} />
                        <BasicInput label="Stock" type="text" error={errors["stock"]} {...register("stock")} />
                        <BasicInput label="description" type="text" error={errors["description"]} {...register("description")} />
                        <BasicInput label="Images Url" type="text" error={errors["images"]} {...register("images")} />
                    <Button type="submit">Add Product</Button>
                </form>
                </div>
            </div>
            </div>
        </Layout>
        </>
    )
    }

    export default AddProductPage;
