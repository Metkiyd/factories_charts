import { IGetDatasetPie, INotValidProduct, IProduct } from '../types'

export const validProducts = (products: INotValidProduct[]): IProduct[] => {
  return <IProduct[]>(
    products.filter(
      ({ date, product1, product2 }) => !!date && !!product1 && !!product2,
    )
  )
}

export const getDatasetProductsByKey = ({
  products,
  key,
  name,
  color,
}: IGetDatasetPie): any => {
  const label = { color }

  const value = products.reduce(
    (acc: number, curr: IProduct) => acc + (curr[key] || 0),
    0,
  )

  return {
    value,
    label,
    name,
  }
}
