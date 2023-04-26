import { EChartsOption } from 'echarts'
import { IChartData } from '../types'

export const getPieOption = (
  factoryId: number,
  monthName: string,
  dataset: EChartsOption[],
) => ({
  title: {
    text: `Статистика по продукции Фабрики ${factoryId}`,
    subtext: `За ${monthName} месяц`,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '5%',
    orient: 'horizontal',
    left: 'center',
  },
  color: ['#4DAE00', '#FEB258'],
  series: [
    {
      name: 'Информация о продуктах',
      type: 'pie',
      radius: '60%',
      data: dataset,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: {
        formatter: '{c}',
        fontWeight: 'bold',
        // color: ['#FEB258', '#4DAE00'],
      },
      labelLine: {
        show: false,
      },
    },
  ],
})

export const getBarChartOption = (
  nameMonths: string[],
  datasetOneFactory: IChartData[],
  datasetTwoFactory: IChartData[],
) => ({
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
    data: nameMonths,
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: 'Фабрика А',
      data: datasetOneFactory,
      itemStyle: {
        color: '#E83B50',
      },
    },
    {
      type: 'bar',
      name: 'Фабрика Б',
      data: datasetTwoFactory,
      itemStyle: {
        color: '#2832F0',
      },
    },
  ],
})
