import { useState } from 'react';
import React from 'react';
import Head from 'next/head';
import { Fragment } from 'react';
import Layout from '@/components/Layout';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';

export default function EditUserForm() {

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
                    <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">User Edit</h2>
                </div>
                <div className="flex flex-col pt-4">
                    <form className="max-w-md mx-auto">
                        <div className="mb-6">
                            <label className="block font-bold mb-2" htmlFor="full-name">
                            Full Name
                            </label>
                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="full-name"
                            type="text"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold smb-2" htmlFor="gender">
                            Gender
                            </label>
                            <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="gender"
                            >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="address">
                            Address
                            </label>
                            <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            rows="4"
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            >
                            Save
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </section>
            </div>
        </Layout>
        </>
    );
    }
