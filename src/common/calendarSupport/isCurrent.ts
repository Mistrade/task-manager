import {
  CalendarCurrentContext,
  CalendarCurrentDay,
  CalendarCurrentMonth,
  CalendarCurrentWeek,
  CalendarCurrentYear
} from '../../components/Calendars/types'
import dayjs from 'dayjs'

const checkDateIsCurrentYear = ( current: CalendarCurrentYear, date: Date ): boolean => {
  return date.getFullYear() === current.year
}
const checkDateIsCurrentMonth = ( current: CalendarCurrentMonth, date: Date ): boolean => {
  const { month, year } = current
  const d = dayjs( date )
  return d.month() === month && d.year() === year
}
const checkDateIsCurrentWeek = ( current: CalendarCurrentWeek, date: Date ): boolean => {
  const d = dayjs( date )
  const m = date.getMonth()

  return d.week() === dayjs( current.aroundDate ).week()
    && d.year() === dayjs( current.aroundDate ).year()
    && d.month() === m
}
const checkDateIsCurrentDate = ( current: CalendarCurrentDay, date: Date ): boolean => {
  const d = dayjs( date )
  const _ = dayjs( current.date )

  return _.isSame( d, 'day' )
}
export const checkIsCurrent = ( current: CalendarCurrentContext, date: Date ): boolean => {
  const ctx = dayjs( new Date( current.year, current.month, 1 ) )
  return date.getMonth() === ctx.month() && date.getFullYear() === ctx.year()
}
