import Head from "next/head";
import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import 'boxicons/css/boxicons.min.css'
import BasicWidget from "@/components/Card/BasicWidget";
import {api} from "@/utils";


const AdminPage = () => {
    const [userCount, setUserCount] = useState(0)
    const [categoryCount, setCategoryCount] = useState(0)
    const [productCount, setProductCount] = useState(0)
    const [orderCount, setOrderCount] = useState(0)
    const loader = [{
        uri: `/users`,
        setter: setUserCount
    }, {
        uri: `/products/categories`,
        setter: setCategoryCount
    },{
        uri: `/products`,
        setter: setProductCount
    },{
        uri: `/orders`,
        setter: setOrderCount
    }]

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        try {
            for (const l of loader){
                const response = await api.get(l.uri)
                const count = response.data.page ? response.data.page.totalElements : response.data.data.length
                l.setter(count)
            }
        } catch (e){

        }
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta property="og:title" content="Products" key="title"/>
            </Head>
            <Layout>
                <AdminNavbar />
                <div className="container w-full mx-auto flex justify-center">
                    <div className="w-full">
                        <div className="relative pt-8 pb-32 bg-blueGray-500">
                            <div className="flex flex-wrap">
                                <BasicWidget  color="bg-red-500" title="User" icon="bx-user" value={userCount}/>
                                <BasicWidget  color="bg-teal-500" title="Category" icon="bx-user" value={categoryCount}/>
                                <BasicWidget  color="bg-green-500" title="Product" icon="bx-box" value={productCount}/>
                                <BasicWidget  color="bg-blue-500" title="Order" icon="bx-transfer" value={orderCount}/>
                            </div>
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default AdminPage