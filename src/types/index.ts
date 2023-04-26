import React from 'react'

export type TFilter = 'all' | 'product1' | 'product2'

export interface IProduct {
  id: number
  factory_id: number
  date: string
  product1: number
  product2: number
  product3: number
}

export interface IChartData {
  factoryId: number
  month: number
  value: number
}

export interface INotValidProduct {
  id: number
  factory_id: number
  date: string | null
  product1: number | null
  product2: number | null
  product3: number
}

export interface ISelect {
  value: string
  setValue: React.Dispatch<React.SetStateAction<TFilter>>
}

export interface IGetDatasetPie {
  products: IProduct[]
  key: 'product1' | 'product2'
  name: string
  color: '#4DAE00' | '#FEB258'
}
