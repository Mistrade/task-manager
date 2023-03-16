import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import {
  CalendarTaskItem,
  EventsStorage,
} from '../../../pages/Planner/planner.types';
import { baseServerUrl } from '../config';
import { SwitcherBadges } from '../../../components/Switcher/Switcher';
import dayjs from 'dayjs';
import {
  ArrayOfGroupModel,
  ChangeSelectGroupRequestProps,
  GetGroupsListRequestProps,
  GroupIdObject,
  GroupModelResponse,
} from './types/groups.types';
import {
  EventIdObject,
  EventInfoModel,
  GetEventsFiltersRequestProps,
  GetEventsSchemeResponse,
  ShortEventInfoModel,
  ShortEventsArray,
  SortedEventsObject,
  UpdateEventRequestProps,
} from './types/event-info.types';
import {
  CommentModel,
  CreateCommentRequestProps,
  UpdateCommentIsImportantRequestData,
  UpdateCommentMessageState,
} from './types/comments.types';
import { EventHistoryQueryResult } from './types/event-history.types';
import { CustomRtkError, MyServerResponse, ObjectId } from '../rtk-api.types';
import {
  AddChainsRequestData,
  ConnectChildResponse,
  EventChainsObject,
} from './types/event-chains.types';
import { EventFilterTaskStatuses } from '../../../pages/Planner/RenderModes/FindEventFilter/find-event-filters.types';
import { CreateGroupProps } from '../../../pages/Planner/Groups/groups.types';
import { mergeArrayWithUserId, MergedObject } from '../../../common/functions';

export const PlanningApiTagTypes = [
  'Events',
  'EventInfo',
  'Groups',
  'EventsScheme',
  'CalendarInfo',
  'EventsCount',
  'Chains',
  'EventHistory',
  'Comments',
];

