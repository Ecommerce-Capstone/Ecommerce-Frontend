import Layout from "@/components/Layout";
import Button from "@/components/Button";
import BasicInput from "@/components/Layout/BasicInput";
import Link from "next/link";

const SigninPage = () => {
    return (
        <>
            <Layout>
                <div className="container w-full px-5 py-24 mx-auto flex justify-center">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-xl">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font text-center">Signin to our app</h2>
                        <BasicInput label="Username" type="text" />
                        <BasicInput label="Password" type="password" />
                        <Button >Signin</Button>
                        <p className="text-xs text-gray-500 mt-3">Dont have an account? <Link href="/auth/signup" className="font-bold" >Signup</Link></p>
                    </div>
                </div>
            </Layout>


        </>
    )
}

export default SigninPage;