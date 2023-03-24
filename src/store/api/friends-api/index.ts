import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { baseServerUrl } from '../config';
import { MyServerResponse, ObjectId } from '../rtk-api.types';
import { TFriendsModelList } from './friends-api.types';

export enum CONTACT_TYPES {
  'FRIENDS' = 'friends',
  'INCOMING' = 'incoming',
  'OUTGOING' = 'outgoing',
}

export enum ContactAcceptStatuses {
  'CREATED' = 0,
  'ACCEPTED' = 1,
  'DECLINE' = 2,
}

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: [
    CONTACT_TYPES.FRIENDS,
    CONTACT_TYPES.OUTGOING,
    CONTACT_TYPES.INCOMING,
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseServerUrl}/contacts`,
    credentials: 'include',
    cache: 'no-cache',
  }),
  endpoints: ({ query, mutation }) => ({
    addContact: mutation<MyServerResponse, { phoneOrEmail: string }>({
      query: (args) => ({
        url: '/add_contact',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: (result, error, arg, meta) =>
        !error ? [CONTACT_TYPES.OUTGOING] : [],
    }),
    getContactsList: query<MyServerResponse<TFriendsModelList>, CONTACT_TYPES>({
      query: (args) => ({
        url: `/get_contacts/${args}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg, meta) => (!error ? [arg] : []),
    }),
    responseOnFriendRequest: mutation<
      MyServerResponse,
      { acceptedStatus: keyof typeof ContactAcceptStatuses; _id: ObjectId }
    >({
      query: (arg) => ({
        url: '/response_on_friends_order',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useAddContactMutation,
  useGetContactsListQuery,
  useResponseOnFriendRequestMutation,
} = contactsApi;
