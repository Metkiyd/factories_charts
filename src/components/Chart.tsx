import EChartsReact from 'echarts-for-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IProduct, TFilter } from '../assets/types'
import { getMonth, getNumberMonth } from '../assets/date'

export const Chart = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<IProduct[]>([])

  const defaultFilter = (): TFilter => {
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

  const [filter, setFilter] = useState<TFilter>(defaultFilter())

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((res: IProduct[]) => setProducts(res.filter(({ date }) => date)))
  }, [])

  useEffect(() => {
    localStorage.setItem('filter', filter)
  }, [filter])

  const getProductsByFabricId = (id: number): any[] => {
    return products.filter(({ factory_id }) => factory_id === id)
  }

  const getProductsByMonth = (products: IProduct[], month: number) => {
    return products.filter(({ date }) => date && getNumberMonth(date) === month)
  }

  const getValueProductsByFilter = (
    products: IProduct[],
    filter: TFilter,
  ): number => {
    return products.reduce(
      (acc, product) => acc + getValueProductByKey(product, filter),
      0,
    )
  }

  const getValueProductByKey = (product: IProduct, key: TFilter): number => {
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

  const getProducts = (fabricId: number, filter: TFilter) => {
    const months = getMonths()

    const productsByFabric = getProductsByFabricId(fabricId)

    return months.reduce((prev: any[], month) => {
      const filterProductsByDate = getProductsByMonth(productsByFabric, month)

      const productsValue = getValueProductsByFilter(
        filterProductsByDate,
        filter,
      )

      return [
        ...prev,
        {
          fabricId,
          month,
          value: productsValue,
        },
      ]
    }, [])
  }

  const getMonths = () => {
    const allMonths = products.reduce((acc: number[], { date }) => {
      return date ? [...acc, getNumberMonth(date)] : acc
    }, [])

    return [...new Set(allMonths)].sort((a, b) => a - b)
  }

  const getNamesMonth = () => {
    const allNameMonths = products.reduce((acc: string[], { date }) => {
      return date ? [...acc, getMonth(date)] : acc
    }, [])

    return [...new Set(allNameMonths)]
  }

  const getCountProductsByFabricId = (id: number) => {
    // console.log(getNamesMonth())
    console.log(`fabric${id}`, getProducts(id, filter))
    return getProducts(id, filter)
  }

  const option = {
    legend: {},
    tooltip: {},
    xAxis: {
      type: 'category',
      data: getNamesMonth(),
    },
    dataset: {
      dimensions: ['month', 'value'],
      source: [
        ...getCountProductsByFabricId(1),
        ...getCountProductsByFabricId(2),
      ],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        itemStyle: {
          color: 'rgb(0,40,255)',
        },
      },
      {
        type: 'bar',
        itemStyle: {
          color: 'rgb(255,0,0)',
        },
      },
    ],
  }

  const onChartClick = (params: any) => {
    console.log('Chart clicked', params)
    const fabricId = params.data.fabricId
    const month = params.data.month
    navigate(`details/${fabricId}/${month}`)
  }

  const onEvents = {
    click: onChartClick,
  }

  return (
    <>
      <div className='filterBorder'>
        <div className='filter'>
          <span>Фильтр по типу продукции</span>
          <select
            onChange={(e) => {
              // @ts-ignore
              setFilter(e.target.value)
            }}
            value={filter}
          >
            <option value={'all'}>Все</option>
            <option value={'product1'}>Продукт 1</option>
            <option value={'product2'}>Продукт 2</option>
          </select>
        </div>
      </div>

      <div className='chartBorder'>
        <EChartsReact option={option} onEvents={onEvents} />
      </div>
    </>
  )
}
