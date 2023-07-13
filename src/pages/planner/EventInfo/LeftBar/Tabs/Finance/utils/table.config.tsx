import { DateHelper } from '../../../../../../../common/calendarSupport/dateHelper';
import { FINANCE_OPERATION_TITLES } from '../components';
import {
  FINANCE_OPERATION_TYPES,
  IFinanceOperation,
  TFinanceOperationWithDate,
} from '@api/finance-api/types';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { Row } from '@tanstack/table-core/src/types';
import React from 'react';


export function sortingNumberColumns(
  rowA: Row<IFinanceOperation>,
  rowB: Row<IFinanceOperation>,
  key: 'count' | 'value' | 'result'
): number {
  const a = rowA.original[key];
  const b = rowB.original[key];

  return a - b;
}

export function getFinanceOperationValue(num: number): string {
  let value = `${num}`.split('');
  const arr = [];

  while (value.length) {
    const arrSym = value.splice(-3, 3);
    arr.unshift(arrSym.join(''));
  }

  return arr.join(' ').trim() + ' ₽';
}

console.log('test split number: ', getFinanceOperationValue(10000));

export function buildEventDescriptionFromOperation(
  original: TFinanceOperationWithDate,
  eventInfo: EventInfoModel
) {
  return `Событие было создано от финансовой операции \"${
    original.name
  }\", закрепленной за событием "${eventInfo.title}".
Информация по финансовой операции:
Название - ${original.name}
Тип - ${FINANCE_OPERATION_TITLES[original.operationType]},
Дата - ${
    original.date
      ? DateHelper.getHumanizeDateValue(original.date, {
          withTime: true,
        })
      : 'не записана'
  },
Сумма - ${original.value},
Количество - ${original.count},
Результат - ${original.result}.`;
}

interface IGetBottomToolbarAnalyticReturned {
  profit: number;
  consumption: number;
  income: number;
  incomeCount: number;
  consumptionCount: number;
  allCount: number;
  maxIncome: TFinanceOperationWithDate | null;
  maxConsumption: TFinanceOperationWithDate | null;
  isPositiveResult: boolean;
}

export function getBottomToolbarAnalytic(
  rows: Array<{ original: TFinanceOperationWithDate }>
): IGetBottomToolbarAnalyticReturned {
  let profit = 0;
  let consumption = 0;
  let income = 0;
  let incomeCount = 0;
  let consumptionCount = 0;
  let allCount = 0;
  let maxIncome: TFinanceOperationWithDate | null = null;
  let maxConsumption: TFinanceOperationWithDate | null = null;

  rows.forEach((item, index, array) => {
    if (item.original.operationType === FINANCE_OPERATION_TYPES.INCOME) {
      profit += item.original.result;
      income += item.original.result;
      incomeCount++;

      if (maxIncome) {
        if (item.original.result > maxIncome.result) {
          maxIncome = item.original;
        }
      } else {
        maxIncome = item.original;
      }
    } else {
      profit -= item.original.result;
      consumption += item.original.result;
      consumptionCount++;

      if (maxConsumption) {
        if (item.original.result > maxConsumption.result) {
          maxConsumption = item.original;
        }
      } else {
        maxConsumption = item.original;
      }
    }

    allCount++;
  });

  const isPositiveResult = profit >= 0;

  return {
    profit,
    consumption,
    income,
    incomeCount,
    consumptionCount,
    allCount,
    maxIncome,
    maxConsumption,
    isPositiveResult,
  };
}