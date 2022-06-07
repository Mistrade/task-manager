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
  const dateScope = getMonthScope( current, options )
  console.log( 'monthScope: ', dateScope, options )
  return generateDateOfMonthArray( current, dateScope, options )
}
export const getYearDays = ( current: CalendarCurrentYear, options?: DateScopeOptions ): YearItem => {
  const dateScope = getYearScope( current, options )
  return generateDateOfYearArray( current, dateScope, options )
}
