export interface IOrder {
    id: number,
    userId: number,
    status: string,
    user: any,
    total: number,
    paymentUrl: string
}