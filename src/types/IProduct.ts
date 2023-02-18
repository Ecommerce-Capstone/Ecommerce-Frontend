interface IProduct {
    id: string;
    name: string;
    description: string;
    images: string;
    price: number;  
    stock: number;
    categoryId: number;
}

export default IProduct;