export const planningApi = createApi({
  reducerPath: 'planning-api',
  tagTypes: PlanningApiTagTypes,
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseServerUrl}/planning/events`,
    credentials: 'include',
    cache: 'no-cache',
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomRtkError, {}>,
  refetchOnReconnect: true,
  endpoints({ query, mutation }) {
    return {
      removeGroup: mutation<MyServerResponse, GroupIdObject>({
        query: (args) => ({
          url: '/groups/remove',
          body: args,
          method: 'POST',
        }),
        invalidatesTags: (result, error, arg, meta) =>
          !error ? ['Groups', 'Events', 'EventsScheme', 'EventsCount'] : [],
      }),
      createEventGroup: mutation<MyServerResponse, CreateGroupProps>({
        query: (args) => ({
          url: '/groups/create',
          method: 'POST',
          body: args,
        }),
        invalidatesTags: ['Groups'],
      }),
      getGroupsList: query<
        MyServerResponse<ArrayOfGroupModel>,
        GetGroupsListRequestProps
      >({
        query: (args) => ({
          url: '/groups/get_groups_list',
          method: 'POST',
          body: args,
        }),
        providesTags: ['Groups'],
      }),
      changeSelectGroup: mutation<
        MyServerResponse,
        ChangeSelectGroupRequestProps
      >({
        query: (args) => ({
          url: '/groups/change_select_group',
          method: 'POST',
          body: args,
        }),
        invalidatesTags: (result, error, arg, meta) =>
          !error ? ['Events', 'Groups', 'EventsCount', 'EventsScheme'] : [],
      }),
      getEventInfo: query<MyServerResponse<EventInfoModel>, ObjectId>({
        async onQueryStarted(args, { queryFulfilled }) {
          console.log('args', args);
          if (args) {
            await queryFulfilled;
          }
        },
        query: (id: string) => ({
          url: `/info/${id}`,
          method: 'GET',
          cache: 'no-store',
        }),
        providesTags: ['EventInfo'],
      }),
      getShortEventsArray: query<
        SortedEventsObject,
        GetEventsFiltersRequestProps
      >({
        query: (props) => ({
          url: `/info/get_short_events_array`,
          method: 'POST',
          body: props,
        }),
        providesTags: ['Events'],
        transformResponse(
          value: MyServerResponse<ShortEventsArray>,
          meta,
          arg
        ) {
          const throughEvents: Array<ShortEventInfoModel> = [];
          const baseEvents: Array<ShortEventInfoModel> = [];

          value.data?.forEach((event) => {
            const start = dayjs(event.time);
            const end = dayjs(event.timeEnd);

            if (start.isSame(end, 'date')) {
              return baseEvents.push(event);
            }
            return throughEvents.push(event);
          });

          return {
            throughEvents,
            baseEvents,
          };
        },
      }),
      getEventsStorage: query<
        MyServerResponse<EventsStorage>,
        GetEventsFiltersRequestProps
      >({
        query: (props) => ({
          url: `/info/get_events_storage`,
          method: 'POST',
          body: props,
        }),
        providesTags: ['Events'],
      }),
      createEvent: mutation<MyServerResponse<EventIdObject>, CalendarTaskItem>({
        query: (body) => ({
          url: `/create`,
          method: 'POST',
          body,
        }),
        invalidatesTags: (result, error, arg, meta) =>
          !error
            ? [
                'Events',
                'EventsScheme',
                'EventsCount',
                'Chains',
                'EventHistory',
              ]
            : [],
      }),
      removeEvent: mutation<MyServerResponse, EventIdObject>({
        query: (arg) => ({
          url: '/remove',
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: (result, error, arg, meta) =>
          !error
            ? [
                'Events',
                'EventsScheme',
                'EventsCount',
                'Chains',
                'EventHistory',
              ]
            : [],
      }),
      getEventsScheme: query<
        GetEventsSchemeResponse,
        GetEventsFiltersRequestProps
      >({
        query: (args) => ({
          url: '/info/get_events_scheme',
          method: 'POST',
          body: args,
        }),
        transformResponse(
          baseQueryReturnValue: MyServerResponse<GetEventsSchemeResponse>,
          meta,
          arg
        ): GetEventsSchemeResponse {
          if (
            !baseQueryReturnValue.data ||
            baseQueryReturnValue?.info?.type === 'error'
          ) {
            return {};
          }

          return baseQueryReturnValue.data || {};
        },
        providesTags: ['EventsScheme'],
      }),
      getEventHistory: query<
        Array<
          MergedObject<
            EventHistoryQueryResult,
            'changeUserId',
            EventHistoryQueryResult
          >
        >,
        ObjectId
      >({
        query: (taskId) => ({
          url: `/history/${taskId}`,
          method: 'GET',
        }),
        transformResponse(
          value: MyServerResponse<Array<EventHistoryQueryResult>>,
          meta,
          arg: ObjectId
        ): Array<
          MergedObject<
            EventHistoryQueryResult,
            'changeUserId',
            EventHistoryQueryResult
          >
        > {
          if (!value.data) {
            return [];
          }

          return mergeArrayWithUserId(value.data || [], 'changeUserId');
        },
        providesTags: ['EventHistory'],
      }),
      getEventChains: query<MyServerResponse<EventChainsObject>, ObjectId>({
        query: (taskId) => ({
          url: `/chains/${taskId}`,
          method: 'GET',
          cache: 'no-cache',
        }),
        providesTags: ['Chains'],
      }),
      updateTask: mutation<MyServerResponse, UpdateEventRequestProps>({
        query: (args) => ({
          url: '/info/update',
          method: 'POST',
          body: args,
        }),
        invalidatesTags: (result, error, arg, meta) => {
          if (result?.info?.type !== 'success' || error) {
            return [];
          }

          if (
            arg.field === 'time' ||
            arg.field === 'timeEnd' ||
            arg.field === 'group'
          ) {
            return [
              'EventInfo',
              'Events',
              'EventsCount',
              'EventsScheme',
              'Chains',
              'EventHistory',
            ];
          }

          if (arg.field === 'status') {
            return [
              'EventInfo',
              'EventsCount',
              'Events',
              'Chains',
              'EventHistory',
            ];
          }

          return ['EventInfo', 'Events', 'Chains', 'EventHistory'];
        },
      }),
      getEventsCountOfStatus: query<
        MyServerResponse<SwitcherBadges<EventFilterTaskStatuses>>,
        GetEventsFiltersRequestProps
      >({
        query: (args) => ({
          url: '/info/get_events_count_of_statuses',
          method: 'POST',
          body: args,
        }),
        providesTags: ['EventsCount'],
      }),
      getGroupInfo: query<MyServerResponse<GroupModelResponse>, ObjectId>({
        query: (groupId) => ({
          url: `/groups/info/${groupId}`,
          method: 'GET',
          cache: 'reload',
        }),
      }),
      updateGroupInfo: mutation<MyServerResponse, CreateGroupProps>({
        query: (args) => ({
          url: '/groups/update',
          method: 'POST',
          body: args,
        }),
        invalidatesTags: (result, error, arg, meta) =>
          !error ? ['Groups', 'Events'] : [],
      }),
      createComment: mutation<MyServerResponse, CreateCommentRequestProps>({
        query: (commentInfo) => ({
          url: '/comments/create',
          method: 'POST',
          body: commentInfo,
        }),
        invalidatesTags: (result, error, arg, meta) =>
          !error ? ['Comments'] : [],
      }),
      getCommentsList: query<MyServerResponse<Array<CommentModel>>, ObjectId>({
        query: (eventId) => ({
          url: `/comments/${eventId}`,
          method: 'GET',
        }),
        providesTags: ['Comments'],
      }),
      removeComment: mutation<MyServerResponse, ObjectId>({
        query: (commentId) => ({
          url: `/comments/remove`,
          method: 'POST',
          body: {
            commentId,
          },
        }),
        invalidatesTags: (result, error, arg, meta) =>
          !error ? ['Comments'] : [],
      }),
      toggleIsImportantCommentState: mutation<
        MyServerResponse,
        UpdateCommentIsImportantRequestData
      >({
        query: (data) => ({
          url: `/comments/update/isImportant`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: (result, error, arg, meta) =>
          !error ? ['Comments'] : [],
      }),
      updateComment: mutation<MyServerResponse, UpdateCommentMessageState>({
        query: (data) => ({
          url: '/comments/update',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: (result, error, arg, meta) =>
          !error ? ['Comments'] : [],
      }),
      connectChains: mutation<
        MyServerResponse<ConnectChildResponse>,
        AddChainsRequestData
      >({
        query: (body) => ({
          url: '/chains/connect/children',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Chains', 'EventHistory'],
      }),
      refetchPlanningApi: mutation({
        queryFn: () => ({ data: null }),
        invalidatesTags: PlanningApiTagTypes,
      }),
    };
  },
});

export const {
  useGetShortEventsArrayQuery,
  useLazyGetShortEventsArrayQuery,
  useCreateEventMutation,
  useRemoveEventMutation,
  useGetEventsSchemeQuery,
  useUpdateTaskMutation,
  useGetGroupsListQuery,
  useGetEventInfoQuery,
  useChangeSelectGroupMutation,
  useCreateEventGroupMutation,
  useRemoveGroupMutation,
  useGetEventsStorageQuery,
  useGetEventsCountOfStatusQuery,
  useGetGroupInfoQuery,
  useUpdateGroupInfoMutation,
  useGetEventChainsQuery,
  useGetEventHistoryQuery,
  useRefetchPlanningApiMutation,
  useCreateCommentMutation,
  useGetCommentsListQuery,
  useRemoveCommentMutation,
  useConnectChainsMutation,
  useToggleIsImportantCommentStateMutation,
  useUpdateCommentMutation,
} = planningApi;
