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
import {useRouter} from "next/router";
import Alert from "@/components/Alert";
import {IUser} from "@/types/IUser";
import Image from "next/image";

const ProfilePage = () => {
    const router = useRouter();
    const {data:session, status} = useSession()
    const [error, setError] = useState("")
    const [user, setUser] = useState<IUser>({address: "", email: "", fullName: "", id: 0, photo: "/illustration/images.svg", username: ""})
    const [isLoading, setIsLoading] = useState(true)
    const [isImageLoading, setIsImageLoading] = useState(false)
    const inputFileRef = useRef<HTMLInputElement>(null)

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
            setUser(currentUser)
        } catch (e: any){
            setError(e.message)
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
            setValue("photo", response.data.data.url);
            setUser({...user, photo: response.data.data.url})
        } catch (e){

        } finally {
            setIsImageLoading(false)
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
                                {
                                    <Image className="rounded w-full" src={user.photo} alt={user.fullName} width={400} height={400} />
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