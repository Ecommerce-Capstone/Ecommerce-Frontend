import 'boxicons/css/boxicons.min.css'
import Logo from "@/components/Logo";
import Button from "@/components/Button";

const Navbar = () => {
    return (<>
        <header className="text-gray-600 body-font bg-orange-400">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between w-full">
                <a className="flex flex-none title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Logo />
                </a>
                <div className="flex flex-shrink md:ml-auto md:mr-auto w-96">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search product...</label>
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-100 b border border-gray-300" placeholder="Search product..." required />
                        <Button />
                    </div>
                </div>
                <nav className="md:ml-auto flex flex-wrap items-center text-base text-white justify-end">
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">
                        <i className="bx bx-user-circle text-xl mr-2" />
                        <span>Sign In</span>
                    </a>
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">
                        <i className="bx bxs-cart text-xl mr-2" />
                        Cart
                    </a>
                </nav>
            </div>
        </header>
    </>)
}

export default Navbar;