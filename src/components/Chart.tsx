import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import EChartsReact from 'echarts-for-react'

import { getNamesMonth, getNumberMonths, defaultFilter, getProductsByNumberMonth, getValueProductsByFilter} from '../assets/utils'

import { IChartData, IProduct, TFilter } from '../assets/types'


export const Chart = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState<IProduct[]>([])
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

  const getProducts = (factoryId: number, filter: TFilter): IChartData[] => {
    const months = getNumberMonths(products)

    const productsByFabric = getProductsByFabricId(factoryId)

    return months.reduce((prev: any[], month) => {
      const filterProductsByDate = getProductsByNumberMonth(productsByFabric, month)

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


  const getCountProductsByFabricId = (id: number) => {
    return getProducts(id, filter)
  }

  const option = {
    legend: {
      bottom: '5%',
      data: ['Фабрика А', 'Фабрика Б'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: getNamesMonth(products),
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        name: 'Фабрика А',
        data: getCountProductsByFabricId(1),
        itemStyle: {
          color: 'rgb(255,0,0)',
        },
      },
      {
        type: 'bar',
        name: 'Фабрика Б',
        data: getCountProductsByFabricId(2),
        itemStyle: {
          color: 'rgb(0,40,255)',
        },
      },
    ],
  }

  const onChartClick = (params: any) => {
    const fabricId = params.data.factoryId
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
