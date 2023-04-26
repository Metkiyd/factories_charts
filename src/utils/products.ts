import {IProduct, TFilter} from "../types";
import {getNumberMonth} from "./date.ts";


export const getValueProductsByFilter = (
    products: IProduct[],
    filter: TFilter,
): number => {
    return products.reduce(
        (acc, product) => acc + getValueProductByKey(product, filter),
        0,
    )
}

export const getProductsByNumberMonth = (products: IProduct[], month: number) => {
    return products.filter(({ date }) => date && getNumberMonth(date) === month)
}

export  const getValueProductByKey = (product: IProduct, key: TFilter): number => {
    switch (key) {
        case 'product1':
            return product[key]!
        case 'product2':
            return product[key]!
        default:
            return (
                (product['product1'] || 0) +
                (product['product2'] || 0) +
                (product['product3'] || 0)
            )
    }
}