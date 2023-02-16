    import axios from 'axios';
    import { useState, useEffect } from 'react';
    import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline';

    const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the products from the API
        axios.get('http://localhost:8081/products')
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.error('Error fetching products: ', error);
        });
    }, []);

    const handleDelete = (productId) => {
        // Delete the product from the API
        axios.delete(`http://localhost:8081/products/${productId}`)
        .then(response => {
            setProducts(products.filter(product => product.id !== productId));
        })
        .catch(error => {
            console.error('Error deleting product: ', error);
        });
    };

    return (
        <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
            <div key={product.id} className="bg-white shadow-md p-4">
            <img src={product.images[0]} alt={product.name} className="w-full" />
            <div className="p-4">
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <div className="flex justify-end mt-4">
                <button
                    className="mr-2 p-2 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    onClick={() => handleDelete(product.id)}
                >
                    <TrashIcon className="h-6 w-6" />
                </button>
                <button
                    className="p-2 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                    <PencilAltIcon className="h-6 w-6" />
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>
    );
    };

    export default ProductList;
