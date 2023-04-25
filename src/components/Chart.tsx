import EChartsReact from 'echarts-for-react'
import { products } from '../data'

export const Chart = () => {
  const option = {
    legend: {},
    tooltip: {},
    dataset: {
      source: products,
      //   [
      //   ['product', '2015', '2016', '2017'],
      //   ['Cheese Cocoa', 86.4, 65.2, 82.5],
      //   ['Walnut Brownie', 72.4, 53.9, 39.1],
      // ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [
      { type: 'bar' },
      { type: 'bar' },
      { type: 'bar' },
      { type: 'bar' },
    ],
  }
  return (
    <div>
      <EChartsReact option={option} />
    </div>
  )
}
