import {Inter} from '@next/font/google'
import Layout from "@/components/Layout";
import Catalog from "@/components/Catalog";
import HighlightCategory from "@/components/HighlightCategory";
import Hero from "@/components/Hero/Hero";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Layout>
                <Hero />
                <HighlightCategory/>
                <Catalog size={12}/>

            </Layout>
        </>
    )
}
