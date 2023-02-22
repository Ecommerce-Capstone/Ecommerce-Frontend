import Layout from "@/components/Layout";
import 'boxicons/css/boxicons.min.css'
import Image from "next/image";
import Head from "next/head";
import React from "react";

const UnauthorizedPage = () => {
    return (
        <>
            <Head>
                <title>Unauthorized</title>
                <meta property="og:title" content="Products" key="title"/>
            </Head>
            <Layout>
                <div className="container mx-auto text-center my-14">
                    <div className="flex justify-center">
                        <Image src={"/illustration/access_denied.svg"} alt={""} height={300} width={300} className="block" />
                    </div>
                    <h1 className="text-2xl mt-8">Not enough permission to access this page</h1>
                </div>
            </Layout>
        </>
    )
}

export default UnauthorizedPage