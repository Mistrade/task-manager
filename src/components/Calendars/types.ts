import dayjs from 'dayjs'
import React from 'react'

export interface DatePickerProps {

}

export type CalendarRenderOption = 'full-size' | 'input-mode'

export interface CalendarProps {
  current: CalendarCurrentData,
  renderOption: CalendarRenderOption,
  disabledOptions?: CalendarDisabledOptions
}

export interface GlobalTaskListProps {
  addTasks?: ( task?: CalendarTaskItem ) => void
}

export interface FullSizeCalendarProps extends GlobalTaskListProps {
  list: CalendarList
  renderOption: CalendarRenderOption
  current: CalendarCurrentData,
  tasksList?: CalendarTaskList
}

export interface CalendarCellProps extends GlobalTaskListProps {
  value: CalendarItem,
  renderOption?: CalendarRenderOption,
  tasks?: CalendarTaskList,
  renderTaskCount?: number
}

export interface TaskTileListProps {
  tasks?: CalendarTaskList,
  date: CalendarItem,
  onSelect?: ( data: TaskTileClickArguments ) => any
}

export interface TaskTileItemProps {
  taskInfo: CalendarTaskItem,
  date: CalendarItem,
  onSelect?: TaskTileListProps['onSelect']
}

export interface TaskTilePriorityIndicatorProps {
  priority: CalendarPriorityKeys,
  isCompleted: boolean
}

export interface TaskTileClickArguments {
  date: CalendarItem,
  taskInfo: CalendarTaskItem,
  event: React.MouseEvent<HTMLDivElement>
}

export type CalendarList = Array<CalendarItem>

export interface CalendarItem {
  value: dayjs.Dayjs,
  meta: CalendarItemMetaData
}

export interface CalendarItemMetaData {
  isToday: boolean,
  isTomorrow: boolean,
  isYesterday: boolean,
  isDisabled: boolean,
  isCurrent: boolean
}

export interface CalendarCurrentData {
  month: number,
  year: number
}

export interface CalendarDisabledOptions {
  min?: dayjs.Dayjs,
  max?: dayjs.Dayjs,
  includeMin?: boolean,
  includeMax?: boolean,
  excludeWeekends?: boolean,
  disableDates?: Array<dayjs.Dayjs>
}

export interface CalendarCellDateProps {
  selected?: boolean,
  isToday?: boolean,
}

export type CalendarPriorityKeys = 'veryLow' | 'low' | 'medium' | 'high' | 'veryHigh'

export interface CalendarTaskItem {
  id: string,
  title: string,
  description: string,
  priority: CalendarPriorityKeys,
  time: dayjs.Dayjs,
  isCompleted?: boolean
}

export type CustomObject<T = any> = { [key in string]: T }
export type PartialCustomObject<T = any> = Partial<{ [key in string]: T }>

export type TaskStorage = CustomObject<TaskYear>
export type TaskYear = CustomObject<TaskMonth>
export type TaskMonth = CustomObject<TaskDate>
export type TaskDate = CalendarTaskList


export type CalendarTaskList = Array<CalendarTaskItem>
