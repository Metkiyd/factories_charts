import axios from 'axios'

import { validProducts } from '../utils'

export async function getProducts(callback: any) {
  try {
    const { data } = await axios.get('http://localhost:3001/products')
    const products = validProducts(data)
    return callback(products)
  } catch (e) {
    console.log(`=>getProductsError`, e)
  }
}
