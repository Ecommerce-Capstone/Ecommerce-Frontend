import 'boxicons/css/boxicons.min.css'
import {cn} from '@/utils'
import {useState} from "react";
import Link from "next/link";
import {signOut} from "next-auth/react";

const UserDropdown = (props: any) => {
    const [isHidden, setIsHidden] = useState(true)
    return (
        <>
            <div className="relative inline-block text-left">
                <div>
                    <button type="button" className="mr-5 hover:text-gray-900 cursor-pointer" onClick={() => setIsHidden(!isHidden)}>
                        { props.name }
                        <i className="bx bx-chevron-down"/>
                    </button>
                </div>

                <div className={cn("absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", isHidden && "hidden")} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div className="py-1" role="none">
                        <Link href={"/user/profile"} className="text-gray-700 block px-4 py-2 text-sm">Profile</Link>
                        <Link href={"/order"} className="text-gray-700 block px-4 py-2 text-sm">Order</Link>
                        {
                            props.role === "admin" && <Link href={"/admin"} className="text-gray-700 block px-4 py-2 text-sm">Admin</Link>
                        }
                        <button type="button" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" onClick={() => signOut()}>Sign out</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserDropdown