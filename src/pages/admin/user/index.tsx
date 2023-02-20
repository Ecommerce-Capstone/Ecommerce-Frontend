import Head from "next/head";
import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {api, cn} from "@/utils";
import Pagination from "@/components/Pagination";
import {IUser} from "@/types/IUser";
import {IPage} from "@/types/IPage";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserTable from "@/components/Table/UserTable";
import Spinner from "@/components/Spinner";
import ConfirmDeleteUser from "@/components/Modal/ConfirmDeleteUser";
import Alert from "@/components/Alert";

const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [page, setPage] = useState<IPage>({
        last: false,
        numberElement: 0,
        page: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0
    })
    const [currentPage, setCurrentPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [pendingDeletedUserId, setPendingDeletedUserId] = useState(0)

    useEffect(() => {
        getUsers()
    }, [currentPage])

    const getUsers = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/users`, {
                params: {
                    page: currentPage
                }
            })
            setUsers(response.data.data)
            setPage(response.data.page)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const onChangePageHandler = (destinationPage: number) => {
        setCurrentPage(destinationPage)
    }

    const confirmDeleteUser = (userId: number) => {
        setPendingDeletedUserId(userId)
    }

    const deleteUser = async () => {
        try {
            setIsLoading(true)
            const response = await api.delete(`/users/${pendingDeletedUserId}`)
            getUsers()
            toast(`User successfully deleted`, {
                type: "success"
            });
            setPendingDeletedUserId(0)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>User</title>
                <meta property="og:title" content="Login" key="title"/>
            </Head>
            <Layout>
                <div className="container w-full px-5 mx-auto flex justify-center">
                    <section className="w-full text-gray-600 body-font overflow-hidden">
                        <div className="px-5 py-12">
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">User</h2>
                                {
                                    error && <Alert variant="danger">{error}</Alert>
                                }
                                {
                                    isLoading ? <Spinner /> : <UserTable users={users} confirmDeleteUserHandler={confirmDeleteUser} />
                                }
                                <div className="flex justify-end mt-8">
                                    <Pagination page={page} onChangePageHandler={onChangePageHandler}/>
                                </div>
                                {
                                    pendingDeletedUserId > 0 && <ConfirmDeleteUser deleteUserHandler={deleteUser} confirmDeleteUserHandler={confirmDeleteUser} />
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

export default UsersPage