import {TFilter} from "../types";

export const defaultFilter = (): TFilter => {
    const candidate = localStorage.getItem('filter')

    switch (candidate) {
        case 'product1':
            return candidate
        case 'product2':
            return candidate
        default:
            return 'all'
    }
}