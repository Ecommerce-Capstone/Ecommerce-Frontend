import Link from "next/link";

const Explore = () => {
    return (
        <>
            <section className="bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h2 className="text-3xl tracking-tight font-extrabold leading-tight text-white mb-12">Jelajahi Produk Kami</h2>
                        <Link href="/product"
                           className="text-gray-900 bg-gray-200 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none text-black mt-24">
                            Jelajahi
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Explore