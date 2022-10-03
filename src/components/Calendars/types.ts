import React, {FC, ReactNode} from 'react'
import {ShortChangeCurrentPattern} from '../../common/commonTypes'
import {FlexBlockProps} from '../LayoutComponents/FlexBlock'
import {DefaultTextInputProps} from '../Input/TextInput/TextInput'
import {GetTaskSchemeResponse} from "../../store/api/taskApi/taskApi";
import {FullResponseEventModel} from "../../store/api/taskApi/types";

export type FCWithChildren<T = any> = FC<{ children?: ReactNode } & T>

export interface DatePickerProps {
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
	onChange?: (date: Date) => void,
	currentDate: Date,
	label?: ReactNode,
	containerProps?: FlexBlockProps,
	isDirty?: boolean,
	errorMessage?: string,
	icon?: ReactNode,
	actionHandler?: DefaultTextInputProps['actionHandler'],
	actions?: DefaultTextInputProps['actions']
	iconPlacement?: DefaultTextInputProps['iconPlacement'],
	disabledOptions?: CalendarDisabledOptions
}

export interface CalendarProps {
	layout: CalendarMode['layout'],
	disabledOptions?: CalendarDisabledOptions,
	renderWeekPattern?: RenderWeekPattern,
}

export interface GlobalTaskListProps {
	onAddTask?: OnAddTaskFnType,
	renderTaskCount?: RenderTaskCountType
}

export interface YearCalendarProps {
	yearItem: YearItem,
	onChangeCurrent?: OnChangeCurrentFnType
}

export interface MonthCalendarProps extends GlobalTaskListProps {
	onChangeCurrent?: OnChangeCurrentFnType
	monthItem: MonthItem,
	current: CalendarMode,
	onSelectTask?: OnSelectTaskFnType,
	renderWeekPattern?: RenderWeekPattern,
}

export interface WeekCalendarProps extends Omit<MonthCalendarProps, 'monthItem' | 'renderWeekPattern'> {
	weekItem: WeekItem
}

export interface DayCalendarProps extends GlobalTaskListProps {
	dateItem: DateItem,
	onSelectTask?: OnSelectTaskFnType,
}

export type CalendarHeaderProps = Pick<MonthCalendarProps, 'renderWeekPattern'>
export type CalendarHeaderWeekListProps = Pick<MonthCalendarProps, 'renderWeekPattern' | 'current'>
export type RenderTaskCountType = number | 'all'

export interface CalendarCellProps extends GlobalTaskListProps {
	value: CalendarItem,
	tasks?: Array<EventItem>,
	onSelectTask?: OnSelectTaskFnType,
	onClickToDate?: (date: CalendarItem) => void
}

export interface TaskTileListProps extends GlobalTaskListProps {
	tasks?: Array<EventItem>,
	date: CalendarItem,
	onSelect?: OnSelectTaskFnType,
}

export interface TaskTileItemProps {
	taskInfo: EventItem,
	date: CalendarItem,
	onSelect?: TaskTileListProps['onSelect']
}

export interface TaskTilePriorityIndicatorProps {
	priority: CalendarPriorityKeys,
	isCompleted: boolean
}

export interface CalendarHeaderSwitchersProps {
	layout?: CalendarMode['layout']
	onChange: (newLayout: CalendarMode['layout']) => void
}

export interface CalendarTodaySwitchersProps {
	onChange: (pattern: ShortChangeCurrentPattern) => void
}

export type OnSelectDateFromCalendarFn = (data: CalendarItem) => void

export interface DaySettingsPanelProps {
	monthItem: MonthItem
	onSelectDate?: OnSelectDateFromCalendarFn,
	current: CalendarMode
}

export interface SmallCalendarDayItemProps {
	onSelectDate?: (date: CalendarItem) => void,
	date: CalendarItem,
	weekIndex: number,
	currentDate?: Date,
	includesTasks?: GetTaskSchemeResponse,
}

export interface SmallMonthCalendarWeekItemProps {
	monthItem: MonthItem,
	onSelectDate?: (date: CalendarItem) => void,
	currentDate?: Date
	includesTasks?: GetTaskSchemeResponse,
	pourWeeks?: Array<number>
}

export interface SmallCalendarMonthTitleProps {
	monthItem: MonthItem,
	onClick?: (monthItem: MonthItem) => void,
	renderYear?: boolean
}

export type RenderWeekPattern = 'short' | 'full' | 'none'

export interface TaskTileClickArguments {
	date: CalendarItem,
	taskInfo: EventItem,
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

export type CalendarPriorityKeys =
	'veryLow'
	| 'low'
	| 'medium'
	| 'high'
	| 'veryHigh'
	| 'not_selected'

export type UUID = string
export type TaskStatusesType = 'completed' | 'created' | 'in_progress' | 'review'

export interface CalendarTaskItem {
	id: UUID,
	type: 'event',
	createdAt: string,
	linkedFrom?: UUID,
	title: string,
	description: string,
	priority: CalendarPriorityKeys,
	time: Date,
	timeEnd: Date,
	status: TaskStatusesType,
	members: TaskMembersListType,
	link: EventLinkItem | null,
	calendar: string
}

export type CalendarPriorityList = Array<{ type: CalendarPriorityKeys, title: string }>

export interface EventLinkItem {
	key: string,
	value: string
}

export type EventItem = Omit<CalendarTaskItem, 'time' | 'timeEnd'> & {
	time: string,
	timeEnd: string,
	lastChange: string,
	history: Array<EventHistoryItem>
}

export type EventHistoryFields = Omit<EventItem, '_id' | 'linkedFrom' | 'userId' | 'lastChange' | 'history'>

export interface EventHistoryItem<T extends keyof EventHistoryFields = keyof EventHistoryFields> {
	date: string,
	field: T,
	description: string,
	userId: UserModel,
	oldValue: EventHistoryFields[T],
	newValue: EventHistoryFields[T]
}

export interface UserModel {
	_id: string,
	email?: string,
	phone: string,
	name: string,
	surname: string,
	patronymic?: string,
	created: string,
	lastUpdate?: string,
	password: string
}


export interface SelectBooleanInputDataItem {
	value: boolean,
	title: string,
	icon?: ReactNode,
	isDisabled?: boolean,
}

export interface TaskStatusInfo extends SelectBooleanInputDataItem {
	key: TaskStatusesType
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
export type TaskDate = Array<EventItem>

export interface TaskSetResult {
	status: boolean,
	storage: TaskStorage
}

export type CalendarTaskList = Array<CalendarTaskItem>

export type SelectTaskItem = Omit<TaskTileClickArguments, 'event'>

export interface TaskInformerProps {
	taskItem: FullResponseEventModel | null
}

export interface UsageTaskItemBaseProps {
	taskItem: FullResponseEventModel
}

export type TaskInformerMainProps = UsageTaskItemBaseProps

export interface TaskInfoModalProps {
	onClose: () => void
}

export interface AddTaskModalProps {
	date: Date | null,
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

export interface DateItem {
	current: CalendarCurrentDay,
	settingPanel: DateSettingPanelOptions
}

export interface DateSettingPanelOptions {
	monthItem: MonthItem,
	monthCurrent: CalendarCurrentMonth
}


export type OnCloseTaskInfoFnType = () => void
export type OnAddTaskFnType = (date: Date) => void
export type OnChangeCurrentFnType = (date: Date, layout: CalendarMode['layout']) => void
export type OnSelectTaskFnType = (taskId: string) => any
export type AddTaskDateType = CalendarItem | null
export type SelectedTaskType = SelectTaskItem | null
