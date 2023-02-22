import 'boxicons/css/boxicons.min.css'
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setKeyword} from "@/store/search";

const Hero = () => {
    const router = useRouter()
    const keyword = useSelector((state: any) => state.search.keyword)
    const [search, setSearch] = useState(keyword)
    const dispatch = useDispatch()

    const searchKeywordChangeHandler = (event: any) => {
        event.preventDefault()
        dispatch(setKeyword(search))
        if (!router.pathname.includes("/product")){
            return router.push("/product")
        }
    }
    return (
        <>
            <div
                className="w-full bg-no-repeat bg-cover bg-center flex items-center py-20 py:pt-24 mb-12 2xl:bg-center"
                style={{
                    backgroundImage: 'url("/bg.jpg")'
                }}>
                <div
                    className="mx-auto h-full flex flex-col text-center px-6 xl:max-w-[750px] 2xl:max-w-[850px] max-w-[480px] md:max-w-[550px]">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-manrope font-extrabold leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4 text-brand-tree-dark xl:text-5xl 2xl:text-[55px]">
                            Sahabat Maju Jawa Timur
                        </h2>
                        <p className="text-base md:text-[17px] xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em] xl:px-16 text-brand-dark text-opacity-80 2xl:px-32">
                            Mengakselerasi pertumbuhan ekonomi melalui komitmen terhadap pemberdayaan Usaha Kecil Menengah (UKM) Indonesia
                        </p>
                        <div className="hidden lg:block max-w-[700px] mx-auto md:pt-1 lg:pt-3">
                            <div className="lg:flex">
                                <form onSubmit={searchKeywordChangeHandler} className="w-full">
                                    <div className="relative">
                                        <input type="text" className="rounded bg-gray-100 p-4 text-base pl-12 w-full"
                                                placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
                                            <div className="absolute top-5 left-4 text-gray-400 pr-4">
                                                <i className="bx bx-search text-xl" />
                                            </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Hero;