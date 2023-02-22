import {cn} from "@/utils";
import Link from "next/link";
import Button from "@/components/Button";
import React from "react";
import IProduct from "@/types/IProduct";
import Image from "next/image";
import {IProductCategory} from "@/types/IProductCategory";

interface ProductCategoryTableProps {
    productCategories: IProductCategory[],
    confirmDeleteProductCategoryHandler: any
}

const ProductCategoryTable = ({productCategories, confirmDeleteProductCategoryHandler}:ProductCategoryTableProps) => {
    return (
        <>
            <table className="w-full table-auto">
                <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    productCategories.map((productCategory, index) => (
                        <tr key={productCategory.id} className={cn(index % 2 === 0 && 'bg-gray-100')}>
                            <td className="border px-4 py-2">
                                {
                                    <Image src={productCategory.image} alt={productCategory.name} height={100} width={100} />
                                }
                            </td>
                            <td className="border px-4 py-2">{productCategory.name}</td>
                            <td className="border px-4 py-2">{productCategory.description}</td>
                            <td className="border px-4 py-2">
                                <Link href={`/admin/product/category/${productCategory.id}`} className="mr-4">
                                    <Button
                                        className="p-2 rounded bg-blue-600 border-transparent hover:bg-blue-900"><i
                                        className="bx bx-pencil"/></Button>
                                </Link>
                                <Button className="p-2 rounded bg-red-600 border-transparent hover:bg-red-900"
                                        onClickHandler={() => confirmDeleteProductCategoryHandler(productCategory.id)}><i
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

export default ProductCategoryTable
