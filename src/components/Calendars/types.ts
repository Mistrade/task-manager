import React from 'react'

export interface DatePickerProps {

}

export interface CalendarProps {
  current: CalendarCurrentData,
  disabledOptions?: CalendarDisabledOptions
}

export interface GlobalTaskListProps {
  onAddTask?: ( date: CalendarItem ) => void
}

export interface FullSizeCalendarProps extends GlobalTaskListProps {
  list: CalendarList
  current: CalendarCurrentData,
  tasksList?: CalendarTaskList
  onSelectTask?: ( data: TaskTileClickArguments ) => any
}

export interface CalendarCellProps extends GlobalTaskListProps {
  value: CalendarItem,
  tasks?: CalendarTaskList,
  renderTaskCount?: number
  onSelectTask?: ( data: TaskTileClickArguments ) => any
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
  value: Date,
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
  min?: Date,
  max?: Date,
  includeMin?: boolean,
  includeMax?: boolean,
  excludeWeekends?: boolean,
  disableDates?: Array<Date>
}

export interface CalendarCellDateProps {
  selected?: boolean,
  isToday?: boolean,
}

export type CalendarPriorityKeys = 'veryLow' | 'low' | 'medium' | 'high' | 'veryHigh'

export type UUID = string

export interface CalendarTaskItem {
  id: UUID,
  createdAt: Date,
  linkedFrom?: UUID,
  title: string,
  description: string,
  priority: CalendarPriorityKeys,
  time: Date,
  isCompleted?: boolean,
  members: TaskMembersListType
}


export type SocialNetworkKeys = 'vk' | 'instagram' | 'facebook' | 'whatsApp' | 'viber' | 'telegram'
export type TaskMemberSocialNetworkItem = {
  networkName: SocialNetworkKeys,
  link: string,
}
export type GenderKeys = 'man' | 'woman'
export type TaskMemberItemType = {
  id: UUID,
  name: string,
  surname: string,
  gender: GenderKeys,
  patronymic?: string,
  phoneNumber?: string,
  email?: string,
  socialNetworks: Array<TaskMemberSocialNetworkItem>
}
export type TaskMembersListType = Array<TaskMemberItemType>


export type CustomObject<T = any> = { [key in string]: T }
export type PartialCustomObject<T = any> = Partial<{ [key in string]: T }>

export type TaskStorage = CustomObject<TaskYear>
export type TaskYear = CustomObject<TaskMonth>
export type TaskMonth = CustomObject<TaskDate>
export type TaskDate = CalendarTaskList

export type CalendarTaskList = Array<CalendarTaskItem>

export type SelectTaskItem = Omit<TaskTileClickArguments, 'event'>

export interface TaskInformerProps {
  taskItem: SelectTaskItem | null
}

export type TaskInformerMainProps = {
  taskItem: SelectTaskItem
}

export interface TaskInfoModalProps {
  selectedTask: SelectTaskItem | null,
  onClose: () => void
}

export interface AddTaskModalProps {
  date: CalendarItem | null,
  onClose?: () => void,
  onComplete?: () => void
}
