import Image from "next/image";
import CategoryItem from "@/components/HighlightCategory/CategoryItem";
import {useEffect, useState} from "react";
import {api} from "@/utils";
import {IProductCategory} from "@/types/IProductCategory";

const HighlightCategory = () => {
    const [categories, setCategories] = useState<IProductCategory[]>([])

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        try {
            const response = await api.get(`/products/categories`)
            setCategories(response.data.data.slice(0,4))
        } catch (e){

        }
    }

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-evenly gap-5 mb-12">
                    {
                        categories.map(category => (
                            <CategoryItem key={category.id} category={category} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default HighlightCategory;