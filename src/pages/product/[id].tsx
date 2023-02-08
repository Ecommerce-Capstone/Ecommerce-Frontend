import 'boxicons/css/boxicons.min.css'
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Catalog from "@/components/Catalog";
import {useState} from "react";

const ProductDetailPage = () => {

    const [count, setCount] = useState(1);
    return (
        <>
            <Layout>
                <div className="container mx-auto">
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="px-5 py-12">
                            <div className="flex flex-wrap">
                                <img alt="ecommerce"
                                     className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                     src="https://picsum.photos/400"/>
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <div className="pb-5">
                                        <div className="mb-2 md:mb-2.5 block -mt-1.5" role="button">
                                            <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl hover:text-brand">
                                                Lorem ipsum dolor sit amet 400gr
                                            </h2>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                                                Rp 540.000
                                            </div>
                                        </div>
                                    </div>

                                    <p className="leading-relaxed">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                                    </p>
                                    <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
                                        <div className="flex items-center justify-between rounded overflow-hidden shrink-0 h-11 md:h-14 bg-[#f3f5f9]">
                                            <button className="flex items-center justify-center shrink-0 h-full transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none w-10 h-10 rounded-full transform scale-80 lg:scale-100 text-brand-dark hover:bg-fill-four ltr:ml-auto rtl:mr-auto" onClick={() => setCount(count - 1)}>
                                                <i className="bx bx-minus" />
                                            </button>
                                            <span className="font-semibold text-brand-dark flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default shrink-0 text-base md:text-[17px] w-12 md:w-20 xl:w-28">
                                                {count}
                                            </span>
                                            <button className="group flex items-center justify-center h-full shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none w-10 h-10 rounded-full scale-80 lg:scale-100 text-heading hover:bg-fill-four ltr:mr-auto rtl:ml-auto" onClick={() => setCount(count + 1)}>
                                                <i className="bx bx-plus" />
                                            </button>
                                        </div>
                                        <div className="w-full">
                                            <Button className="w-full">
                                                <i className="bx bx-cart-add mr-4 font-bold" />
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-wrap items-center justify-between mb-5 md:mb-6">
                        <div className="-mt-1.5 mb-0"><h2
                            className="text-brand-dark text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-manrope">Related
                            products</h2></div>
                    </div>

                    <Catalog />
                </div>
            </Layout>
        </>
    )
}

export default ProductDetailPage;