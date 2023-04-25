export type TFilter = 'all' | 'product1' | 'product2'

export interface IProduct {
    id: number;
    factory_id: number;
    date: string | null,
    product1: number | null,
    product2: number | null,
    product3: number
}