import EChartsReact from 'echarts-for-react'
import { Select } from '../components/Select'

import { useBarChart } from '../hooks/useBarChart'

export const HomePage = () => {
  const { filter, setFilter, onEvents, option } = useBarChart()

  return (
    <>
      <Select value={filter} setValue={setFilter} />
      <div className='chartBorder'>
        <EChartsReact option={option} onEvents={onEvents} />
      </div>
    </>
  )
}
