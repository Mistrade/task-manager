import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RegistrationFormType} from "../../components/Session/Registration";
import {ServerResponse} from "./taskApi/taskApi";
import {AuthorizationProps} from "../../components/Session/AuthorizationForm";
import {baseServerUrl} from "./defaultApiConfig";

export const sessionApi = createApi({
	reducerPath: 'sessionApi',
	tagTypes: ['Session'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseServerUrl}/session`,
		credentials: 'include',
		cache: 'no-cache'
	}),
	endpoints: (build) => ({
		registration: build.mutation<ServerResponse, RegistrationFormType>({
			query: (args) => ({
				url: '/reg',
				method: 'POST',
				body: args,
			}),
		}),
		login: build.mutation<ServerResponse, AuthorizationProps>({
			query: (args) => ({
				url: '/auth',
				method: 'POST',
				body: args
			}),
			invalidatesTags: ['Session']
		}),
		confirmSession: build.query({
			query: (args: void) => ({
				url: '/confirm',
				method: "POST",
				credentials: 'include'
			}),
			providesTags: ['Session']
		}),
		logout: build.mutation<ServerResponse, void>({
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