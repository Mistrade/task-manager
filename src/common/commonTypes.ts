import {
	CalendarCurrentDay, CalendarCurrentList,
	CalendarCurrentMonth,
	CalendarCurrentWeek,
	CalendarCurrentYear,
	CalendarMode
} from '../components/Calendars/types'

export type ChangeMonthCurrentPattern = '-year' | '-month' | '+year' | '+month' | 'today'
export type ChangeWeekCurrentPattern = '-week' | 'today' | '+week'
export type ChangeYearCurrentPattern = '-year' | 'today' | '+year'
export type ChangeDayCurrentPattern = '-day' | 'today' | '+day'
export type ShortChangeCurrentPattern = '--' | '-' | 'today' | '+' | '++'
export type ChangeCurrentPattern<T extends CalendarMode> = T extends CalendarCurrentYear
  ? ChangeYearCurrentPattern
  : T extends CalendarCurrentMonth
    ? ChangeMonthCurrentPattern
    : T extends CalendarCurrentWeek
      ? ChangeWeekCurrentPattern
      : ChangeDayCurrentPattern
export type ChangeCurrentFnType =
  ChangeMonthCurrentFn
  | ChangeWeekCurrentFn
  | ChangeYearCurrentFn
  | ChangeDayCurrentFn
export type ChangeMonthCurrentFn = ( current: CalendarCurrentMonth, pattern?: ShortChangeCurrentPattern ) => Date
export type ChangeWeekCurrentFn = ( current: CalendarCurrentWeek, pattern?: ShortChangeCurrentPattern ) => Date
export type ChangeYearCurrentFn = ( current: CalendarCurrentYear, pattern?: ShortChangeCurrentPattern ) => Date
export type ChangeDayCurrentFn = ( current: CalendarCurrentDay, pattern?: ShortChangeCurrentPattern ) => Date
export type ChangeListCurrentFn = ( current: CalendarCurrentList, pattern?: ShortChangeCurrentPattern ) => CalendarCurrentList
