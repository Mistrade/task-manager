import { baseServerUrl } from '../config';
import { MyServerResponse } from '../rtk-api.types';
import {
  AuthUserRequestProps,
  RegUserRequestProps,
  UserModel,
} from './session-api.types';
import { contactsApi } from '@api/friends-api';
import { planningApi } from '@api/planning-api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';


export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  tagTypes: ['Session'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseServerUrl}/session`,
    credentials: 'include',
    cache: 'no-cache',
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
        body: args,
      }),
      invalidatesTags: ['Session'],
    }),
    confirmSession: build.query<MyServerResponse<UserModel>, void>({
      query: () => ({
        method: 'POST',
        credentials: 'include',
        url: '/confirm',
      }),
      providesTags: ['Session'],
    }),
    logout: build.mutation<MyServerResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log('1243214124281684521974512468210568');
        queryFulfilled.then((data) => {
          dispatch(
            sessionApi.util.updateQueryData(
              'confirmSession',
              undefined,
              (draft) => {
                Object.assign(draft, {
                  data: null,
                  info: {
                    type: 'success',
                    message: 'Сессия завершена',
                  },
                });
              }
            )
          );

          dispatch(contactsApi.endpoints.resetState.initiate());
          dispatch(planningApi.endpoints.refetchPlanningApi.initiate());
        });
      },
    }),
  }),
});

export const {
  useConfirmSessionQuery,
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
} = sessionApi;