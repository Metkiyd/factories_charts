import EChartsReact from 'echarts-for-react'
import { products } from '../data'
import { useNavigate } from 'react-router-dom'

export const Chart = () => {
  const navigate = useNavigate()

  const array = products.map((product) => ({
    factory: product.factory_id,
    // month: product.date,
    value: product.product1,
  }))
  const option = {
    legend: {},
    tooltip: {},
    dataset: {
      source: array,
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }],
  }

  const onChartClick = (params) => {
    console.log('Chart clicked', params)
    const fabricId = params.data.factory
    const mount = 3
    navigate(`details/${fabricId}/${mount}`)
  }

  const onEvents = {
    click: onChartClick,
  }

  return (
    <>
      <EChartsReact option={option} onEvents={onEvents} />
    </>
  )
}
