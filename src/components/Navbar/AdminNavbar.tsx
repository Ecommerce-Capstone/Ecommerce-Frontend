import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
    return (
        <>
            <header className="text-gray-600 body-font bg-orange-400">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <nav className="md:mr-auto md:py-1 md:border-gray-400 flex flex-wrap items-center text-base justify-center">
                        <Link href="/admin" className="mr-5 font-medium text-gray-50 cursor-pointer hover:text-gray-500">Dashboard</Link>
                        <Link href="/admin/user" className="mr-5 font-medium text-gray-50 cursor-pointer hover:text-gray-500">User</Link>
                        <Link href="/admin/product/category" className="mr-5 font-medium text-gray-50 cursor-pointer hover:text-gray-500">Product Category</Link>
                        <Link href="/admin/product" className="mr-5 font-medium text-gray-50 cursor-pointer hover:text-gray-500">Product</Link>
                        <Link href="/admin/order" className="mr-5 font-medium text-gray-50 cursor-pointer hover:text-gray-500">Order</Link>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default AdminNavbar