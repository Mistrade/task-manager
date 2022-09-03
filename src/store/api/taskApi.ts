import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CalendarPriorityKeys, EventItem} from "../../components/Calendars/types";

interface GetTaskQueryProps {
	limit?: number,
	fromDate: string,
	toDate: string,
	title: string | null,
	priority: CalendarPriorityKeys | null
}

export type GetTaskSchemeRequest = Pick<GetTaskQueryProps, 'fromDate' | 'toDate'>

export type GetTaskSchemeResponse = {
	[key: string]: boolean | undefined
}

type ErrorTypes = 'info' | 'success' | 'warning' | 'error' | 'default'

interface ServerErrorType {
	message: string,
	type: ErrorTypes
}

export interface ServerResponse<T = null> {
	data?: T | null,
	info?: ServerErrorType
}

interface GetTaskAtDayResult {
	events: Array<EventItem>,
	errorMessage?: string
}

export type ShortEventItem = Pick<EventItem, 'title' | 'time' | 'timeEnd' | 'link' | 'id' | 'priority' | 'description' | 'status'>

export const taskApi = createApi({
	reducerPath: 'taskApi',
	tagTypes: ['Tasks', 'TaskInfo'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:9090/api/events',
		credentials: 'include',
		cache: 'no-cache'
	}),
	endpoints(build) {
		return {
			getTaskInfo: build
				.query<ServerResponse<EventItem>, string>({
					query: (id: string) => ({
						url: `/taskInfo/${id}`,
						method: 'GET'
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
					providesTags: ['Tasks'],
				}),
			addTask: build
				.mutation({
					query: (body) => ({
						url: `/add`,
						method: "POST",
						body
					}),
					invalidatesTags: ['Tasks']
				}),
			removeTask: build
				.mutation({
					query: (arg: { id: string }) => ({
						url: '/remove',
						method: 'POST',
						body: arg
					}),
					invalidatesTags: ['Tasks']
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
					providesTags: ['Tasks']
				}),
		}
	}
})

export const {
	useGetTasksAtDayQuery,
	useLazyGetTasksAtDayQuery,
	useAddTaskMutation,
	useRemoveTaskMutation,
	useGetTaskSchemeQuery,
	useLazyGetTaskInfoQuery
} = taskApi