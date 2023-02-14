import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {
	CalendarMode,
	CalendarPriorityKeys,
	CalendarTaskItem,
	EventItem,
	TaskStorageType
} from "../../../components/Calendars/types";
import {baseServerUrl} from "../defaultApiConfig";
import {FilterTaskStatuses} from "../../../components/Calendars/Modes/DayCalendar/EventFilter";
import {CalendarNameItem} from "../../../components/Calendars/CalendarList/CalendarNameListItem";
import {CalendarsModelType, FullResponseEventModel, ObjectId, ShortEventItem} from "./types";
import {CreateCalendarFormData} from "../../../components/Calendars/CalendarModals/CreateCalendar";
import {SwitcherBadges} from "../../../components/Switcher/Switcher";

interface GetTaskQueryProps {
	limit?: number,
	fromDate: string,
	toDate: string,
	title: string | null,
	priority: CalendarPriorityKeys | null,
	taskStatus: FilterTaskStatuses,
	onlyFavorites?: boolean,
	layout?: CalendarMode['layout'],
	utcOffset: number
}

export type GetTaskSchemeRequest = Pick<GetTaskQueryProps, 'fromDate' | 'toDate'>

export type GetTaskSchemeResponse = {
	[key: string]: boolean | undefined
}

export type ErrorTypes = 'info' | 'success' | 'warning' | 'error' | 'default'

interface ServerErrorType {
	message: string,
	type: ErrorTypes
}

export interface MyServerResponse<T = null> {
	data?: T | null,
	info?: ServerErrorType
}

