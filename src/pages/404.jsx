import React from 'react'
import 'boxicons/css/boxicons.min.css'
import Layout from "@/components/Layout";
import { Fragment } from "react";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from 'next/link';

export default function Custom404() {
return (
    <>
    <Layout>
        <div className="container mx-auto text-center">
        <section className="text-gray-600 body-font">
            <div className="px-5 py-12">
            <div className="lg:w-2/3 mx-auto">
                <Image src={"/notfound.png"} width={300} height={250} alt="Error" className="mb-8 mx-auto" style={{maxWidth: "400px"}} />
                <h2 className="text-2xl font-bold mb-4">Oops! Page not found</h2>
                <p className="leading-relaxed mb-8">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <a href="http://localhost:3000/" className="text-blue-500 inline-flex items-center font-medium">
                <ArrowCircleLeftIcon className="h-5 w-5 mr-2" />
                Go back to homepage
                </a>
            </div>
            </div>
        </section>
        </div>
    </Layout>
    </>
);
}
