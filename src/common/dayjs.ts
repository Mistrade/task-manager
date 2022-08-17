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
import utc from 'dayjs/plugin/utc'
import {CalendarTaskItem, CalendarTaskList, EventItem} from '../components/Calendars/types'

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
dayjs.extend( utc )

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

export const sortTask = ( initialList: Array<EventItem> ): Array<EventItem> => {
  const list = [...initialList]

  if( !!list.length ) {
    list.sort( ( prev, cur ) => {
      if( dayjs( cur.time ).isBefore( prev.time ) ) {
        return 1
      }

      if( dayjs( cur.time ).isAfter( prev.time ) ) {
        return -1
      }

      return 0
    } )
  }

  return list
}
