import {
	CalendarCurrentDay,
	CalendarCurrentList,
	CalendarCurrentMonth,
	CalendarCurrentWeek,
	CalendarCurrentYear
} from '../components/Calendars/types'

export type ShortChangeCurrentPattern = '--' | '-' | 'today' | '+' | '++'
export type ChangeMonthCurrentFn = (current: CalendarCurrentMonth, pattern?: ShortChangeCurrentPattern) => Date
export type ChangeWeekCurrentFn = (current: CalendarCurrentWeek, pattern?: ShortChangeCurrentPattern) => Date
export type ChangeYearCurrentFn = (current: CalendarCurrentYear, pattern?: ShortChangeCurrentPattern) => Date
export type ChangeDayCurrentFn = (current: CalendarCurrentDay, pattern?: ShortChangeCurrentPattern) => Date
export type ChangeListCurrentFn = (current: CalendarCurrentList, pattern?: ShortChangeCurrentPattern) => CalendarCurrentList
