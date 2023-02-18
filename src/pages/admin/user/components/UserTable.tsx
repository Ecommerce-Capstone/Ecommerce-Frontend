import {cn} from "@/utils";
import Link from "next/link";
import Button from "@/components/Button";
import React from "react";
import {IUser} from "@/types/IUser";

interface UserTableProps {
    users: IUser[],
    confirmDeleteUserHandler: any
}

const UserTable = ({users, confirmDeleteUserHandler}:UserTableProps) => {
    return (
        <>
            <table className="w-full table-auto">
                <thead>
                <tr>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => (
                        <tr key={user.id} className={cn(index % 2 === 0 && 'bg-gray-100')}>
                            <td className="border px-4 py-2">{user.fullName}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.address}</td>
                            <td className="border px-4 py-2">
                                <Link href={`/admin/user/${user.id}`} className="mr-4">
                                    <Button
                                        className="p-2 rounded bg-blue-600 border-transparent hover:bg-blue-900"><i
                                        className="bx bx-pencil"/></Button>
                                </Link>
                                <Button className="p-2 rounded bg-red-600 border-transparent hover:bg-red-900"
                                        onClickHandler={() => confirmDeleteUserHandler(user.id)}><i
                                    className="bx bx-trash"/></Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default UserTable