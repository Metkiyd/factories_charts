import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IGetDatasetPie, IProduct } from '../types'
import { getProducts } from '../service'
import {
  getDatasetProductsByKey,
  getNameByNumberMount,
  getNumberMonth,
  getPieOption,
} from '../utils'
import { EChartsOption } from 'echarts'

export const UsePieChart = () => {
  const params = useParams()

  const [allProducts, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    getProducts(setProducts)
  }, [])

  const factoryId = useMemo(() => Number(params.factoryId), [params])
  const numberMonth = useMemo(() => Number(params.month), [params])
  const monthName = useMemo(
    () => getNameByNumberMount(numberMonth, true),
    [numberMonth],
  )

  const filteredProducts = useMemo(() => {
    return allProducts.filter(
      ({ date, factory_id }) =>
        date &&
        factory_id === factoryId &&
        getNumberMonth(date) === numberMonth,
    )
  }, [factoryId, numberMonth, allProducts])

  const getOneDatasetOption = useMemo<IGetDatasetPie>(
    () => ({
      products: filteredProducts,
      key: 'product1',
      name: 'Продукт №1',
      color: '#4DAE00',
    }),
    [filteredProducts],
  )

  const getTwoDatasetOption = useMemo<IGetDatasetPie>(
    () => ({
      products: filteredProducts,
      key: 'product2',
      name: 'Продукт №2',
      color: '#FEB258',
    }),
    [filteredProducts],
  )

  const dataset = useCallback((): EChartsOption[] => {
    const oneProducts = getDatasetProductsByKey(getOneDatasetOption)
    const twoProducts = getDatasetProductsByKey(getTwoDatasetOption)

    return [oneProducts, twoProducts]
  }, [numberMonth, factoryId, allProducts])

  const option = useMemo(
    () => getPieOption(factoryId, monthName, dataset()),
    [monthName, factoryId, allProducts],
  )

  return option
}
