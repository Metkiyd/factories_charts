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
