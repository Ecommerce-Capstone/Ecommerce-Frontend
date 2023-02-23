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

    const colors = ["bg-lime-200", "bg-red-200", "bg-blue-200", "bg-slate-200"]

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-evenly gap-5 mb-12">
                    {
                        categories.map((category, index) => (
                            <CategoryItem key={category.id} category={category} color={colors[index]} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default HighlightCategory;