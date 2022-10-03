import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CalendarPriorityKeys, EventItem} from "../../../components/Calendars/types";
import {baseServerUrl} from "../defaultApiConfig";
import {FilterTaskStatuses} from "../../../components/Calendars/DayCalendar/EventFilter";
import {CalendarNameItem} from "../../../components/Calendars/CalendarList/CalendarNameListItem";
import {CalendarsModelType, FullResponseEventModel, ShortEventItem} from "./types";
import {CreateCalendarFormData} from "../../../components/Calendars/CalendarModals/CreateCalendar";

interface GetTaskQueryProps {
	limit?: number,
	fromDate: string,
	toDate: string,
	title: string | null,
	priority: CalendarPriorityKeys | null,
	taskStatus: FilterTaskStatuses
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

export interface ServerResponse<T = null> {
	data?: T | null,
	info?: ServerErrorType
}

export const taskApi = createApi({
	reducerPath: 'taskApi',
	tagTypes: ['Tasks', 'TaskInfo', 'Calendars', 'TaskScheme'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseServerUrl}/events`,
		credentials: 'include',
		cache: 'no-cache'
	}),
	endpoints(build) {
		return {
			hasTasksInCalendar: build.query<ServerResponse<number>, { id: string }>({
				query: ({id}) => ({
					url: `/calendar/hasTasks/${id}`,
					method: 'GET',
				})
			}),
			deleteCalendar: build.mutation<ServerResponse, { id: string, moveTo: string }>({
				query: (args) => ({
					url: '/calendars/remove',
					body: args,
					method: 'POST',
				}),
				invalidatesTags: ['Calendars']
			}),
			createCalendar: build.mutation<ServerResponse<null>, CreateCalendarFormData>({
				query: (args) => ({
					url: '/calendars/create',
					method: 'POST',
					body: args
				}),
				invalidatesTags: ['Calendars']
			}),
			getCalendars: build.query<ServerResponse<Array<CalendarNameItem>>, { exclude?: Array<CalendarsModelType> }>({
				query: (args) => ({
					url: '/calendars',
					method: 'POST',
					body: args
				}),
				providesTags: ['Calendars']
			}),
			changeSelectCalendar: build.mutation<ServerResponse, { id: string, state: boolean }>({
				query: (args) => ({
					url: '/calendars/changeSelect',
					method: 'POST',
					body: args
				}),
				invalidatesTags: ['Tasks']
			}),
			getTaskInfo: build
				.query<ServerResponse<FullResponseEventModel>, string>({
					query: (id: string) => ({
						url: `/taskInfo/${id}`,
						method: 'GET',
						cache: 'no-store'
					}),
					providesTags: ['TaskInfo']
				}),
			getTasksAtDay: build
				.query<Array<ShortEventItem>, GetTaskQueryProps>({
					query: (props) => ({
						url: `/getTaskAtDay`,
						method: 'POST',
						body: props,
					}),
					providesTags: ['Tasks', 'TaskInfo'],
				}),
			addTask: build
				.mutation({
					query: (body) => ({
						url: `/add`,
						method: "POST",
						body
					}),
					invalidatesTags: ['Tasks', 'TaskScheme']
				}),
			removeTask: build
				.mutation({
					query: (arg: { id: string }) => ({
						url: '/remove',
						method: 'POST',
						body: arg
					}),
					invalidatesTags: ['Tasks', 'TaskScheme']
				}),
			getTaskScheme: build
				.query<GetTaskSchemeResponse, GetTaskSchemeRequest>({
					query: (args) => ({
						url: '/getTasksScheme',
						method: 'POST',
						body: args,
					}),
					transformResponse: (baseQueryReturnValue: ServerResponse<GetTaskSchemeResponse>, meta, arg): GetTaskSchemeResponse => {
						if (!baseQueryReturnValue.data || baseQueryReturnValue?.info?.type === 'error') {
							return {}
						}
						
						return baseQueryReturnValue.data || {}
					},
					providesTags: ['TaskScheme', 'TaskInfo']
				}),
			updateTask: build.mutation<ServerResponse<null>, { id: string, field: keyof EventItem, data: any }>({
				query: (args) => ({
					url: '/taskInfo/update',
					method: 'POST',
					body: args,
				}),
				invalidatesTags: ['TaskInfo', 'TaskScheme']
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
	useChangeSelectCalendarMutation,
	useCreateCalendarMutation,
	useHasTasksInCalendarQuery,
	useDeleteCalendarMutation,
	useLazyGetCalendarsQuery
} = taskApi