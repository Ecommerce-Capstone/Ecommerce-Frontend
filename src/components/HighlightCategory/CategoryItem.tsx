import Image from "next/image";
import Link from "next/link";
import {IProductCategory} from "@/types/IProductCategory";
import {cn} from "@/utils";

interface CategoryItemProps {
    category: IProductCategory,
    color: string
}

const CategoryItem = ({category, color}: CategoryItemProps) => {
    return (
        <>
            <Link className="w-full group flex" href={`/product?categoryId=${category.id}`}>
                <div className={cn("relative flex items-center w-full overflow-hidden", color)}>
                    <div className="flex shrink-0 w-36 lg:w-32 xl:w-40 2xl:w-36 3xl:w-[180px] ltr:pr-1.5 rtl:pl-1.5 2xl:ltr:pr-2.5 2xl:rtl:pl-2.5">
                        <Image src={category.image} alt={""} width={100} height={100} className="ml-2 transform transition duration-500 scale-75 hover:scale-100" />
                    </div>
                    <div className="py-3 lg:py-5 ltr:pr-4 rtl:pl-4 lg:ltr:pr-3 lg:rtl:pl-3 xl:ltr:pr-4 xl:rtl:pl-4">
                        <h2 className="text-brand-dark text-base xl:text-lg xl:leading-7 font-semibold font-manrope mb-[5px]">
                            {category.name}
                        </h2>
                        <p className="text-sm leading-6 lg:text-13px xl:text-sm">{category.description}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CategoryItem;