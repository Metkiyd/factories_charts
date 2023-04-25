import * as dayjs from 'dayjs'
import * as updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru'

dayjs.extend(updateLocale)

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
  const res = dayjs(date).locale('ru').format('MMM')
  return res
}
