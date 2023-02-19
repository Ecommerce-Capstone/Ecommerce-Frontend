import Image from "next/image";
import Link from "next/link";
import IProduct from "@/types/IProduct";

interface ProductItemProps {
    product: IProduct
}

const ProductItem = ({product}: ProductItemProps) => {
    return (
        <>
            <Link href={`/product/${product.id}`}>
                <div className="flex flex-col group overflow-hidden border rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full"
                    title="Lorem ipsum dolor sit amet 500g">
                    <div className="max-h-48 w-full">
                        <Image src={product.images} alt={product.name} width={192} height={192} className="w-full h-48 max-h-48 transform transition duration-500 hover:scale-125" />
                    </div>
                    <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full z-50 bg-white">
                        <div className="mb-1 lg:mb-1.5 -mx-1">
                            <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">{product.price}</span>
                        </div>
                        <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">{product.name}</h2>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductItem;