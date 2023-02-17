import Layout from "@/components/Layout";
import Button from "@/components/Button";
import BasicInput from "@/components/HighlightCategory/Input/BasicInput";
import Link from "next/link";
import {getCsrfToken} from "next-auth/react"
import {GetServerSidePropsContext} from "next";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Alert from "@/components/Alert";
import Head from "next/head";
import { useRouter } from 'next/router'

const SigninPage = (props: any) => {
    const router = useRouter()
    const { error } = router.query
    const registrationFormSchema = yup.object().shape({
        username: yup.string()
            .required("Username is required"),
        password: yup.string()
            .required("Password is required")
            .min(4, "Password length should be at least 4 characters")
            .max(12, "Password cannot exceed more than 12 characters")
    });

    const {
        register,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(registrationFormSchema)
    });

    return (
        <>
            <Head>
                <title>Login</title>
                <meta property="og:title" content="Login" key="title"/>
            </Head>
            <Layout>
                <div className="container w-full px-5 py-24 mx-auto flex justify-center">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-xl">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font text-center">Login to our app</h2>
                        {
                            error  && <Alert variant="error">{ error }</Alert>
                        }
                        <form action="/api/auth/callback/credentials" method="POST">
                            <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
                            <BasicInput label="Username" type="text" error={errors["username"]} {...register("username")} />
                            <BasicInput label="Password" type="password" error={errors["password"]} {...register("password")} />
                            <Button type="submit" >Login</Button>
                        </form>
                        <p className="text-xs text-gray-500 mt-3">Dont have an account? <Link href="/auth/signup" className="font-bold" >Signup</Link></p>
                    </div>
                </div>
            </Layout>


        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}

export default SigninPage;