import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {api} from "@/utils";
import {useSession} from "next-auth/react";
import {setInitialCart} from "@/store/cart";

const Cart = () => {
    const {data:session, status} = useSession()
    const {count, isLoaded} = useSelector((state: any) => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === "authenticated"){
            getCarts()
        }
    }, [status, isLoaded])

    const getCarts = async () => {
        try {
            const response = await api.get(`/orders/carts`, {
                params: {
                    userId: session?.user.id
                }
            })
            dispatch(setInitialCart(response.data.data.length))
        } catch (e){

        }
    }

    return (
        <>
            <Link href="/cart" className="mr-5 hover:text-gray-900 cursor-pointer">
                <i className="bx bxs-cart text-xl mr-2" />
                {
                    isLoaded && <span className="inline-block rounded-full w-6 h-6 text-sm bg-orange-600 text-white px-2 py-0.5 mr-2">{count}</span>
                }
                <span className="hidden md:inline-block"> Cart</span>
            </Link>
        </>
    )
}

export default Cart