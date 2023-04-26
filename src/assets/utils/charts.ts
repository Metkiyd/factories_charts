import {EChartsOption} from "echarts";

export const getPieOption = (factoryId: number, monthName: string, dataset: EChartsOption[]) => ({
    title: {
        text: `Статистика по продукции Фабрики ${factoryId}`,
        subtext: `За ${monthName} месяц`,
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
        },
    ],
})