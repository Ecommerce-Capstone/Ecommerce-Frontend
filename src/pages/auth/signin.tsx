import Layout from "@/components/Layout";
import Button from "@/components/Button";
import BasicInput from "@/components/Input/BasicInput";
import Link from "next/link";
import {getCsrfToken, signOut} from "next-auth/react"
import {GetServerSidePropsContext} from "next";

const SigninPage = (props: any) => {

    return (
        <>
            <Layout>
                <div className="container w-full px-5 py-24 mx-auto flex justify-center">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-xl">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font text-center">Signin to our app</h2>
                        {
                            props.error  &&
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                { props.error }
                            </div>
                        }
                        <form action="/api/auth/callback/credentials" method="POST">
                            <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
                            <BasicInput label="Username" type="text" name="username" />
                            <BasicInput label="Password" type="password" name="password" />
                            <Button type="submit" >Signin</Button>
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