import { Api, ApiModules } from '@reduxjs/toolkit/dist/query/apiTypes';
import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import {
  MutationDefinition,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { EndpointDefinitions } from '@reduxjs/toolkit/src/query/endpointDefinitions';

import { TFinanceOperationFormType } from '@planner/EventInfo/LeftBar/Tabs/Finance/components';

import { baseServerUrl } from '../config';
import {
  CustomRtkError,
  MyServerResponse,
  ObjectId,
  UtcDate,
} from '../rtk-api.types';
import { CatchHandleForToast, thenHandleForToast } from '../tools';
import {
  addFinanceOperationToStateThunk,
  removeFinanceOperationFromStateThunk,
  updateFinanceModelStateThunk,
  updateOperationsListThunk,
} from './thunk';
import {
  FINANCE_SOURCE_MODELS,
  FinanceReducerPath,
  ICreateFinanceModelArgs,
  IFinanceModel,
  IFinanceOperation,
  IGetFinanceModelsArgs,
  IGetFinanceModelsReturned,
  IGetTotalSampleReturn,
  ISetOperationStateProps,
  IUpdateOperationResult,
  TInitialFinanceOperationArgs,
  TUpdateFinanceOperationArgs,
} from './types';
import { updateGetFinanceModelsData } from './utils';

export enum FINANCE_API_TAG_TYPES {
  'FINANCE_MODEL_LIST' = 'FINANCE_MODEL_LIST',
}

type CustomApiBaseQuery<TArgs = any, TResult = any> = BaseQueryFn<TArgs,
  TResult,
  CustomRtkError>;

type CustomQueryDefinition<TArgs,
  TResult,
  ReducerPath extends string,
  TagTypes extends string = string> = QueryDefinition<TArgs,
  CustomApiBaseQuery<TArgs, TResult>,
  TagTypes,
  TResult,
  ReducerPath>;

type CustomMutationDefinition<TArgs,
  TResult,
  ReducerPath extends string,
  TagTypes extends string = string> = MutationDefinition<TArgs,
  CustomApiBaseQuery<TArgs, TResult>,
  TagTypes,
  TResult,
  ReducerPath>;

type FinanceMutation<TArgs, TResult> = CustomMutationDefinition<TArgs,
  TResult,
  FinanceReducerPath,
  FINANCE_API_TAG_TYPES>;

type FinanceQuery<TArgs, TResult> = CustomQueryDefinition<TArgs,
  TResult,
  FinanceReducerPath,
  FINANCE_API_TAG_TYPES>;

export enum FINANCE_ENDPOINTS {
  'CREATE_FINANCE_MODEL' = 'createFinanceModel',
  'GET_FINANCE_MODELS' = 'getFinanceModels',
  'CREATE_OPERATION' = 'createFinanceOperation',
  'GET_OPERATION_LIST' = 'getFinanceOperationList',
  'UPDATE_OPERATION' = 'updateFinanceOperation',
}

export interface FinanceEndpointDefinition extends EndpointDefinitions {
  [FINANCE_ENDPOINTS.CREATE_FINANCE_MODEL]: FinanceMutation<ICreateFinanceModelArgs,
    MyServerResponse<IFinanceModel>>;
  [FINANCE_ENDPOINTS.GET_FINANCE_MODELS]: FinanceQuery<IGetFinanceModelsArgs,
    MyServerResponse<Array<IFinanceModel>>>;
  [FINANCE_ENDPOINTS.CREATE_OPERATION]: FinanceMutation<TInitialFinanceOperationArgs,
    any>;
  [FINANCE_ENDPOINTS.GET_OPERATION_LIST]: FinanceQuery<ObjectId, any>;
  [FINANCE_ENDPOINTS.UPDATE_OPERATION]: FinanceMutation<TUpdateFinanceOperationArgs,
    any>;
}

type Test = keyof ApiModules<CustomApiBaseQuery,
  FinanceEndpointDefinition,
  FinanceReducerPath,
  FINANCE_API_TAG_TYPES>;

type FinanceApi = Api<CustomApiBaseQuery,
  FinanceEndpointDefinition,
  FinanceReducerPath,
  FINANCE_API_TAG_TYPES,
  Test>;

//BaseQuery extends BaseQueryFn,
//     Definitions extends EndpointDefinitions,
//     ReducerPath extends string = 'api',
//     TagTypes extends string = never

export const financeApi = createApi({
  reducerPath: 'finance-api',
  tagTypes: Object.values(FINANCE_API_TAG_TYPES),
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseServerUrl}/finance`,
    credentials: 'include',
    cache: 'no-cache',
  }) as CustomApiBaseQuery,
  refetchOnReconnect: true,
  
  endpoints({query, mutation}) {
    return {
      /**
       * @method createFinanceModel
       * @description Метод, создающий финансовую модель и закрепляющий ее
       */
      createFinanceModel: mutation<MyServerResponse<IFinanceModel>,
        ICreateFinanceModelArgs>({
        query: (arg) => ({
          url: `/model`,
          method: 'POST',
          body: arg,
        }),
        onQueryStarted(arg, api) {
          api.queryFulfilled
            .then((value) => {
              const financeModel = value.data.data;
              
              thenHandleForToast(value.data);
              
              if (financeModel) {
                const args: IGetFinanceModelsArgs = {
                  _id: arg._id,
                  sourceModel: arg.sourceModel,
                };
                
                //TODO вынести в отдельную thunk
                api.dispatch(
                  financeApi.util.updateQueryData(
                    'getFinanceModels',
                    args,
                    function (draft: MaybeDrafted<IGetFinanceModelsReturned>) {
                      const prevArr = draft.initial ? [...draft.initial] : [];
                      const arr = [...prevArr];
                      arr.push(financeModel);
                      
                      const {switcherData, models} =
                        updateGetFinanceModelsData(arr);
                      
                      Object.assign(draft, {
                        switcherData,
                        models,
                        initial: arr,
                      });
                    }
                  )
                );
              }
            })
            .catch((reason) => {
              CatchHandleForToast(reason);
            });
        },
      }),
      
      /**
       * @method getFinanceModel
       * @description Метод для получения финансовой модели
       * @param _id - Идентификатор модели, по которой производится поиск
       * @param sourceModel - Тип модели, по которой производится поиск
       */
      getFinanceModels: query<IGetFinanceModelsReturned, IGetFinanceModelsArgs>(
        {
          query: (arg) => ({
            url: `/models/${arg.sourceModel}/${arg._id}`,
            method: 'GET',
          }),
          transformResponse(
            baseQueryReturnValue: MyServerResponse<Array<IFinanceModel>>,
            meta,
            arg
          ) {
            const {switcherData, models} = updateGetFinanceModelsData(
              baseQueryReturnValue.data || []
            );
            
            return {
              switcherData,
              models,
              initial: baseQueryReturnValue.data || [],
            };
          },
          providesTags: [FINANCE_API_TAG_TYPES.FINANCE_MODEL_LIST],
        }
      ),
      createFinanceOperation: mutation<MyServerResponse<IUpdateOperationResult>,
        TInitialFinanceOperationArgs & {
        sourceModel: FINANCE_SOURCE_MODELS;
        sourceModelId: ObjectId;
      }>({
        query: (arg) => ({
          url: '/operation',
          method: 'POST',
          body: arg,
        }),
        async onQueryStarted(arg, {queryFulfilled, dispatch}) {
          try {
            const {data} = await queryFulfilled;
            thenHandleForToast(data);
            
            dispatch(
              addFinanceOperationToStateThunk({
                operation: data.data?.operation,
                modelId: arg.model,
              })
            );
            
            if (data.data?.financeModel) {
              dispatch(
                updateFinanceModelStateThunk({
                  newModel: data.data?.financeModel,
                  sourceModelType: data.data.financeModel.modelPath,
                  sourceModelId: data.data.financeModel.model,
                })
              );
            }
          } catch (e) {
            CatchHandleForToast(e);
          }
        },
      }),
      getFinanceOperationList: query<MyServerResponse<Array<IFinanceOperation>>,
        ObjectId>({
        query: (arg) => ({
          url: `/operations/${arg}`,
          method: 'GET',
        }),
      }),
      updateFinanceOperation: mutation<MyServerResponse<IUpdateOperationResult>,
        TFinanceOperationFormType & {
        sourceModel: FINANCE_SOURCE_MODELS;
        sourceModelId: ObjectId;
        model: ObjectId;
        index: number;
      }>({
        query: (arg) => ({
          url: '/operation',
          body: arg,
          method: 'PATCH',
        }),
        async onQueryStarted(arg, {queryFulfilled, dispatch}) {
          try {
            const {data} = await queryFulfilled;
            thenHandleForToast(data);
            
            dispatch(
              updateOperationsListThunk({
                operation: data.data?.operation,
                modelId: arg.model,
                index: arg.index,
              })
            );
            
            if (data.data?.financeModel) {
              dispatch(
                updateFinanceModelStateThunk({
                  newModel: data.data?.financeModel,
                  sourceModelType: data.data.financeModel.modelPath,
                  sourceModelId: data.data.financeModel.model,
                })
              );
            }
          } catch (e) {
            CatchHandleForToast(e);
          }
        },
      }),
      updateFinanceOperationState: mutation<MyServerResponse<IFinanceOperation>,
        ISetOperationStateProps>({
        query: (arg) => ({
          url: '/operation/state',
          body: arg,
          method: 'PATCH',
        }),
        async onQueryStarted(arg, {queryFulfilled, dispatch}) {
          try {
            const {data} = await queryFulfilled;
            thenHandleForToast(data);
            
            dispatch(
              updateOperationsListThunk({
                operation: data.data,
                modelId: arg.modelId,
                index: arg.index,
              })
            );
          } catch (e) {
            CatchHandleForToast(e);
          }
        },
      }),
      removeFinanceOperation: mutation<MyServerResponse<IFinanceModel>,
        {
          _id: ObjectId;
          model: ObjectId;
          sourceModel: FINANCE_SOURCE_MODELS;
          sourceModelId: ObjectId;
        }>({
        query: (arg) => ({
          url: '/operation',
          body: arg,
          method: 'DELETE',
        }),
        async onQueryStarted(arg, {queryFulfilled, dispatch, getState}) {
          try {
            const {data} = await queryFulfilled;
            
            dispatch(
              removeFinanceOperationFromStateThunk({
                operationId: arg._id,
                modelId: arg.model,
              })
            );

            dispatch(
              updateFinanceModelStateThunk({
                newModel: data.data,
                sourceModelId: arg.sourceModelId,
                sourceModelType: arg.sourceModel,
              })
            );
          } catch (e) {
            CatchHandleForToast(e);
          }
        },
      }),
      forceRefreshFinanceModel: query<MyServerResponse<IFinanceModel>,
        ObjectId>({
        query: (modelId) => ({
          url: `/model/${modelId}`,
          method: 'GET',
        }),
        async onQueryStarted(modelId, {queryFulfilled, dispatch}) {
          try {
            const {data} = await queryFulfilled;
            
            if (data.data) {
              dispatch(
                updateFinanceModelStateThunk({
                  sourceModelId: data.data.model,
                  sourceModelType: data.data.modelPath,
                  newModel: data.data,
                })
              );
            }
            
            thenHandleForToast(data);
          } catch (e) {
            console.log('catch error: ', e);
            CatchHandleForToast(e);
          }
        },
      }),
      getTotalSample: query<MyServerResponse<IGetTotalSampleReturn>, {fromDate: UtcDate, toDate: UtcDate}>({
        query: (arg) => ({
          url: "/total",
          body: arg,
          method: "POST"
        }),
        async onQueryStarted(arg, {queryFulfilled}){
          try {
            const {data} = await queryFulfilled;
            
            console.log(data)
            
          } catch(e){
            CatchHandleForToast(e)
          }
        }
      })
    };
  },
});

export const {
  useGetFinanceModelsQuery,
  useCreateFinanceModelMutation,
  useGetFinanceOperationListQuery,
  useCreateFinanceOperationMutation,
  useRemoveFinanceOperationMutation,
  useUpdateFinanceOperationMutation,
  useUpdateFinanceOperationStateMutation,
  useLazyForceRefreshFinanceModelQuery,
  useGetTotalSampleQuery
} = financeApi;