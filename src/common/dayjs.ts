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
import { CalendarTaskItem, CalendarTaskList } from '../components/Calendars/types'

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
