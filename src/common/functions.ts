import {
  CalendarCurrentData,
  CalendarCurrentDay,
  CalendarCurrentMonth,
  CalendarCurrentWeek,
  CalendarCurrentYear,
  CalendarItem,
  CalendarMode,
  CalendarTaskList,
  SelectTaskItem,
  TaskDate,
  TaskMonth,
  TaskStorage,
  TaskTileClickArguments,
  TaskYear
} from '../components/Calendars/types'
import dayjs from 'dayjs'
import {
  ChangeCurrentFnType, ChangeDayCurrentFn,
  ChangeMonthCurrentFn,
  ChangeMonthCurrentPattern,
  ChangeWeekCurrentFn, ChangeYearCurrentFn, ShortChangeCurrentPattern
} from './commonTypes'
import { MonthList, WeekDaysList } from './constants'

export const addNull = ( value: number ): string => value < 10 ? `0${value}` : value.toString()

export const generateTaskInformerObject = ( taskItem: TaskTileClickArguments ) => {
  const { taskInfo, date, event } = taskItem
}


export const checkTaskStatus = ( taskItem: SelectTaskItem ): string => {
  if( taskItem.taskInfo.isCompleted ) {
    return 'Завершено'
  }

  if( dayjs( taskItem.taskInfo.time ).isBefore( dayjs(), 'minute' ) ) {
    return 'Просрочено'
  }

  if( dayjs( taskItem.taskInfo.time ).isAfter( dayjs(), 'minute' ) ) {
    return 'В работе'
  }

  return 'В работе'
}

export const getTaskListOfDay = ( day: CalendarItem, storage: TaskStorage ): CalendarTaskList => {
  const y = storage[ dayjs( day.value ).year() ] || {}
  const m = y[ dayjs( day.value ).month() ] || {}
  const d = m[ dayjs( day.value ).date() ] || []

  return d
}
export const getTaskStorage = ( tasks: CalendarTaskList ): TaskStorage => {
  const r: TaskStorage = {}

  tasks.forEach( ( task ) => {
    const y: number = dayjs( task.time ).year()
    const m: number = dayjs( task.time ).month()
    const d: number = dayjs( task.time ).date()

    const currentYear: TaskYear = r[ y ] || {}
    const currentMonth: TaskMonth = currentYear[ m ] || {}
    const currentDate: TaskDate = currentMonth[ d ] || []
    currentDate.push( task )

    currentMonth[ d ] = currentDate
    currentYear[ m ] = currentMonth
    r[ y ] = currentYear
  } )

  return r || {}
}

export const changeYearCurrentHandler: ChangeYearCurrentFn = ( current, pattern ) => {
  const { year, layout } = current
  const old = dayjs( new Date( year, 0, 1 ) )
  let newCurrent = old.toDate()

  switch (pattern) {
    case '+':
      newCurrent = old.add( 1, 'year' ).toDate()
      break
    case '++':
      newCurrent = old.add( 2, 'year' ).toDate()
      break
    case '-':
      newCurrent = old.subtract( 1, 'year' ).toDate()
      break
    case '--':
      newCurrent = old.subtract( 2, 'year' ).toDate()
      break
    case 'today':
      newCurrent = dayjs().toDate()
      break
  }

  return newCurrent
}

export const changeMonthCurrentHandler: ChangeMonthCurrentFn = ( current, pattern = 'today' ) => {
  const oldCurrent = dayjs( new Date( current.year, current.month, 1 ) )
  let newCurrentDate = oldCurrent.toDate()
  switch (pattern) {
    case '+':
      newCurrentDate = oldCurrent.add( 1, 'month' ).toDate()
      break
    case '++':
      newCurrentDate = oldCurrent.add( 1, 'year' ).toDate()
      break
    case '-':
      newCurrentDate = oldCurrent.subtract( 1, 'month' ).toDate()
      break
    case '--':
      newCurrentDate = oldCurrent.subtract( 1, 'year' ).toDate()
      break
    case 'today':
      newCurrentDate = dayjs().toDate()
      break
  }
  return newCurrentDate
}

export const changeWeekCurrentHandler: ChangeWeekCurrentFn = ( current, pattern = 'today' ) => {
  const oldCurrent = dayjs( current.aroundDate )

  switch (pattern) {
    case '+':
      return oldCurrent.add( 1, 'week' ).toDate()
    case '-':
      return oldCurrent.subtract( 1, 'week' ).toDate()
    case 'today':
      return dayjs().toDate()
    case '++':
      return oldCurrent.add( 1, 'month' ).toDate()
    case '--':
      return oldCurrent.subtract( 1, 'month' ).toDate()
  }
}

export const changeDayCurrentHandler: ChangeDayCurrentFn = ( current, pattern = 'today' ) => {
  const oldCurrent = dayjs( current.date )

  switch (pattern) {
    case '+':
      return oldCurrent.add( 1, 'day' ).toDate()
    case '-':
      return oldCurrent.subtract( 1, 'day' ).toDate()
    case 'today':
      return dayjs().toDate()
    case '++':
      return oldCurrent.add( 1, 'week' ).toDate()
    case '--':
      return oldCurrent.subtract( 1, 'week' ).toDate()
  }
}

const getMonthCalendarTitle = ( current: CalendarCurrentMonth, withTodayMonth?: boolean ): string => {
  const { year, month } = current
  const m = MonthList[ month ]
  const today = dayjs()

  const todayTitle = withTodayMonth && today.year() === year && month === today.month() ? '( Сегодня )' : ''
  return `${m}/${year} г. ${todayTitle}`.trim()
}

const getWeekCalendarTitle = ( current: CalendarCurrentWeek ): string => {
  const { aroundDate } = current
  const d = dayjs( aroundDate )
  const w = d.week()

  const m: CalendarCurrentMonth = {
    layout: 'month',
    year: d.year(),
    month: d.month()
  }
  return `Неделя ${w}, ${getMonthCalendarTitle( m, false )}`
}

const getYearCalendarTitle = ( current: CalendarCurrentYear ) => {
  const { year } = current
  return `Календарь ${year}г.`
}

const getDayCalendarTitle = ( current: CalendarCurrentDay ) => {
  const { date } = current
  const d = dayjs( date )
  const dayOfWeek = WeekDaysList[ d.weekday() ]
  const m = MonthList[ d.month() ]
  const format = `DD ${m} YYYY г.`
  return `${dayOfWeek}, ${d.format( format )}`
}

export const getCalendarTitle = ( current: CalendarMode ) => {
  switch (current.layout) {
    case 'month':
      return getMonthCalendarTitle( current, false )
    case 'week':
      return getWeekCalendarTitle( current )
    case 'day':
      return getDayCalendarTitle( current )
    case 'year':
      return getYearCalendarTitle( current )
  }
}

export const changeCurrentModeHandler = ( current: CalendarMode, pattern: ShortChangeCurrentPattern ) => {
  const {layout} = current

  switch (layout){
    case 'day':
      return changeDayCurrentHandler(current, pattern)
    case 'week':
      return changeWeekCurrentHandler(current, pattern)
    case 'month':
      return changeMonthCurrentHandler(current, pattern)
    case 'year':
      return changeYearCurrentHandler(current, pattern)
  }
}
