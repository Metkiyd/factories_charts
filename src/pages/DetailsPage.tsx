import EChartsReact from 'echarts-for-react'
import { useParams } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import { IProduct } from '../assets/types'
import { getNumberMonth } from '../assets/date'

export const DetailsPage = () => {
  const params = useParams()

  const factoryId = useMemo(() => {
    return Number(params.fabricId)
  }, [params])

  const month = useMemo(() => {
    return Number(params.fabricId)
  }, [params])

  const products = useCallback(async () => {
    const response = await fetch('http://localhost:3001/products')

    const allProducts: IProduct[] = await response.json()

    const filteredProducts = allProducts.filter(({ date, factory_id }) => {
      return date && factory_id === factoryId && getNumberMonth(date) === month
    })

    const oneProducts = getProductsByKey(
      filteredProducts,
      'product1',
      'Продукт 1',
    )
    const twoProducts = getProductsByKey(
      filteredProducts,
      'product2',
      'Продукт 2',
    )

    return [...twoProducts, ...oneProducts]
  }, [month, factoryId])

  const getProductsByKey = (
    products: IProduct[],
    key: keyof IProduct,
    name: string,
  ): any => {
    return products.reduce(
      (acc: any[], curr: any) => [...acc, { name, value: curr[key] }],
      [],
    )
  }

  const option = {
    title: {
      text: `Информация о продуктах фабрики № ${1}`,
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
        radius: '50%',
        data: products,
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

  return (
    <>
      <div className='wrapper'>
        <h1>Статистика по продукции за</h1>
      </div>
      <EChartsReact option={option} />
    </>
  )
}
