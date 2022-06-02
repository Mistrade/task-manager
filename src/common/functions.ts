import {
  CalendarItem, CalendarTaskList,
  SelectTaskItem,
  TaskStorage,
  TaskTileClickArguments
} from '../components/Calendars/types'
import dayjs from 'dayjs'

export const addNull = ( value: number ): string => value < 10 ? `0${value}` : value.toString()

export const generateTaskInformerObject = ( taskItem: TaskTileClickArguments ) => {
  const { taskInfo, date, event } = taskItem

}

export const checkTaskStatus = ( taskItem: SelectTaskItem ): string => {
  if( taskItem.taskInfo.isCompleted ) {
    return 'Завершено'
  }

  if( dayjs( taskItem.taskInfo.time ).isBefore( dayjs(), 'minute' ) ) {
    return 'Просрочено'
  }

  if( dayjs( taskItem.taskInfo.time ).isAfter( dayjs(), 'minute' ) ) {
    return 'В работе'
  }

  return 'В работе'
}

export const getTaskListOfDay = ( day: CalendarItem, storage: TaskStorage ): CalendarTaskList => {
  const y = storage[ dayjs( day.value ).year() ] || {}
  const m = y[ dayjs( day.value ).month() ] || {}
  const d = m[ dayjs( day.value ).date() ] || []

  return d
}
