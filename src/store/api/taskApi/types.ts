import {
	CalendarPriorityKeys,
	EventHistoryFields,
	EventLinkItem,
	TaskStatusesType,
	UserModel
} from "../../../components/Calendars/types";


export type CalendarsModelType = 'Invite' | 'Custom' | 'Main'
export type ObjectId = string
export type UtcDate = string

export interface UserModelResponse extends Omit<UserModel, 'password' | 'lastUpdate' | 'created'> {
	lastUpdate: UtcDate,
	created: UtcDate,
}

export interface EventHistoryResponse {
	date: UtcDate,
	field: keyof EventHistoryFields,
	description: string,
	userId: UserModelResponse,
	oldValue: string,
	newValue: string,
}

export interface CalendarResponse {
	_id: ObjectId,
	userId: UserModelResponse,
	created: UtcDate,
	isSelected: boolean,
	title: string,
	editable: boolean,
	color: string,
	deletable: boolean,
	type: CalendarsModelType
}

export interface FullResponseEventModel {
	id: ObjectId,
	createdAt: UtcDate,
	description: string,
	link: EventLinkItem | null,
	linkedFrom?: ObjectId,
	members: Array<UserModelResponse>,
	priority: CalendarPriorityKeys,
	status: TaskStatusesType,
	time: UtcDate,
	timeEnd: UtcDate,
	title: string,
	type: string,
	userId: UserModelResponse,
	lastChange: UtcDate,
	history: Array<EventHistoryResponse>,
	calendar: CalendarResponse
}

export type ShortEventItem = Pick<FullResponseEventModel, 'title' | 'time' | 'timeEnd' | 'link' | 'id' | 'priority' | 'description' | 'status' | 'calendar'>
