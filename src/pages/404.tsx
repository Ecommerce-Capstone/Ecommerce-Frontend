import React from 'react'
import 'boxicons/css/boxicons.min.css'
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from 'next/link';
import 'boxicons/css/boxicons.min.css'
import Head from "next/head";

export default function Custom404() {
    return (
        <>
            <Head>
                <title>Not Found</title>
                <meta property="og:title" content="Products" key="title"/>
            </Head>
            <Layout>
                <div className="container mx-auto text-center">
                    <section className="text-gray-600 body-font">
                        <div className="px-5 py-12">
                            <div className="lg:w-2/3 mx-auto">
                                <Image src={"/illustration/page_not_found.svg"} width={300} height={250} alt="Error"
                                       className="mb-8 mx-auto" style={{maxWidth: "400px"}}/>
                                <h2 className="text-2xl font-bold mb-4">Oops! Page not found</h2>
                                <p className="leading-relaxed mb-8">The page you are looking for might have been
                                    removed, had its name changed or is temporarily unavailable.</p>
                                <Link href="/" className="text-blue-500 inline-flex items-center font-medium">
                                    <i className="bx bxs-left-arrow-circle mr-3"/>
                                    Go back to homepage
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}
