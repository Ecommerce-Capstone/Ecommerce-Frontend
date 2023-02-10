import 'boxicons/css/boxicons.min.css'
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";

const Navbar = () => {
    const { data, status } = useSession()
    return (<>
        <header className="text-gray-600 body-font bg-orange-400">
            <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between w-full">
                <Link href={"/"} className="flex flex-none title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Logo />
                </Link>
                <div className="flex flex-shrink items-center ml-8 md:mr-auto w-96">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search product...</label>
                    <div className="relative w-full">
                        <input type="search" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-100 b border border-gray-300" placeholder="Search product..." />
                        <Button className="absolute top-0 right-0">Search</Button>
                    </div>
                </div>
                <nav className="md:ml-auto flex flex-wrap items-center text-base text-white justify-end">
                    {
                        status == "loading" && <button type="button" className="mr-5 hover:text-gray-900 cursor-pointer">
                            <i className="bx bx-loader bx-spin text-xl mr-2" />
                        </button>
                    }
                    {
                        status == "authenticated" && <button type="button" onClick={() => signOut()} className="mr-5 hover:text-gray-900 cursor-pointer">
                            <i className="bx bx-log-out text-xl mr-2" />
                            <span className="hidden md:inline-block">Logout</span>
                        </button>
                    }
                    {
                        status == "unauthenticated" && <button type="button" onClick={() => signIn()} className="mr-5 hover:text-gray-900 cursor-pointer">
                            <i className="bx bx-user-circle text-xl mr-2" />
                            <span className="hidden md:inline-block">Login</span>
                        </button>
                    }

                    <a className="mr-5 hover:text-gray-900 cursor-pointer">
                        <i className="bx bxs-cart text-xl mr-2" />
                        <span className="inline-block rounded-full w-6 h-6 text-sm bg-orange-600 text-white px-2 py-0.5 mr-2">1</span>
                        <span className="hidden md:inline-block"> Cart</span>
                    </a>
                </nav>
            </div>
        </header>
    </>)
}

export default Navbar;