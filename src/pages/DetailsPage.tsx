import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import EChartsReact from 'echarts-for-react'
import { EChartsOption } from "echarts";

import { getNameByNumberMount, getNumberMonth, getPieOption, getDatasetProductsByKey, validProducts } from '../assets/utils'

import { INotValidProduct, IProduct } from '../assets/types'

export const DetailsPage = () => {
  const params = useParams()

  const [allProducts, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((res: INotValidProduct[]) => {
        const products = validProducts(res)
        setProducts(products)
      })
  }, [])

  const factoryId = useMemo(() => Number(params.factoryId), [params])
  const numberMonth = useMemo(() => Number(params.month), [params])
  const monthName = useMemo(() => getNameByNumberMount(numberMonth, true), [numberMonth])

  const dataset = useCallback((): EChartsOption[] => {
    const filteredProducts = allProducts.filter(
      ({ date, factory_id }) =>
        date && factory_id === factoryId && getNumberMonth(date) === numberMonth,
    )

    const oneProducts = getDatasetProductsByKey(
      filteredProducts,
      'product1',
      'Продукт №1',
    )
    const twoProducts = getDatasetProductsByKey(
      filteredProducts,
      'product2',
      'Продукт №2',
    )

    return [twoProducts, oneProducts]
  }, [numberMonth, factoryId, allProducts])

  const option = useMemo(() => getPieOption(factoryId, monthName, dataset()), [monthName, factoryId, allProducts])

  return <EChartsReact option={option} />
}
