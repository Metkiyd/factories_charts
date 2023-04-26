import EChartsReact from 'echarts-for-react'

import { UsePieChart } from '../hooks/usePieChart'

import '../style.css'

export const DetailsPage = () => {
  const option = UsePieChart()

  return (
    <div className='wrapper'>
      <main className='content'>
        <EChartsReact option={option} />
      </main>
    </div>
  )
}
