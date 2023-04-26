import EChartsReact from 'echarts-for-react'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { INotValidProduct, IProduct } from '../assets/types'
import { getNumberMonth } from '../assets/utils/date.ts'
import {
  getDatasetProductsByKey,
  validProducts,
} from '../assets/utils/details.ts'

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

  const factoryId = useMemo(() => Number(params.fabricId), [params])
  const month = useMemo(() => Number(params.month), [params])

  const dataset = useCallback(() => {
    const filteredProducts = allProducts.filter(
      ({ date, factory_id }) =>
        date && factory_id === factoryId && getNumberMonth(date) === month,
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
  }, [month, factoryId, allProducts])

  const option = {
    title: {
      text: `Статистика по продукции Фабрики ${factoryId} за ${month}`,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '60%',
        data: dataset(),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  return <EChartsReact option={option} />
}
