import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
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
import {
	CalendarsModelType,
	CommentModel,
	FullResponseEventModel,
	ObjectId,
	ShortEventItem,
	UserModelResponse
} from "./types";
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

export interface CustomRtkError {
	data: MyServerResponse<null>,
	status: number
}

export interface MyServerResponse<T = null> {
	data?: T | null,
	info?: ServerErrorType
}

export interface EventHistoryPopulatedItem {
	date: Date,
	fieldName: keyof FullResponseEventModel,
	changeUserId: UserModelResponse,
	eventId: ObjectId,
	snapshotDescription: string,
	eventSnapshot: FullResponseEventModel,
}

export interface EventHistoryResponseItem extends Omit<EventHistoryPopulatedItem, 'eventSnapshot'> {
	eventSnapshot: FullResponseEventModel
}

export interface RequestCommentAddProps {
	message: string,
	eventId: ObjectId
}

export interface EventChainsObject {
	parentEvent: null | FullResponseEventModel,
	childrenEvents: null | Array<FullResponseEventModel>,
	linkedFromEvent: null | FullResponseEventModel
}

export const TaskApiTagTypes = ['Tasks', 'TaskInfo', 'Calendars', 'TaskScheme', 'CalendarInfo', 'TaskCount', 'ChildOfList', "EventHistory", "Comments"]

export const taskApi = createApi({
	reducerPath: 'taskApi',
	tagTypes: TaskApiTagTypes,
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseServerUrl}/events`,
		credentials: 'include',
		cache: 'no-cache',
	}) as BaseQueryFn<string | FetchArgs, unknown, CustomRtkError, {}>,
	refetchOnFocus: true,
	refetchOnReconnect: true,
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
					async onQueryStarted(args, {queryFulfilled}) {
						console.log('args', args)
						if (args) {
							await queryFulfilled
						}
					},
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
					invalidatesTags: (result, error, arg, meta) => error ? [] : ['Tasks', 'TaskScheme', 'TaskCount', "ChildOfList", "EventHistory"]
				}),
			removeTask: build
				.mutation({
					query: (arg: { id: string, remove?: boolean }) => ({
						url: '/remove',
						method: 'POST',
						body: arg
					}),
					invalidatesTags: (result, error, arg, meta) => error ? [] : ['Tasks', 'TaskScheme', 'TaskCount', 'ChildOfList', "EventHistory"]
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
			getEventHistory: build.query<MyServerResponse<Array<EventHistoryResponseItem>>, string>({
				query: (taskId) => ({
					url: `/getEventHistory/${taskId}`,
					method: "GET"
				}),
				providesTags: ["EventHistory"]
			}),
			getEventChains: build
				.query<MyServerResponse<EventChainsObject>, string>({
					query: (taskId) => ({
						url: `/getEventChains/${taskId}`,
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
						return ['TaskInfo', 'Tasks', 'TaskCount', 'TaskScheme', 'ChildOfList', "EventHistory"]
					}
					
					if (arg.field === 'status') {
						return ['TaskInfo', 'TaskCount', 'Tasks', 'ChildOfList', "EventHistory"]
					}
					
					return ['TaskInfo', 'Tasks', 'ChildOfList', "EventHistory"]
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
			}),
			addComment: build.mutation<MyServerResponse<null>, RequestCommentAddProps>({
				query: (commentInfo) => ({
					url: "/comments/add",
					method: "POST",
					body: commentInfo,
				}),
				invalidatesTags: (result, error, arg, meta) => error ? [] : ["Comments"]
			}),
			getCommentsList: build.query<MyServerResponse<Array<CommentModel>>, ObjectId>({
				query: (taskId) => ({
					url: `/comments/${taskId}`,
					method: "GET",
				}),
				providesTags: ["Comments"]
			}),
			removeComment: build.mutation<MyServerResponse<null>, ObjectId>({
				query: (commentId) => ({
					url: `/comments/remove`,
					method: "POST",
					body: {
						commentId,
					}
				}),
				invalidatesTags: (result, error, arg, meta) => error ? [] : ["Comments"]
			}),
			refetchAllTaskApi: build.mutation({
				queryFn: () => ({data: null}),
				invalidatesTags: TaskApiTagTypes
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
	useGetEventChainsQuery,
	useGetEventHistoryQuery,
	useRefetchAllTaskApiMutation,
	useAddCommentMutation,
	useGetCommentsListQuery,
	useRemoveCommentMutation
} = taskApi