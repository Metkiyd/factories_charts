import * as dayjs from 'dayjs'
import * as updateLocale from 'dayjs/plugin/updateLocale'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/ru'

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

export const getMonth = (date: string) => {
  return dayjs(date, 'D/M/YYYY').locale('ru').format('MMM')
}

export const getNumberMonth = (date: string) => {
  return dayjs(date, 'D/M/YYYY').month()
}

export const getNameByNumberMount = (mount: number): string => {
  switch (mount) {
    case 0:
      return 'Янв'
    case 1:
      return 'Фев'
    case 2:
      return 'Мар'
    case 3:
      return 'Апр'
    case 4:
      return 'Май'
    case 5:
      return 'Июн'
    case 6:
      return 'Июл'
    case 7:
      return 'Авг'
    case 8:
      return 'Сен'
    case 9:
      return 'Окт'
    case 10:
      return 'Ноя'
    default:
      return 'Дек'
  }
}
