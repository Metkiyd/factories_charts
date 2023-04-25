import EChartsReact from 'echarts-for-react'
import { useEffect, useState } from "react";
import { IProduct, TFilter } from "../assets/types";

export const Chart = () => {

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
        .then(res => res.json())
        .then(res => setProducts(res))
  }, [])

  useEffect(() => {
    localStorage.setItem('filter', filter)
  }, [filter])


  const getProductsByFabricId = (id: number): any[] => {
    return products.filter(({ factory_id }) => factory_id === id)
  }

  const getProductsByMount = (products: IProduct[], mount: number) => {
    const regExp = new RegExp(`^(\\d{1,2})\\/${mount}\\/(\\d{4})$`);

    return products.filter(({date}) => date && regExp.test(date))
  }

  const getValueProductsByKey = (products: IProduct[], key: TFilter): number => {
    return products.reduce((acc, product) => acc + getValueProductByKey(product, key), 0)
  }

  const getValueProductByKey = (product: IProduct, key: TFilter): number => {
    switch (key) {
      case 'product1':
        return product[key]!
      case 'product2':
        return product[key]!
      default:
        return (product['product1'] || 0) + (product['product2'] || 0) + (product['product3'] || 0)
    }
  }

  const getProducts = (fabricId: number, category: TFilter) => {
    const mounts = getMounts()

    const productsByFabric = getProductsByFabricId(fabricId)

    return mounts.reduce((prev: any[], mount) => {
      const filterProductsByDate = getProductsByMount(productsByFabric, mount)

      const productsValue =  getValueProductsByKey(filterProductsByDate, category)

      return [
          ...prev,
        [
          getNameByNumberMount(mount),
          productsValue
        ]
      ]
    }, [])
  }

  const getMounts = () => {

    const allMounts = products.reduce((acc: number[], { date }) => {
      const regExp = new RegExp(`^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})$`);

      if(!date) return acc

      const mountNumber = Number(regExp.exec(date)![2])

      return date ? [...acc, mountNumber] : acc
    }, [])

    return [ ...new Set(allMounts) ].sort((a, b ) => a - b)
  }

  const getNamesMount = () => {
    const mounts = getMounts()

    return mounts.map(mount => getNameByNumberMount(mount))
  }

  const getNameByNumberMount = (mount: number): string => {
    switch (mount) {
      case 1:
        return 'Янв';
      case 2:
        return 'Фев';
      case 3:
        return 'Мар';
      case 4:
        return 'Апр';
      case 5:
        return 'Май';
      case 6:
        return 'Июн';
      case 7:
        return 'Июл';
      case 8:
        return 'Авг';
      case 9:
        return 'Сен';
      case 10:
        return 'Окт';
      case 11:
        return 'Ноя';
      default:
        return 'Дек';
    }
  }

  const getCountProductsByFabricId = (id: number) => {

    return getProducts(id,  filter)
  }

  const option = {
    legend: {},
    tooltip: {},
    xAxis: { type: 'category',
      data: getNamesMount()
    },
    yAxis: {},
    series: [
      {
        data: getCountProductsByFabricId(1),
        type: 'bar',
        itemStyle: {
          color: 'rgb(0,40,255)'
        },
      },
      {
        data: getCountProductsByFabricId(2),
        type: 'bar',
        itemStyle: {
          color: 'rgb(255,0,0)'
        },
      },
    ],
  }
  return (
    <div>
      {/*<select onChange={(e) => {*/}
      {/*  setFilter(e.target.value)*/}
      {/*}}*/}
      {/*value={filter}*/}
      {/*>*/}
      {/*  <option value={'all'}>Все</option>*/}
      {/*  <option value={'product1'}>Продукт 1</option>*/}
      {/*  <option value={'product2'}>Продукт 2</option>*/}
      {/*</select>*/}
      <EChartsReact option={option} />
    </div>
  )
}
