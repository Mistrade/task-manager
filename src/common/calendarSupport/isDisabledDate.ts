import {CalendarDisabledOptions} from '../../components/Calendars/types'
import dayjs from 'dayjs'

export const checkMinDateIsDisabled = ( currentDate: Date, minDate?: CalendarDisabledOptions['min'], includeMin?: CalendarDisabledOptions['includeMin'] ): boolean => {
  if( minDate ) {
    return includeMin
      ? dayjs( minDate ).isAfter( currentDate, 'day' )
      : dayjs( minDate ).isSameOrAfter( currentDate, 'day' )
  }

  return false
}
export const checkMaxDateIsDisabled = ( currentDate: Date, maxDate?: CalendarDisabledOptions['max'], includeMax?: CalendarDisabledOptions['includeMax'] ): boolean => {
  if( maxDate ) {
    return includeMax
      ? dayjs( maxDate ).isBefore( currentDate, 'day' )
      : dayjs( maxDate ).isSameOrBefore( currentDate, 'day' )
  }
  return false
}
export const checkDateIsWeekends = ( currentDate: Date, excludeWeekends?: CalendarDisabledOptions['excludeWeekends'] ): boolean => {
  if( excludeWeekends ) {
    const weekDay = dayjs( currentDate ).weekday()
    return weekDay === 6 || weekDay === 0
  }

  return false
}
export const checkDateInDisabledDatesList = ( currentDate: Date, disabledDateArray?: CalendarDisabledOptions['disableDates'] ): boolean => {
  if( !!disabledDateArray?.length ) {
    return disabledDateArray.some(
      ( disableDate ) => dayjs( currentDate ).isSame( disableDate, 'day' )
    )
  }

  return false
}
export const checkIsDisabledDate = ( currentDate: Date, options: CalendarDisabledOptions ): boolean => {
  const {
    min,
    includeMin = false,
    max,
    includeMax = false,
    excludeWeekends = false,
    disableDates = []
  } = options


  return [
    checkMinDateIsDisabled( currentDate, min, includeMin ),
    checkMaxDateIsDisabled( currentDate, max, includeMax ),
    checkDateIsWeekends( currentDate, excludeWeekends ),
    checkDateInDisabledDatesList( currentDate, disableDates )
  ]
    .some( ( res ) => res )
}
