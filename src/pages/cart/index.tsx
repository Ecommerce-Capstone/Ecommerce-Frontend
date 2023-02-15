import React from 'react'
import 'boxicons/css/boxicons.min.css'
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Catalog from "@/components/Catalog";
import {useState} from "react";
import { Fragment } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
const products = [
    {
        id: 1,
        name: "Product 1",
        price: 10,
        image: "https://picsum.photos/150",
    },
    {
        id: 2,
        name: "Product 2",
        price: 20,
        image: "https://picsum.photos/150",
    },
    {
        id: 3,
        name: "Product 3",
        price: 30,
        image: "https://picsum.photos/150",
    },
];

export default function cart() {
    const [quantity, setQuantity] = useState(1);

    const subtotal = products.reduce((sum, product) => {
      return sum + product.price * quantity;
    }, 0);
    const total = (subtotal * 1.07).toFixed(2);

    return (
        <>
            <Layout>
                <div className="container mx-auto">
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="px-5 py-12">
                        <div className="flex flex-col">
                        <h2 className="text-2xl font-medium pb-2 border-b border-gray-300">
        Shopping Cart
        </h2>
        {products.map((product) => (
        <div
            key={product.id}
            className="flex items-center py-2 border-b border-gray-200"
        >
            <img src={product.image} alt={product.name} className="w-20 h-20" />
            <div className="flex-1 ml-4">
            <p className="text-lg font-medium">{product.name}</p>
            <p className="text-gray-500">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
            <button
                className="p-1 border border-gray-300 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
                <MinusIcon className="w-5 h-5 text-gray-400" />
            </button>
            <p className="mx-2 font-medium">{quantity}</p>
            <button
                className="p-1 border border-gray-300 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
            >
                <PlusIcon className="w-5 h-5 text-gray-400" />
            </button>
            </div>
        </div>
        ))}
        <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-medium">Subtotal:</p>
        <p className="text-lg">${subtotal.toFixed(2)}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
        <p className="text-lg font-medium">Tax:</p>
          <p className="text-lg">${(subtotal * 0.07).toFixed(2)}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
        <p className="text-lg font-medium">Total:</p>
        <p className="text-lg">${total}</p>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Checkout
        </button>
    </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