export const taskApi = createApi({
	reducerPath: 'taskApi',
	tagTypes: ['Tasks', 'TaskInfo', 'Calendars', 'TaskScheme', 'CalendarInfo', 'TaskCount', 'ChildOfList'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseServerUrl}/events`,
		credentials: 'include',
		cache: 'no-cache'
	}),
	endpoints(build) {
		return {
			hasTasksInCalendar: build.query<MyServerResponse<number>, { id: string }>({
				query: ({id}) => ({
					url: `/calendar/hasTasks/${id}`,
					method: 'GET',
				})
			}),
			deleteCalendar: build.mutation<MyServerResponse, { id: string }>({
				query: (args) => ({
					url: '/calendars/remove',
					body: args,
					method: 'POST',
				}),
				invalidatesTags: (result, error, arg, meta) => error ? [] : ['Calendars', 'Tasks', 'TaskScheme', 'TaskCount']
			}),
			createCalendar: build.mutation<MyServerResponse<null>, CreateCalendarFormData>({
				query: (args) => ({
					url: '/calendars/create',
					method: 'POST',
					body: args
				}),
				invalidatesTags: ['Calendars']
			}),
			getCalendars: build.query<MyServerResponse<Array<CalendarNameItem>>, { exclude?: Array<CalendarsModelType> }>({
				query: (args) => ({
					url: '/calendars',
					method: 'POST',
					body: args
				}),
				providesTags: ['Calendars']
			}),
			changeSelectCalendar: build.mutation<MyServerResponse, { id: string, state: boolean }>({
				query: (args) => ({
					url: '/calendars/changeSelect',
					method: 'POST',
					body: args
				}),
				invalidatesTags: (result, error, arg, meta) => error ? [] : ['Tasks', 'Calendars', 'TaskCount']
			}),
			getTaskInfo: build
			.query<MyServerResponse<FullResponseEventModel>, string>({
				query: (id: string) => ({
					url: `/taskInfo/${id}`,
					method: 'GET',
					cache: 'no-store'
				}),
				providesTags: ['TaskInfo'],
				// invalidatesTags: ['ChildOfList']
			}),
			getTasksAtDay: build
			.query<Array<ShortEventItem>, GetTaskQueryProps>({
				query: (props) => ({
					url: `/getTaskAtDay`,
					method: 'POST',
					body: props,
				}),
				providesTags: ['Tasks'],
			}),
			getTasksAtScope: build
			.query<TaskStorageType<ShortEventItem>, GetTaskQueryProps>({
				query: (props) => ({
					url: `/getTaskAtScope`,
					method: 'POST',
					body: props,
				}),
				providesTags: ['Tasks'],
			}),
			addTask: build
			.mutation<MyServerResponse<{ taskId: ObjectId }>, CalendarTaskItem>({
				query: (body) => ({
					url: `/add`,
					method: "POST",
					body
				}),
				invalidatesTags: (result, error, arg, meta) => error ? [] : ['Tasks', 'TaskScheme', 'TaskCount']
			}),
			removeTask: build
			.mutation({
				query: (arg: { id: string, remove?: boolean }) => ({
					url: '/remove',
					method: 'POST',
					body: arg
				}),
				invalidatesTags: (result, error, arg, meta) => error ? [] : ['Tasks', 'TaskScheme', 'TaskCount']
			}),
			getTaskScheme: build
			.query<GetTaskSchemeResponse, GetTaskSchemeRequest>({
				query: (args) => ({
					url: '/getTasksScheme',
					method: 'POST',
					body: args,
				}),
				transformResponse: (baseQueryReturnValue: MyServerResponse<GetTaskSchemeResponse>, meta, arg): GetTaskSchemeResponse => {
					if (!baseQueryReturnValue.data || baseQueryReturnValue?.info?.type === 'error') {
						return {}
					}
					
					return baseQueryReturnValue.data || {}
				},
				providesTags: ['TaskScheme']
			}),
			getChildOfList: build
			.query<MyServerResponse<Array<FullResponseEventModel>>, string>({
				query: (taskId) => ({
					url: `/getChildOfList/${taskId}`,
					method: 'GET',
					cache: 'no-cache'
				}),
				providesTags: ['ChildOfList']
			}),
			updateTask: build.mutation<MyServerResponse<null>, { id: string, field: keyof EventItem, data: any }>({
				query: (args) => ({
					url: '/taskInfo/update',
					method: 'POST',
					body: args,
				}),
				invalidatesTags: (result, error, arg, meta) => {
					if (result?.info?.type !== 'success' || error) {
						return []
					}
					
					if (arg.field === 'time' || arg.field === 'timeEnd' || arg.field === 'calendar') {
						return ['TaskInfo', 'Tasks', 'TaskCount', 'TaskScheme', 'ChildOfList']
					}
					
					if (arg.field === 'status') {
						return ['TaskInfo', 'TaskCount', 'Tasks', 'ChildOfList']
					}
					
					return ['TaskInfo', 'Tasks', 'ChildOfList']
				}
			}),
			getTaskCountOfStatus: build.query<SwitcherBadges<FilterTaskStatuses>, Omit<GetTaskQueryProps, 'taskStatus'>>({
				query: (args) => ({
					url: '/getTaskCountOfStatus',
					method: 'POST',
					body: args
				}),
				providesTags: ['TaskCount']
			}),
			getCalendarInfo: build.query<MyServerResponse<CalendarNameItem>, string>({
				query: (calendarId) => ({
					url: `/calendars/info/${calendarId}`,
					method: 'GET',
					cache: 'reload'
				}),
			}),
			updateCalendarInfo: build.mutation<MyServerResponse<null>, CreateCalendarFormData>({
				query: (args) => ({
					url: '/calendars/update',
					method: 'POST',
					body: args
				}),
				invalidatesTags: (result, error, arg, meta) => error ? [] : ['Calendars', 'Tasks']
			})
		}
	}
})


export const {
	useGetTasksAtDayQuery,
	useLazyGetTasksAtDayQuery,
	useAddTaskMutation,
	useRemoveTaskMutation,
	useGetTaskSchemeQuery,
	useLazyGetTaskInfoQuery,
	useUpdateTaskMutation,
	useGetCalendarsQuery,
	useGetTaskInfoQuery,
	useChangeSelectCalendarMutation,
	useCreateCalendarMutation,
	useHasTasksInCalendarQuery,
	useDeleteCalendarMutation,
	useLazyGetCalendarsQuery,
	useGetTasksAtScopeQuery,
	useGetTaskCountOfStatusQuery,
	useGetCalendarInfoQuery,
	useUpdateCalendarInfoMutation,
	useGetChildOfListQuery
} = taskApi