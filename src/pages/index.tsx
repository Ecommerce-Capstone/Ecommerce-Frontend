import {Inter} from '@next/font/google'
import Layout from "@/components/Layout";
import Catalog from "@/components/Catalog";
import HighlightCategory from "@/components/HighlightCategory";
import Hero from "@/components/Hero/Hero";
import Head from "next/head";
import React from "react";
import Explore from "@/components/CTA/Explore";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta property="og:title" content="Products" key="title"/>
            </Head>
            <Layout>
                <Hero />
                <HighlightCategory/>
                <Catalog size={12}/>
                <Explore />
            </Layout>
        </>
    )
}
