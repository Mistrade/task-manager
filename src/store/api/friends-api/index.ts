import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { UserModel } from '@api/session-api/session-api.types';

import { baseServerUrl } from '../config';
import { MyServerResponse, ObjectId } from '../rtk-api.types';
import { TFriendsModelList } from './friends-api.types';


export enum FRIEND_REQUESTS_TYPES {
  'INCOMING' = 'incoming',
  'OUTGOING' = 'outgoing',
}

export enum ContactAcceptStatuses {
  'CREATED' = 'created',
  'ACCEPTED' = 'accepted',
  'DECLINE' = 'decline',
}

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: [
    FRIEND_REQUESTS_TYPES.OUTGOING,
    FRIEND_REQUESTS_TYPES.INCOMING,
    'FriendsList',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseServerUrl}/friends`,
    credentials: 'include',
    cache: 'no-cache',
  }),
  endpoints: ({ query, mutation }) => ({
    addContact: mutation<MyServerResponse, { phoneOrEmail: string }>({
      query: (args) => ({
        url: '/create_request',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: (result, error, arg, meta) =>
        !error ? [FRIEND_REQUESTS_TYPES.OUTGOING] : [],
    }),
    getContactsList: query<
      MyServerResponse<TFriendsModelList>,
      FRIEND_REQUESTS_TYPES
    >({
      query: (args) => ({
        url: `/get_requests_list/${args}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg, meta) => (!error ? [arg] : []),
    }),
    responseOnFriendRequest: mutation<
      MyServerResponse,
      { acceptedStatus: ContactAcceptStatuses; _id: ObjectId }
    >({
      query: (arg) => ({
        url: '/accept_or_decline',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: [],
    }),
    getFriendsList: query<MyServerResponse<Array<UserModel>>, void>({
      query: () => ({
        method: 'POST',
        url: '/get_friends_list',
      }),
      providesTags: ['FriendsList'],
    }),
  }),
});

export const {
  useAddContactMutation,
  useGetContactsListQuery,
  useResponseOnFriendRequestMutation,
  useGetFriendsListQuery,
} = contactsApi;