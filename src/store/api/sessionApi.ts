import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RegistrationFormType} from "../../components/Session/Registration";
import {MyServerResponse} from "./taskApi/taskApi";
import {AuthorizationProps} from "../../components/Session/AuthorizationForm";
import {baseServerUrl} from "./defaultApiConfig";
import {ShortUserModel, UserModelResponse} from "./taskApi/types";

export const sessionApi = createApi({
	reducerPath: 'sessionApi',
	tagTypes: ['Session'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseServerUrl}/session`,
		credentials: 'include',
		cache: 'no-cache'
	}),
	endpoints: (build) => ({
		registration: build.mutation<MyServerResponse, RegistrationFormType>({
			query: (args) => ({
				url: '/reg',
				method: 'POST',
				body: args,
			}),
		}),
		login: build.mutation<MyServerResponse, AuthorizationProps>({
			query: (args) => ({
				url: '/auth',
				method: 'POST',
				body: args
			}),
			invalidatesTags: ['Session']
		}),
		confirmSession: build.query<MyServerResponse<UserModelResponse>, void>({
			query: (args: void) => ({
				url: '/confirm',
				method: "POST",
				credentials: 'include'
			}),
			providesTags: ['Session']
		}),
		logout: build.mutation<MyServerResponse, void>({
			query: (args: void) => ({
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