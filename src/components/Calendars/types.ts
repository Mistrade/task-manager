import React from 'react'

export interface DatePickerProps {

}

export interface CalendarProps {
  initialCurrent: CalendarMode,
  disabledOptions?: CalendarDisabledOptions,
  renderWeekPattern?: RenderWeekPattern
}

export interface GlobalTaskListProps {
  onAddTask?: OnAddTaskFnType,
  renderTaskCount?: RenderTaskCountType
}

export interface YearCalendarProps {
  yearItem: YearItem,
  taskStorage?: TaskStorage,
  current: CalendarCurrentYear,
  onChangeCurrent?: OnChangeCurrentFnType
}

export interface MonthCalendarProps extends GlobalTaskListProps {
  onChangeCurrent?: OnChangeCurrentFnType
  monthItem: MonthItem,
  current: CalendarMode,
  onSelectTask?: ( data: TaskTileClickArguments ) => any,
  renderWeekPattern?: RenderWeekPattern,
  taskStorage?: TaskStorage
}

export interface WeekCalendarProps extends Omit<MonthCalendarProps, 'monthItem' | 'renderWeekPattern'> {
  weekItem: WeekItem
}

export interface DayCalendarProps extends GlobalTaskListProps {
  onChangeCurrent?: OnChangeCurrentFnType,
  current: CalendarCurrentDay,
  onSelectTask?: ( data: TaskTileClickArguments ) => any,
  renderWeekPattern?: RenderWeekPattern,
  taskStorage?: TaskStorage
}

export type CalendarBodyTitleProps = Pick<MonthCalendarProps, 'current' | 'onChangeCurrent' | 'renderWeekPattern'>
export type WeekListProps = Pick<MonthCalendarProps, 'renderWeekPattern' | 'current'>
export type RenderTaskCountType = number | 'all'

export interface CalendarCellProps extends GlobalTaskListProps {
  value: CalendarItem,
  tasks?: CalendarTaskList,
  onSelectTask?: ( data: TaskTileClickArguments ) => any,
  onClickToDate?: ( date: CalendarItem ) => void
}

export interface TaskTileListProps extends GlobalTaskListProps {
  tasks?: CalendarTaskList,
  date: CalendarItem,
  onSelect?: ( data: TaskTileClickArguments ) => any,
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

export type RenderWeekPattern = 'short' | 'full' | 'none'

export interface TaskTileClickArguments {
  date: CalendarItem,
  taskInfo: CalendarTaskItem,
  event?: React.MouseEvent<HTMLDivElement>
}

export type CalendarList = Array<CalendarItem>
export type CalendarWeekList = Array<WeekItem>
export type WeekItem = {
  weekOfYear: number,
  month: number,
  year: number,
  days: Array<CalendarItem>
}

export type MonthItem = {
  monthOfYear: number,
  year: number,
  weeks: Array<WeekItem>
}

export type CalendarCurrentContext = {
  year: number,
  month: number,
  week?: number
}

export type YearItem = {
  year: number,
  months: Array<MonthItem>
}

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
  timeEnd: Date,
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

export interface CalendarCurrentYear {
  layout: 'year',
  year: number
}

export interface CalendarCurrentMonth {
  layout: 'month',
  month: number,
  year: number,
}

export interface CalendarCurrentWeek {
  layout: 'week',
  aroundDate: Date,
}

export interface CalendarCurrentDay {
  layout: 'day',
  date: Date,
}

export type CalendarMode =
  CalendarCurrentYear
  | CalendarCurrentMonth
  | CalendarCurrentWeek
  | CalendarCurrentDay

export type OnAddTaskFnType = ( date: CalendarItem ) => void
export type OnChangeCurrentFnType = ( date: Date, layout: CalendarMode['layout'] ) => void
export type OnSelectTaskFnType = ( data: TaskTileClickArguments ) => any
export type AddTaskDateType = CalendarItem | null
export type SelectedTaskType = SelectTaskItem | null
