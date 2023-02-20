import {cn, idr} from "@/utils";
import React from "react";
import {IOrder} from "@/types/IOrder";

interface UserTableProps {
    orders: IOrder[]
}

const UserTable = ({orders}:UserTableProps) => {
    return (
        <>
            <table className="w-full table-auto">
                <thead>
                <tr>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((order, index) => (
                        <tr key={order.id} className={cn(index % 2 === 0 && 'bg-gray-100')}>
                            <td className="border px-4 py-2">{order.user.fullName}</td>
                            <td className="border px-4 py-2">{idr(order.total)}</td>
                            <td className="border px-4 py-2">{order.status}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default UserTable