import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CalendarPriorityKeys, EventItem} from "../components/Calendars/types";

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

type ErrorTypes = 'NOT_VALID_REQUEST' | 'NOT_FOUND' | 'UNKNOWN_SERVER_ERROR' | 'UNKNOWN_USER'

interface ServerErrorType {
	message: string,
	type: ErrorTypes
}

interface ServerResponse<T> {
	data: T | null,
	error: ServerErrorType
}

interface GetTaskAtDayResult {
	events: Array<EventItem>,
	errorMessage?: string
}

export const taskApi = createApi({
	reducerPath: 'taskApi',
	tagTypes: ['Tasks'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:9090/api/events',
		credentials: 'include',
	}),
	endpoints(build) {
		return {
			getTasksAtDay: build
				.query<Array<EventItem>, GetTaskQueryProps>({
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
						if (!baseQueryReturnValue.data || baseQueryReturnValue.error) {
							return {}
						}
						
						return baseQueryReturnValue.data
					},
					providesTags: ['Tasks']
				})
		}
	}
})

export const {
	useGetTasksAtDayQuery,
	useLazyGetTasksAtDayQuery,
	useAddTaskMutation,
	useRemoveTaskMutation,
	useGetTaskSchemeQuery
} = taskApi