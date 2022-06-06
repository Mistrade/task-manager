import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import Weekday from 'dayjs/plugin/weekday'
import isToday from 'dayjs/plugin/isToday'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import updateLocale from 'dayjs/plugin/updateLocale'
import duration from 'dayjs/plugin/duration'
import {
  CalendarCurrentData,
  CalendarDisabledOptions, CalendarItem,
  CalendarList, CalendarMode, CalendarTaskItem, CalendarTaskList, CalendarWeekList, WeekItem
} from '../components/Calendars/types'
import { defaultTasksList } from './constants'

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
dayjs.extend( weekOfYear )
dayjs.extend( updateLocale )
dayjs.extend( duration )

dayjs.updateLocale( 'en', {
  weekStart: 1,
  yearStart: 4
} )

interface CurrentData {
  month: number,
  year: number
}

type CheckDatesScopeFn = ( current: CalendarMode ) => DateScopeType | null
type GenerateDateArrayFn = ( current: CalendarMode, options: DateScopeType, disabledOptions: CalendarDisabledOptions ) => CalendarWeekList
type GetPickerDatesProps = ( current: CalendarMode, disabledOptions: CalendarDisabledOptions ) => CalendarWeekList

export interface DateScopeType {
  startDate: Date,
  count: number
}

const getDatesScope: CheckDatesScopeFn = ( current ) => {
  let startDate: Date = dayjs().toDate()
  let count: number = 0

  if( current.layout === 'month' ) {
    const firstDayOfMonth = dayjs( new Date( current.year, current.month, 1 ) )
    const firstDayOfWeek = firstDayOfMonth.day()
    const neededPrevDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
    startDate = neededPrevDays > 0 ? firstDayOfMonth.subtract( neededPrevDays, 'day' ).toDate() : firstDayOfMonth.toDate()
    count = 42
  }

  if( current.layout === 'week' ) {
    const first = dayjs().set( 'year', current.year ).week( current.week )
    const neededPrevDays = first.day() === 0 ? 6 : first.day() - 1
    count = 7
    startDate = neededPrevDays > 0 ? first.subtract( neededPrevDays, 'day' ).toDate() : first.toDate()
  }


  return {
    startDate,
    count
  }
}

const checkIsDisabledDate = ( currentDate: dayjs.Dayjs, options: CalendarDisabledOptions ): boolean => {
  const {
    min,
    includeMin = false,
    max,
    includeMax = false,
    excludeWeekends = false,
    disableDates = []
  } = options

  let result = false

  if( min ) {
    result = includeMin ? dayjs( min ).isAfter( currentDate, 'day' ) : dayjs( min ).isSameOrAfter( currentDate, 'day' )
    if( result ) return true
  }

  if( max ) {
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

const checkIsCurrent = ( current: CalendarMode, date: dayjs.Dayjs ): boolean => {
  if( current.layout === 'month' ) {
    const { month, year } = current
    const dateMonth = date.month()
    const dateYear = date.year()

    return dateMonth === month && dateYear === year
  }

  if( current.layout === 'week' ) {
    return true
  }

  return true
}

export const packageDate = ( date: Date, current: CalendarMode, disabledOptions?: CalendarDisabledOptions ): CalendarItem => {
  return {
    value: dayjs( date ).toDate(),
    meta: {
      isToday: dayjs( date ).isToday(),
      isTomorrow: dayjs( date ).isTomorrow(),
      isYesterday: dayjs( date ).isYesterday(),
      isDisabled: checkIsDisabledDate( dayjs( date ), disabledOptions || {} ),
      isCurrent: checkIsCurrent( current, dayjs( date ) )
    }
  }
}

const generateDateArray: GenerateDateArrayFn = ( current, scope, disabledOptions ) => {
  const arr: CalendarWeekList = []
  const weekCount = Math.ceil( scope.count / 7 )
  let iterationDate = dayjs( scope.startDate )

  for (let i = 0; i < weekCount; i++) {
    const weekArr: CalendarList = []
    const weekday = iterationDate.weekday()
    const iterations = weekday === 7 ? 0 : 6 - weekday
    const weekOfYear = iterationDate.week()

    for (let d = 0; d <= iterations; d++) {
      weekArr.push(
        packageDate( iterationDate.toDate(), current, disabledOptions )
      )

      iterationDate = iterationDate.add( 1, 'day' )
    }

    arr.push( {
      weekOfYear,
      days: weekArr
    } )

  }

  return arr
}

export const searchIntersections = ( taskList: CalendarTaskList ): Array<CalendarTaskItem & { intersectionCount: number, renderPriority: number }> => {
  const tasksList: Array<CalendarTaskItem & { intersectionCount?: number, renderPriority?: number }> = [...taskList]
  const period = 60


  let result: Array<CalendarTaskItem & { intersectionCount: number, renderPriority: number }> = tasksList.map( ( task, index, array ) => {
    const intersections = array.filter( ( intItem ) => {
      if( intItem.id !== task.id ) {
        const s = dayjs( intItem.time )
        const e = s.add( period, 'minute' )
        return dayjs( task.time ).isBetween( s, e, 'minute', '[]' )
          || dayjs( task.time ).add( period, 'minute' ).isBetween( s, e, 'minute', '[]' )
      }
      return false
    } )

    let priority = task.renderPriority || 1

    intersections.forEach( ( intItem ) => {
      const d = dayjs( intItem.time )
      if( d.isBefore( task.time, 'minute' ) ) {
        priority++
      } else if( d.isSame( task.time, 'minutes' ) ) {
        intItem.renderPriority = intItem.renderPriority ? intItem.renderPriority - 1 : priority + 1
      }
    } )


    return {
      ...task,
      intersectionCount: intersections.length,
      renderPriority: priority
    }

  } )

  result = result.map( ( item, index ) => {


    return item
  } )

  return result
}

export const findSlotsIntersection = ( events: CalendarTaskList ) => {

}

export const sortTask = ( initialList: CalendarTaskList ): CalendarTaskList => {
  if( !!initialList.length ) {
    initialList.sort( ( prev, cur ) => {
      if( dayjs( cur.time ).isBefore( prev.time ) ) {
        return 1
      }

      if( dayjs( cur.time ).isAfter( prev.time ) ) {
        return -1
      }

      return 0
    } )
  }

  return initialList
}

export const getPickerDates: GetPickerDatesProps = ( current, disabledOptions ) => {
  const dateScope = getDatesScope( current )
  return dateScope ? generateDateArray( current, dateScope, disabledOptions ) : []
}
