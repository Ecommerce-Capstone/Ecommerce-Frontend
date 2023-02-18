import {cn} from "@/utils";
import Link from "next/link";
import Button from "@/components/Button";
import React from "react";
import IProduct from "@/types/IProduct";
import Image from "next/image";

interface ProductTableProps {
    products: IProduct[],
    confirmDeleteProductHandler: any
}

const ProductTable = ({products, confirmDeleteProductHandler}:ProductTableProps) => {
    return (
        <>
            <table className="w-full table-auto">
                <thead>
                <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map((product, index) => (
                        <tr key={product.id} className={cn(index % 2 === 0 && 'bg-gray-100')}>
                            <td className="border px-4 py-2">
                                <Image src={product.images} alt={product.name} height={100} width={100} />
                            </td>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">{product.price}</td>
                            <td className="border px-4 py-2">{product.stock}</td>
                            <td className="border px-4 py-2">{product.description}</td>
                            <td className="border px-4 py-2">
                                <Link href={`/admin/product/${product.id}`} className="mr-4">
                                    <Button
                                        className="p-2 rounded bg-blue-600 border-transparent hover:bg-blue-900"><i
                                        className="bx bx-pencil"/></Button>
                                </Link>
                                <Button className="p-2 rounded bg-red-600 border-transparent hover:bg-red-900"
                                        onClickHandler={() => confirmDeleteProductHandler(product.id)}><i
                                    className="bx bx-trash"/></Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default ProductTable
