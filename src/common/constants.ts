import { CalendarPriorityKeys } from '../components/Calendars/types'

export const MonthList = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

export const WeekDaysList = [
  'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
]

export const disabledColor = 'rgba(30,30,30,.1)'
export const defaultColor = 'rgba(30,30,30,.30)'
export const currentColor = 'rgba(100,149,237,.9)'
export const hoverColor = 'rgba(100,149,237,.35)'

export const priorityColors: { [key in CalendarPriorityKeys]: string } = {
  veryLow: defaultColor,
  low: 'lightblue',
  medium: currentColor,
  high: 'orange',
  veryHigh: 'red'
}

const priorityRu: { [key in CalendarPriorityKeys]: string } = {
  veryLow: 'Очень низкий',
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  veryHigh: 'Очень высокий'
}

export const DATE_RENDER_FORMAT = 'DD-MM-YYYY HH:mm'
