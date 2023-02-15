import React from 'react';
import Head from 'next/head';
import { Fragment } from 'react';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';

interface User {
    id: number;
    fullName: string;
    gender: string;
    address: string;
}

function UserListTable({ users }: { users: User[] }) {
    return (
    <>
        <table className="w-full table-auto">
        <thead>
        <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">ID User</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Actions</th>
        </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
            <tr key={user.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.fullName}</td>
                <td className="border px-4 py-2">{user.gender}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">
                <button className="text-blue-500 hover:text-blue-700">Edit</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </>
    );
}

export default function UserList() {
    const users: User[] = [
        {
        id: 1,
        fullName: 'John Doe',
        gender: 'Male',
        address: '123 Main St',
        },
        {
        id: 2,
        fullName: 'Jane Smith',
        gender: 'Female',
        address: '456 Elm St',
        },
        {
        id: 3,
        fullName: 'Bob Johnson',
        gender: 'Male',
        address: '789 Oak St',
        },
    ];

    return (
        <>
        <Head>
            <title>User List</title>
        </Head>
        <Layout>
            <div className="container mx-auto">
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="px-5 py-12">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">User List</h2>
                    <UserListTable users={users} />
                </div>
                </div>
            </section>
            </div>
        </Layout>
        </>
    );
    }
