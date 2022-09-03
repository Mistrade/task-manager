import {
	CalendarCurrentDay,
	CalendarCurrentMonth,
	CalendarCurrentWeek,
	CalendarCurrentYear,
	CalendarDisabledOptions,
	CalendarMode,
	DateItem,
	EventItem,
	MonthItem,
	SelectTaskItem,
	TaskDate,
	TaskMonth,
	TaskSetResult,
	TaskStorage,
	TaskTileClickArguments,
	TaskYear,
	WeekItem,
	YearItem
} from '../components/Calendars/types'
import dayjs from 'dayjs'
import {
	ChangeDayCurrentFn,
	ChangeMonthCurrentFn,
	ChangeWeekCurrentFn,
	ChangeYearCurrentFn,
	ShortChangeCurrentPattern
} from './commonTypes'
import {getHumanizeDateValue, MonthList, WeekDaysList} from './constants'
import {getMonthDays, getWeekDays, getYearDays} from './calendarSupport/getters'

export const addNull = ( value: number ): string => value < 10 ? `0${value}` : value.toString()

export const generateTaskInformerObject = ( taskItem: TaskTileClickArguments ) => {
  const { taskInfo, date, event } = taskItem
}


export const checkTaskStatus = ( taskItem: SelectTaskItem ): string => {
  if( taskItem.taskInfo.status === 'completed' ) {
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

export const getTaskListOfDay = ( day: Date, storage: TaskStorage ): Array<EventItem> => {
  const y = storage[ dayjs( day ).year() ] || {}
  const m = y[ dayjs( day ).month() ] || {}
  return m[ dayjs( day ).date() ] || []
}


export const setTaskListToDay = ( storage: TaskStorage, event: EventItem ): TaskStorage => {
  const start = dayjs( event.time )
  const end = dayjs( event.timeEnd )

  let taskStorage = storage

  if( start.isSame( end, 'day' ) ) {
    let y = storage[ start.year() ]

    if( y ) {
      let m = y[ start.month() ]

      if( m ) {
        let d = m[ start.date() ]

        if( d ) {
          d.push( event )
        } else {
          m = {
            ...m,
            [ `${start.date()}` ]: [event]
          }
        }
      } else {
        y = {
          ...y,
          [ `${start.month()}` ]: {
            [ `${start.date()}` ]: [event]
          }
        }
      }
    } else {
      taskStorage = {
        ...taskStorage,
        [ `${start.year()}` ]: {
          [ `${start.month()}` ]: {
            [ `${start.date()}` ]: [event]
          }
        }
      }
    }
    return taskStorage
  }

  return storage
}

export const setTaskAtDay = ( storage: TaskStorage, day: Date, event: EventItem ): TaskStorage => {
  console.log( 'set task at day is atrted' )
  let newStorage = {
    ...storage
  }

  const y: number = day.getFullYear()
  const m: number = day.getMonth()
  const d: number = day.getDate()

  const currentYear: TaskYear = newStorage[ y ] || {}
  const currentMonth: TaskMonth = currentYear[ m ] || {}
  const currentDate: TaskDate = currentMonth[ d ] || []

  const date: TaskDate = [...currentDate]
  date.push( event )

  const month = {
    ...currentMonth,
    [ `${d}` ]: date
  }

  const year = {
    ...currentYear,
    [ `${m}` ]: month
  }

  newStorage = {
    ...newStorage,
    [ `${y}` ]: year
  }

  return newStorage
}

export const setTask = ( storage: TaskStorage, event: EventItem ): TaskSetResult => {
  try {

    const isOneDay = dayjs( event.time ).isSame( dayjs( event.timeEnd ), 'day' )

    if( isOneDay ) {
      storage = setTaskAtDay( storage, dayjs( event.time ).toDate(), event )
      return { status: true, storage }
    } else {
      let i = dayjs( event.time )
      while (i.isSameOrBefore( dayjs( event.timeEnd ), 'day' )) {
        storage = setTaskAtDay( storage, i.toDate(), event )
        i = i.add( 1, 'day' )
      }
      return { status: true, storage }
    }
  } catch (e) {
    console.log( e )
    return {
      status: false,
      storage
    }
  }
}

export const getTaskStorage = ( tasks: Array<EventItem> ): TaskStorage => {
  const r: TaskStorage = {}

  tasks.forEach( ( task ) => {
    setTask( r, task )
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
  return `${dayOfWeek} - ${getHumanizeDateValue( d.toDate(), false )}`
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
  const { layout } = current

  switch (layout) {
    case 'day':
      return changeDayCurrentHandler( current, pattern )
    case 'week':
      return changeWeekCurrentHandler( current, pattern )
    case 'month':
      return changeMonthCurrentHandler( current, pattern )
    case 'year':
      return changeYearCurrentHandler( current, pattern )
  }
}

export const generateHoursArray = ( {
                                      start,
                                      end
                                    }: { start: number, end: number } ): Array<number> => {
  const s: number = start < 0 || start > 23 ? 0 : start
  const e: number = end < 0 || end > 23 ? 23 : end
  let counter: number = s
  let arr: Array<number> = []
  while (counter <= e) {
    arr.push( counter )
    counter++
  }
  return arr
}

export const generateMinuteArray = ( { step }: { step: number } ) => {
  const s = step <= 0 || step > 30 ? 5 : step > 5 ? Math.floor( step / 5 ) : step

  const length = 60 / s
  let counter = 0
  let arr = []
  while (counter < length) {
    arr.push( counter * step )
    counter++
  }

  return arr

}

export const CurrentObserver = {
  year( prev: YearItem, current: CalendarCurrentYear, disabledOptions?: CalendarDisabledOptions ): YearItem {
    const { year: prevYear } = prev

    if( current.year !== prevYear ) {
      console.log( 'year handler has been started' )
      return getYearDays( current, { useOtherDays: false, disabled: disabledOptions } )
    }

    return prev
  },
  month( prev: MonthItem, current: CalendarCurrentMonth, disabledOptions?: CalendarDisabledOptions ): MonthItem {
    const prevMonth = prev.monthOfYear
    const prevYear = prev.year

    if( prevMonth !== current.month || prevYear !== current.year ) {
      console.log( 'month handler has been started' )
      return getMonthDays( current, { useOtherDays: true, disabled: disabledOptions } )
    }

    return prev
  },
  week( prev: WeekItem, current: CalendarCurrentWeek, disabledOptions?: CalendarDisabledOptions ): WeekItem {
    const { aroundDate } = current
    const curDate = dayjs( aroundDate )
    const c = {
      y: curDate.year(),
      m: curDate.month(),
      w: curDate.week()
    }

    if( prev.year !== c.y || prev.month !== c.m || prev.weekOfYear !== c.w ) {
      console.log( 'week handler has been started' )
      return getWeekDays(
        current,
        { year: c.y, month: c.m },
        { useOtherDays: true, disabled: disabledOptions }
      )
    }

    return prev
  },
  date( prev: DateItem, current: CalendarCurrentDay, disabledOptions?: CalendarDisabledOptions ): DateItem {


    const prevDate = dayjs( prev.current.date )
    const currentDate = dayjs( current.date )

    const hasSettingPanelInfo = prev.settingPanel.monthItem.monthOfYear >= 0

    if( prevDate.isSame( currentDate, 'month' ) && hasSettingPanelInfo ) {
      return {
        ...prev,
        current
      }
    }

    console.log( 'date handler has been started' )

    const monthItemCurrent: CalendarCurrentMonth = {
      layout: 'month',
      month: current.date.getMonth(),
      year: current.date.getFullYear()
    }
    return {
      current,
      settingPanel: {
        monthItem: getMonthDays( monthItemCurrent, {
          useOtherDays: true,
          disabled: disabledOptions
        } ),
        monthCurrent: monthItemCurrent
      }
    }
  }
}

export const convertEventStatus = ( status: EventItem['status'] ) => {
  switch (status) {
    case 'created':
      return 'Создано, ожидает выполнения'
    case 'in_progress':
      return 'В процессе выполнения'
    case 'review':
      return 'Ожидает подтверждения'
    case 'completed':
      return 'Выполнено'
  }
}
