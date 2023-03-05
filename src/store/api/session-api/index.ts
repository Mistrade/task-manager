import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {baseServerUrl} from "../config";
import {AuthUserRequestProps, RegUserRequestProps, UserModel} from "./session-api.types";
import {MyServerResponse} from "../rtk-api.types";

export const sessionApi = createApi({
	reducerPath: 'sessionApi',
	tagTypes: ['Session'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseServerUrl}/session`,
		credentials: 'include',
		cache: 'no-cache'
	}),
	endpoints: (build) => ({
		registration: build.mutation<MyServerResponse, RegUserRequestProps>({
			query: (args) => ({
				url: '/reg',
				method: 'POST',
				body: args,
			}),
		}),
		login: build.mutation<MyServerResponse, AuthUserRequestProps>({
			query: (args) => ({
				url: '/auth',
				method: 'POST',
				body: args
			}),
			invalidatesTags: ['Session']
		}),
		confirmSession: build.query<MyServerResponse<UserModel>, void>({
			query: () => ({
				url: '/confirm',
				method: "POST",
				credentials: 'include'
			}),
			providesTags: ['Session']
		}),
		logout: build.mutation<MyServerResponse, void>({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),
			invalidatesTags: ['Session']
		})
	})
})

export const {
	useConfirmSessionQuery,
	useLoginMutation,
	useRegistrationMutation,
	useLogoutMutation
} = sessionApi