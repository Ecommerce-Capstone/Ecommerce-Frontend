import Layout from "@/components/Layout";
import Button from "@/components/Button";
import BasicInput from "@/components/Input/BasicInput";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useState} from "react";
import {useRouter} from "next/router";
import {api} from "@/utils";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from "@/components/Alert";
import Head from 'next/head';

const SigninPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter();
    const registrationFormSchema = yup.object().shape({
        username: yup.string()
            .required("Username is required"),
        email: yup.string()
            .required("Email is required"),
        password: yup.string()
            .required("Password is required")
            .min(4, "Password length should be at least 4 characters")
            .max(12, "Password cannot exceed more than 12 characters"),
        password_confirmation: yup.string()
            .required("Confirm Password is required")
            .min(4, "Password length should be at least 4 characters")
            .max(12, "Password cannot exceed more than 12 characters")
            .oneOf([yup.ref("password")], "Passwords do not match")
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(registrationFormSchema)
    });


    async function onFormSubmit(formData: any) {
        setIsLoading(true);
        try {
            const data = await api.post("/users", formData);
            toast(`Welcome Aboard ${data.data.email}! Please login with your credentials`, {
                type: "success"
            });
            setTimeout(() => {
                router.push("/auth/signin")
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
                <title>Signup</title>
                <meta property="og:title" content="Signup" key="title"/>
            </Head>
            <Layout>

                <div className="container w-full px-5 py-24 mx-auto flex justify-center">
                    <div
                        className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-xl">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font text-center">Register to our
                            app</h2>
                        {
                            error && <Alert>{error}</Alert>
                        }
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <BasicInput label="Username" type="text"
                                        error={errors["username"]} {...register("username")} />
                            <BasicInput label="Email" type="email" error={errors["email"]} {...register("email")} />
                            <BasicInput label="Password" type="password"
                                        error={errors["password"]} {...register("password")} />
                            <BasicInput label="Repeat Password" type="password"
                                        error={errors["password_confirmation"]} {...register("password_confirmation")} />
                            <Button isLoading={isLoading}>Signup</Button>
                        </form>
                        <p className="text-xs text-gray-500 mt-3">Have an account? <Link href="/auth/signin"
                                                                                         className="font-bold">Signin</Link>
                        </p>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default SigninPage;