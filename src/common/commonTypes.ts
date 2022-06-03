import { CalendarCurrentData } from '../components/Calendars/types'

export type ChangeCurrentPattern = '-year' | '-month' | '+year' | '+month' | 'today'
export type ChangeCurrentFnType = (current: CalendarCurrentData, pattern?: ChangeCurrentPattern) => Date
