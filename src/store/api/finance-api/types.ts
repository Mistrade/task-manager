import { MutationLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react';

import { SwitcherItem } from '@components/Switcher/Switcher';

import { MyServerResponse, ObjectId, UtcDate } from '../rtk-api.types';


export enum FINANCE_SOURCE_MODELS {
  'EVENT' = 'Event',
}

export enum FINANCE_OPERATION_TYPES {
  'INCOME' = 'income',
  'CONSUMPTION' = 'consumption',
}

export type FinanceReducerPath = 'finance-api';

export interface ICreateFinanceModelArgs {
  _id: ObjectId;
  sourceModel: FINANCE_SOURCE_MODELS;
  title: string;
}

export type IGetFinanceModelsArgs = Pick<
  ICreateFinanceModelArgs,
  '_id' | 'sourceModel'
>;

export interface IFinanceAnalytic {
  income: number; //доход
  consumption: number; //расход
  operationsCount: number; //Кол-во операций
  incomesOperationCount: number; //Кол-во доходных операций
  consumptionOperationCount: number; //Кол-во расходных операций
  bestIncomeOperation: IFinanceOperation | null; //Наиболее доходная операция
  bestConsumptionOperation: IFinanceOperation | null; //Наиболее расходная операция
  profit: number; // профит
  profitPercent: number; //профит в процентах
  updatedAt: UtcDate; //Дата последнего обновления
}

export interface IFinanceModel {
  _id: ObjectId;
  model: ObjectId;
  modelPath: FINANCE_SOURCE_MODELS;
  analytic: IFinanceAnalytic;
  createdAt: UtcDate;
  updatedAt: UtcDate;
  user: ObjectId;
  title: string;
}

export interface IFinanceOperation {
  _id: ObjectId;
  model: ObjectId;
  name: string;
  date: UtcDate | null;
  operationType: FINANCE_OPERATION_TYPES;
  value: number;
  count: number;
  result: number;
  user: ObjectId;
  createdAt: UtcDate;
  updatedAt: UtcDate;
  description?: string;
  state: boolean;
  events: Array<ObjectId>
}

export type TFinanceOperationWithDate = Omit<IFinanceOperation, 'date'> & {
  date: Date | null;
};

export type TInitialFinanceOperationArgs = Pick<
  IFinanceOperation,
  'model' | 'name' | 'operationType' | 'value' | 'count' | 'description'
> & {
  date: Date | null;
};

export type TUpdateFinanceOperationArgs = Pick<
  IFinanceOperation,
  '_id' | 'value' | 'count' | 'name' | 'date'
>;

export type TOperationSwitchItem = SwitcherItem<ObjectId> & {
  badgeValue: number;
  badgeType: FINANCE_OPERATION_TYPES;
};

export interface IUpdateOperationResult {
  operation: IFinanceOperation;
  financeModel?: IFinanceModel | null;
}

export interface IGetFinanceModelsReturned {
  switcherData: Array<TOperationSwitchItem>;
  models: { [key in ObjectId]: IFinanceModel };
  initial: Array<IFinanceModel>;
}

export type ApiFetchArgs<TArgs> = (TArgs & Required<FetchArgs>) | string;

export type TBuildMutationLifecycleApi<
  TArgs,
  TResult = unknown,
  ReducerPath extends string = string
> = MutationLifecycleApi<
  TArgs,
  BaseQueryFn<TArgs, TResult>,
  TResult,
  ReducerPath
>;

export type TCreateFinanceModelLifecycleApi = TBuildMutationLifecycleApi<
  ICreateFinanceModelArgs,
  MyServerResponse<IFinanceModel>,
  FinanceReducerPath
>;

export interface ISetOperationStateProps {
  _id: ObjectId,
  state: boolean
  index: number,
  modelId: ObjectId,
}

export interface IUpdateOperationListStateProps {
  operation?: IFinanceOperation | null
  modelId: ObjectId;
  index: number;
}

export interface IUpdateFinanceModelStateThunkProps {
  sourceModelId: ObjectId;
  sourceModelType: FINANCE_SOURCE_MODELS;
  newModel?: IFinanceModel | null;
}

export interface IAddFinanceOperationToStateThunkProps {
  operation?: IFinanceOperation | null,
  modelId: ObjectId,
}

export interface IRemoveFinanceOperationFromStateThunkProps {
  operationId: ObjectId,
  modelId: ObjectId,
}

export interface IFinanceSampleObject {
  income: number,
  consumption: number,
  profit: number,
}

export interface IGetTotalSampleReturn {
  // byEvents: {
  //   [key: ObjectId]: IFinanceSampleObject
  // },
  // byDate: {
    [key: ObjectId]: IFinanceSampleObject
  // },
  // total: IFinanceSampleObject
}