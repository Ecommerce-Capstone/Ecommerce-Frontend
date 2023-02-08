import Image from "next/image";

const ProductItem = () => {
    return (
        <>
            <div
                className="flex flex-col group overflow-hidden border rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full"
                title="Lorem ipsum dolor sit amet 500g">
                <div className="max-h-48 w-full">
                    <img src="https://picsum.photos/200" alt="Product" className="w-full max-h-48 transform transition duration-500 hover:scale-125" />
                </div>
                <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full z-50 bg-white">
                    <div className="mb-1 lg:mb-1.5 -mx-1">
                        <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">Rp 540.000</span>
                    </div>
                    <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">Lorem ipsum dolor sit amet 500g</h2>
                </div>
            </div>
        </>
    )
}

export default ProductItem;