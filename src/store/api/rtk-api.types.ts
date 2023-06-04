import { MutationLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';

export type ObjectId = string;
export type UtcDate = string;
export type ErrorTypes = 'info' | 'success' | 'warning' | 'error' | 'default';

interface ServerErrorType {
  message: string;
  type: ErrorTypes;
}

export interface CustomRtkError<T = null> {
  data: MyServerResponse<T>;
  status: number;
}

export interface MyServerResponse<T = null> {
  data?: T | null;
  info?: ServerErrorType;
}

export type TBuildMutationLifecycleApi<
  TArgs = any,
  TResult = unknown,
  ReducerPath extends string = string
> = MutationLifecycleApi<
  TArgs,
  BaseQueryFn<TArgs, TResult>,
  TResult,
  ReducerPath
>;