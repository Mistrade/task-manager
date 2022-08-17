import {
	CalendarPriorityKeys,
	CalendarPriorityList,
	CalendarTaskList,
	DateItem,
	MonthItem,
	TaskMembersListType,
	TaskStatusesType,
	TaskStatusInfo,
	WeekItem,
	YearItem
} from '../components/Calendars/types'
import dayjs from 'dayjs'
import {CompleteIcon, CreatedIcon, ProcessIcon, WaitIcon} from '../components/Icons/Icons'

export const MonthList = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

export const DeclinationMonthList = [
  'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
]

export const WeekDaysList = [
  'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
]

export const WeekDaysShortList = [
  'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
]

export const disabledColor = 'rgba(30,30,30,.1)'
export const defaultColor = 'rgba(30,30,30,.45)'
export const currentColor = 'rgba(100,149,237,.9)'
export const currentColorWithoutBlur = 'rgb(100,149,237)'
export const hoverColor = 'rgba(100,149,237,.15)'
export const darkColor = 'rgba(0, 0, 0, .6)'
export const todayID = 'calendar-today'

export const priorityColors: { [key in CalendarPriorityKeys]: string } = {
  veryLow: defaultColor,
  low: 'lightblue',
  medium: currentColor,
  high: 'orange',
  veryHigh: 'red',
  not_selected: currentColor
}
export const PRIORITY_TITLES: { [key in CalendarPriorityKeys]: string } = {
  veryLow: 'Очень низкий',
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  veryHigh: 'Очень высокий',
  not_selected: 'Не выбрано'
}
export const PRIORITY_LIST: CalendarPriorityList = [
  { type: 'veryHigh', title: PRIORITY_TITLES.veryHigh },
  { type: 'high', title: PRIORITY_TITLES.high },
  { type: 'medium', title: PRIORITY_TITLES.medium },
  { type: 'low', title: PRIORITY_TITLES.low },
  { type: 'veryLow', title: PRIORITY_TITLES.veryLow }
]

export const TASK_STATUSES: { [key in TaskStatusesType]: TaskStatusInfo } = {
  created: {
    value: false,
    key: 'created',
    title: 'Запланировано к выполнению',
    icon: <CreatedIcon size={20}/>
  },
  in_progress: {
    value: false,
    key: 'in_progress',
    title: 'В процессе выполнения',
    icon: <ProcessIcon size={20}/>
  },
  review: {
    value: false,
    key: 'review',
    title: 'Ожидает подтверждения',
    icon: <WaitIcon size={20}/>
  },
  completed: {
    value: true,
    key: 'completed',
    title: 'Выполнено',
    icon: <CompleteIcon size={20}/>
  }
}

export const DATE_RENDER_FORMAT = 'DD-MM-YYYY HH:mm'
export const DATE_HOURS_FORMAT = 'HH:mm'
export const DEFAULT_TASK_STATUS: TaskStatusesType = 'created'
export const DEFAULT_TASK_PRIORITY: CalendarPriorityKeys = 'medium'
export const Members: TaskMembersListType = [
  {
    name: 'Владос',
    surname: 'Валеев',
    patronymic: 'Ринатович',
    id: '1',
    gender: 'man',
    socialNetworks: [
      {
        networkName: 'vk',
        link: 'https://vk.com/yudakov2014'
      }
    ]
  }
]

export const getHumanizeDateValue = ( date: Date, withTime: boolean = true ) => {
  return dayjs( date ).format( `DD ${DeclinationMonthList[ date.getMonth() ]} YYYY${withTime ? ' в HH:mm' : ''}` )
}

export const defaultYearItem: YearItem = {
  year: -1,
  months: []
}
export const defaultMonthItem: MonthItem = {
  monthOfYear: -1,
  year: -1,
  weeks: []
}
export const defaultWeekItem: WeekItem = {
  weekOfYear: -1,
  month: -1,
  year: -1,
  days: []
}
export const defaultDateItem: DateItem = {
  current: {
    date: new Date(),
    layout: 'day'
  },
  settingPanel: {
    monthItem: defaultMonthItem,
    monthCurrent: {
      layout: 'month',
      month: -1,
      year: -1
    }
  }
}

export enum LS_KEYS {
  'EVENTS' = 'events'
}
