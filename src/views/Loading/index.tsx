import Layout from "@/components/Layout";
import Head from "next/head";

const Loading = () => {
    return (
        <>
            <Layout>
                <div className="container mx-auto">
                    <div className="text-center mt-28">
                        <i className="bx bx-loader bx-spin text-7xl" />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Loading