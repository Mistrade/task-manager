import {
  CalendarCurrentMonth,
  CalendarCurrentWeek,
  CalendarCurrentYear,
  CalendarDisabledOptions
} from '../../components/Calendars/types'
import dayjs from 'dayjs'
import { getMonday } from './other'

export interface DateScopeType {
  startDate: Date,
  count: number
}

export interface DateScopeOptions {
  disabled?: CalendarDisabledOptions,
  useOtherDays?: boolean,
}

export const getMonthScope = ( current: CalendarCurrentMonth, options?: DateScopeOptions ): DateScopeType => {
  const firstDayOfMonth = dayjs( new Date( current.year, current.month, 1 ) )

  if( options?.useOtherDays ) {
    const firstDayOfWeek = firstDayOfMonth.day()
    const neededPrevDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
    const startDate = neededPrevDays > 0 ? firstDayOfMonth.subtract( neededPrevDays, 'day' ).toDate() : firstDayOfMonth.toDate()
    const count = Math.ceil( 41 / 7 )
    console.log( 'я тут ', count )
    return {
      startDate,
      count
    }
  }
  const lastDate = firstDayOfMonth.add( firstDayOfMonth.daysInMonth() - 1, 'day' )
  console.log( 'dates: ', firstDayOfMonth.toDate(), lastDate.toDate() )

  const count = lastDate.week() - ( firstDayOfMonth.week() - 1 )

  return {
    startDate: firstDayOfMonth.toDate(),
    count: count > 6 || count < 4 ? 6 : count
  }
}
export const getWeekScope = ( current: CalendarCurrentWeek ): DateScopeType => {
  let startDate = getMonday( current.aroundDate )
  let count = 7

  return {
    startDate,
    count
  }
}

export const getYearScope = ( current: CalendarCurrentYear, options?: DateScopeOptions ): DateScopeType => {
  let startDate = dayjs( new Date( current.year, 0, 1 ) )
  let end = startDate.add( 1, 'year' ).subtract( 1, 'day' )

  const count = end.month()
  return {
    startDate: startDate.toDate(),
    count
  }
}
