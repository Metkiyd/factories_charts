import {INotValidProduct, IProduct} from "../types";

export const validProducts = (products: INotValidProduct[]): IProduct[] => {
    return <IProduct[]>products.filter(({ date, product1, product2 }) => !!date && !!product1 && !!product2 )
}

export const getDatasetProductsByKey = (products: IProduct[], key: 'product1' | 'product2', name: string): any => {
    const value =  products.reduce((acc: number, curr: IProduct) => acc + (curr[key] || 0), 0)

    return {
        name,
        value
    }
}