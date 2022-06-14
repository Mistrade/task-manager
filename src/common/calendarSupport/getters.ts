import {
  CalendarCurrentContext,
  CalendarCurrentMonth,
  CalendarCurrentWeek,
  CalendarCurrentYear,
  MonthItem,
  WeekItem,
  YearItem
} from '../../components/Calendars/types'
import { DateScopeOptions, getMonthScope, getWeekScope, getYearScope } from './scopes'
import {
  generateDateOfMonthArray,
  generateDateOfWeekArray,
  generateDateOfYearArray
} from './generators'

export const getWeekDays = ( current: CalendarCurrentWeek, context: CalendarCurrentContext, options?: DateScopeOptions ): WeekItem => {
  const dateScope = getWeekScope( current )
  return generateDateOfWeekArray( current, dateScope, context, options )
}
export const getMonthDays = ( current: CalendarCurrentMonth, options?: DateScopeOptions ): MonthItem => {
  const start = new Date()
  const dateScope = getMonthScope( current, options )
  const result = generateDateOfMonthArray( current, dateScope, options )
  const end = new Date()
  console.log( end.getTime() - start.getTime() )
  return result
}
export const getYearDays = ( current: CalendarCurrentYear, options?: DateScopeOptions ): YearItem => {
  const start = new Date()
  const dateScope = getYearScope( current, options )
  const result = generateDateOfYearArray( current, dateScope, options )
  const end = new Date()
  console.log( 'year getter: ', end.getTime() - start.getTime() )
  return result
}
