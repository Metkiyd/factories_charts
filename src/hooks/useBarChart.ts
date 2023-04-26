import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { IChartData, IProduct, TFilter } from '../types'
import {
  defaultFilter,
  getBarChartOption,
  getNamesMonth,
  getNumberMonths,
  getProductsByNumberMonth,
  getValueProductsByFilter,
} from '../utils'
import { getProducts } from '../service'

export function useBarChart() {
  const navigate = useNavigate()

  const [products, setProducts] = useState<IProduct[]>([])

  const [filter, setFilter] = useState<TFilter>(defaultFilter())

  useEffect(() => {
    getProducts(setProducts)
  }, [])

  useEffect(() => {
    localStorage.setItem('filter', filter)
  }, [filter])

  const getProductsByFabricId = (id: number): any[] => {
    return products.filter(({ factory_id }) => factory_id === id)
  }

  const getProductsByFilter = (
    factoryId: number,
    filter: TFilter,
  ): IChartData[] => {
    const months = getNumberMonths(products)

    const productsByFabric = getProductsByFabricId(factoryId)

    return months.reduce((prev: any[], month) => {
      const filterProductsByDate = getProductsByNumberMonth(
        productsByFabric,
        month,
      )

      const productsValue = getValueProductsByFilter(
        filterProductsByDate,
        filter,
      )

      return [
        ...prev,
        {
          factoryId,
          month,
          value: productsValue,
        },
      ]
    }, [])
  }

  const datasetOneFactory = useMemo(
    () => getProductsByFilter(1, filter),
    [filter, products],
  )

  const datasetTwoFactory = useMemo(
    () => getProductsByFilter(2, filter),
    [filter, products],
  )

  const option = useMemo(
    () =>
      getBarChartOption(
        getNamesMonth(products),
        datasetOneFactory,
        datasetTwoFactory,
      ),
    [products, datasetOneFactory, datasetTwoFactory],
  )

  const onChartClick = (params: any) => {
    const factoryId = params.data.factoryId
    const month = params.data.month

    navigate(`details/${factoryId}/${month}`)
  }

  const onEvents = {
    click: onChartClick,
  }

  return {
    filter,
    setFilter,
    onEvents,
    option,
  }
}
