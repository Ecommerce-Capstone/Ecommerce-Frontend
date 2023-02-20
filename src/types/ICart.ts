import IProduct from "@/types/IProduct";

export interface ICart {
    id: number,
    productId: number,
    product: IProduct,
    quantity: number
}