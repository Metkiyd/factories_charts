import * as dayjs from 'dayjs'
import * as updateLocale from 'dayjs/plugin/updateLocale'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/ru'

import { IProduct } from '../types'

dayjs.extend(updateLocale)
dayjs.extend(customParseFormat)

dayjs.updateLocale('ru', {
  monthsShort: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
})

export const getNumberMonth = (date: string) => {
  return dayjs(date, 'D/M/YYYY').month()
}

export const getNameByNumberMount = (
  monthNumber: number,
  isFull = false,
): string => {
  dayjs.locale('ru')
  const month = dayjs().month(monthNumber).startOf('month')
  const format = isFull ? 'MMMM' : 'MMM'

  return month.format(format)
}

export const getNumberMonths = (products: IProduct[]): number[] => {
  const allMonths = products.reduce((acc: number[], { date }) => {
    return date ? [...acc, getNumberMonth(date)] : acc
  }, [])

  return [...new Set(allMonths)].sort((a, b) => a - b)
}

export const getNamesMonth = (products: IProduct[]): string[] => {
  const months = getNumberMonths(products)

  return months.map((numberMonth) => getNameByNumberMount(numberMonth))
}
