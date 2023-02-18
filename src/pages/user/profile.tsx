import Head from "next/head";
import Layout from "@/components/Layout";
import BasicInput from "@/components/Input/BasicInput";
import Button from "@/components/Button";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import BasicTextArea from "@/components/Input/BasicTextArea";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {api} from '@/utils'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/views/Loading";
import Unauthenticated from "@/views/Unauthenticated";

const ProfilePage = () => {
    const {data:session, status} = useSession()
    const [error, setError] = useState("")
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (status == "authenticated"){
            getAndSetCurrentUser()
        }
    }, [status])

    const updateProfileFormSchema = yup.object().shape({
        fullName: yup.string()
            .required("Full Name is required"),
        username: yup.string()
            .required("Username is required"),
        email: yup.string()
            .required("Email is required"),
        address: yup.string()
            .required("Address is required"),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(updateProfileFormSchema)
    });

    const getAndSetCurrentUser = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/users/${session?.user.id}`)
            const currentUser = response.data.data
            setValue("fullName", currentUser.fullName);
            setValue("username", currentUser.username);
            setValue("email", currentUser.email);
            setValue("address", currentUser.address);
            console.log("user >> ", user)
        } catch (e){

        } finally {
            setIsLoading(false)
        }
    }


    async function onFormSubmit(formData: any) {
        setIsLoading(true);
        try {
            const data = await api.patch(`/users/${session?.user.id}`, formData);
            toast(`Profile Successfully Updaed!`, {
                type: "success"
            });
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (status === "loading"){
        return (<Loading />)
    }
    if (status === "unauthenticated"){
        return (<Unauthenticated />)
    }

    return (
        <>
            <Head>
                <title>Profile</title>
                <meta property="og:title" content="Profile" key="title"/>
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
                                <BasicInput label="Name" type="text" error={errors["fullName"]} {...register("fullName")}  />
                                <BasicInput label="Username" type="text" error={errors["username"]} {...register("username")} />
                                <BasicInput label="Email" type="text" error={errors["email"]} {...register("email")} />
                                <BasicTextArea label="Address" error={errors["address"]} {...register("address")}  />
                                <Button type="submit" isLoading={isLoading} >Update Profile</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ProfilePage