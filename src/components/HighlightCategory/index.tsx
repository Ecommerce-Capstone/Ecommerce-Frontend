import Image from "next/image";
import CategoryItem from "@/components/HighlightCategory/CategoryItem";

const HighlightCategory = () => {
    return (
        <>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                    <CategoryItem/>
                    <CategoryItem/>
                    <CategoryItem/>
                    <CategoryItem/>
                </div>
            </div>
        </>
    )
}

export default HighlightCategory;