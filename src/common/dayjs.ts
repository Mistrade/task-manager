import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import Weekday from 'dayjs/plugin/weekday'
import isToday from 'dayjs/plugin/isToday'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'
import {
  CalendarCurrentData,
  CalendarDisabledOptions,
  CalendarList
} from '../components/Calendars/types'

const customLocale: Partial<ILocale> = {
  name: 'ru',
  weekdays: [
    'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
  ],
  weekdaysMin: [
    'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
  ],
  weekdaysShort: [
    'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
  ],
  months: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ],
  monthsShort: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ],
  ordinal: n => `${n}º`, // ordinal Function (number) => return number + output
  formats: {
    // сокращенные имена параметров для локализации
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
    // нижний регистр/краткая запись, необязательные форматы для локализации
    // l: 'D/M/YYYY',
    // ll: 'D MMM, YYYY',
    // lll: 'D MMM, YYYY h:mm A',
    // llll: 'ddd, MMM D, YYYY h:mm A'
  },
  relativeTime: {
    // строковый формат относительного времени, оставьте %s %d в том же виде
    future: 'in %s', // например, "в 2 часа", %s был заменен на "2 часа"
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours', // например, "2 часа" %d был заменен на "2"
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  },
  weekStart: 1
}

dayjs.extend( isBetween )
dayjs.extend( isToday )
dayjs.extend( isTomorrow )
dayjs.extend( isYesterday )
dayjs.extend( Weekday )
dayjs.extend( isSameOrAfter )
dayjs.extend( isSameOrBefore )

interface CurrentData {
  month: number,
  year: number
}

interface CheckStartDateFnResult {
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
}

type CheckStartDateFn = ( current: CurrentData ) => CheckStartDateFnResult | null

const checkStartAndEndDate: CheckStartDateFn = ( { month, year } ) => {
  if( isNaN( month ) || isNaN( year ) ) {
    return null
  }

  const firstDayOfMonth = dayjs( new Date( year, month, 1 ) )
  const firstDayOfWeek = firstDayOfMonth.day()
  const neededPrevDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  const startDate = neededPrevDays > 0 ? firstDayOfMonth.subtract( neededPrevDays, 'day' ) : firstDayOfMonth
  const endDate = startDate.add( 41, 'day' )

  return {
    startDate,
    endDate
  }
}

const checkIsDisabledDate = ( currentDate: dayjs.Dayjs, options: CalendarDisabledOptions ): boolean => {
  const {
    min,
    includeMin = false,
    max,
    includeMax = false,
    excludeWeekends = true,
    disableDates = []
  } = options

  let result = false

  if( min ) {
    result = includeMin ? dayjs( min ).isAfter( currentDate, 'day' ) : dayjs( min ).isSameOrAfter( currentDate, 'day' )
    if( result ) return true
  }

  if( max ) {
    // console.log( 'max from: ', max )
    result = includeMax ? dayjs( max ).isBefore( currentDate, 'day' ) : dayjs( max ).isSameOrBefore( currentDate, 'day' )
    if( result ) return true
  }

  if( excludeWeekends ) {
    const weekDay = currentDate.day()
    result = weekDay === 6 || weekDay === 0
    if( result ) return true
  }

  if( !!disableDates.length ) {
    result = disableDates.some(
      ( value ) => currentDate.isSame( value, 'day' )
    )

    if( result ) return true
  }

  return result
}

const checkIsCurrent = ( current: CalendarCurrentData, date: dayjs.Dayjs ): boolean => {
  const { month, year } = current
  const dateMonth = date.month()
  const dateYear = date.year()

  return dateMonth === month && dateYear === year
}

type GenerateDateArrayFn = ( current: CalendarCurrentData, scope: CheckStartDateFnResult, disabledOptions: CalendarDisabledOptions ) => CalendarList

const generateDateArray: GenerateDateArrayFn = ( current, {
  startDate,
  endDate
}, disabledOptions ) => {
  const array: CalendarList = []
  let iterationDate = startDate

  while (iterationDate.isBetween( startDate, endDate, 'day', '[]' )) {
    array.push( {
      value: iterationDate.toDate(),
      meta: {
        isToday: iterationDate.isToday(),
        isTomorrow: iterationDate.isTomorrow(),
        isYesterday: iterationDate.isYesterday(),
        isDisabled: checkIsDisabledDate( iterationDate, disabledOptions ),
        isCurrent: checkIsCurrent( current, iterationDate )
      }
    } )

    iterationDate = iterationDate.add( 1, 'day' )
  }

  return array
}


type GetPickerDatesProps = ( current: CurrentData, disabledOptions: CalendarDisabledOptions ) => CalendarList

export const getPickerDates: GetPickerDatesProps = ( current, disabledOptions ) => {
  const dateScope = checkStartAndEndDate( current )

  if( dateScope ) {
    return generateDateArray( current, dateScope, disabledOptions )
  }

  return []
}
