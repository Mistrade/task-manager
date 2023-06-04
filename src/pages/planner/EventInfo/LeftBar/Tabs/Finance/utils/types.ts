import { MRT_FilterFns } from 'material-react-table';

import {
  FINANCE_OPERATION_TYPES,
  IFinanceOperation,
} from '@api/finance-api/types';

type FilterNumberFields = keyof Pick<
  IFinanceOperation,
  'result' | 'count' | 'value'
>;
type FilterStringFields = keyof Pick<
  IFinanceOperation,
  'operationType' | 'name'
>;
type FilterDateFields = keyof Pick<IFinanceOperation, 'date'>;
export type FilterFields =
  | FilterNumberFields
  | FilterStringFields
  | FilterDateFields;

type AgreementFns = Pick<
  typeof MRT_FilterFns,
  | 'lessThanOrEqualTo'
  | 'lessThan'
  | 'equals'
  | 'includesString'
  | 'greaterThanOrEqualTo'
  | 'greaterThan'
  | 'equalsString'
  | 'startsWith'
  | 'endsWith'
>;
export type AgreementNumberFns = Pick<
  AgreementFns,
  | 'lessThanOrEqualTo'
  | 'lessThan'
  | 'equals'
  | 'greaterThanOrEqualTo'
  | 'greaterThan'
>;

export type AgreementDateFns = AgreementNumberFns;

export type AgreementStringFns = Pick<
  AgreementFns,
  'equalsString' | 'includesString' | 'startsWith' | 'endsWith'
>;

type TColumnsNumbersFns = {
  [key in FilterNumberFields]: keyof AgreementNumberFns;
};

type TColumnsStringFns = {
  [key in FilterStringFields]: keyof AgreementStringFns;
};

type TColumnDateFns = {
  date: keyof AgreementDateFns;
};

export type TColumnsFilterFnsMap = TColumnsNumbersFns &
  TColumnsStringFns &
  TColumnDateFns;

type TColumnFilterNumberValue = {
  id: FilterNumberFields;
  value: number;
};

type TColumnFilterStringValues = {
  id: keyof Pick<IFinanceOperation, 'name'>;
  value: string;
};

type TColumnsFilterOperationType = {
  id: keyof Pick<IFinanceOperation, 'operationType'>;
  value: FINANCE_OPERATION_TYPES;
};

type TColumnsFilterDateValues = {
  id: keyof Pick<IFinanceOperation, 'date'>;
  value: Date;
};

type TFilterCallbackNumberValues = {
  [key in TColumnFilterNumberValue['id']]: TColumnFilterNumberValue['value'];
};

type TFilterCallbackStringValues = {
  [key in TColumnFilterStringValues['id']]: TColumnFilterStringValues['value'];
};

type TFilterCallbackEnumValues = {
  [key in TColumnsFilterOperationType['id']]: TColumnsFilterOperationType['value'];
};

type TFilterCallbackDateValues = {
  [key in TColumnsFilterDateValues['id']]: TColumnsFilterDateValues['value'];
};

type TColumnFilterValues =
  | TColumnFilterNumberValue
  | TColumnFilterStringValues
  | TColumnsFilterOperationType
  | TColumnsFilterDateValues;

export type TColumnFilterValuesMap = {
  count: TColumnFilterNumberValue;
  value: TColumnFilterNumberValue;
  result: TColumnFilterNumberValue;
  name: TColumnFilterStringValues;
  operationType: TColumnsFilterOperationType;
  date: TColumnsFilterDateValues;
};

type TFilterCallbackValues = TFilterCallbackNumberValues &
  TFilterCallbackStringValues &
  TFilterCallbackEnumValues &
  TFilterCallbackDateValues;

export interface IColumnFilterState {
  fns: TColumnsFilterFnsMap;
  values: Array<TColumnFilterValues>;
}

type TCallbackValues<T extends FilterFields> = {
  [key in T]: {
    key: T;
    pattern: TColumnsFilterFnsMap[T];
    value: TFilterCallbackValues[T] | null;
  };
};

export type TCallbackData<Key extends FilterFields> = TCallbackValues<Key>[Key];
