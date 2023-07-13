import { MRT_TableInstance } from 'material-react-table';
import React, { FC } from 'react';

import Badge from '@components/Badge';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';

import {
  FINANCE_OPERATION_TYPES,
  IFinanceModel,
  TFinanceOperationWithDate,
} from '@api/finance-api/types';

import { getFinanceOperationValue } from '../../utils/table.config';


export const OperationTableFooter: FC<{
  table: MRT_TableInstance<TFinanceOperationWithDate>;
  model: IFinanceModel;
}> = ({ table, model: { analytic } }) => {
  return (
    <FlexBlock justify={'space-between'} width={'100%'}>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Кол-во операций
        </CutText>
        <FlexBlock width={'fit-content'}>
          <CutText fontSize={14} rows={1}>
            {analytic.operationsCount} шт.
          </CutText>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Доходных операций
        </CutText>
        <FlexBlock width={'fit-content'}>
          <CutText fontSize={14} rows={1}>
            {analytic.incomesOperationCount} шт.
          </CutText>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Расходных операций
        </CutText>
        <FlexBlock width={'fit-content'}>
          <CutText fontSize={14} rows={1}>
            {analytic.consumptionOperationCount} шт.
          </CutText>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Макс. доход
        </CutText>
        <FlexBlock width={'fit-content'}>
          <Badge type={FINANCE_OPERATION_TYPES.INCOME}>
            <CutText fontSize={14} rows={1}>
              {getFinanceOperationValue(
                analytic.bestIncomeOperation?.result || 0
              )}
            </CutText>
          </Badge>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Макс. расход
        </CutText>
        <FlexBlock width={'fit-content'}>
          <Badge type={FINANCE_OPERATION_TYPES.CONSUMPTION}>
            <CutText fontSize={14} rows={1}>
              {getFinanceOperationValue(
                analytic.bestConsumptionOperation?.result || 0
              )}
            </CutText>
          </Badge>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Сумма расходов
        </CutText>
        <FlexBlock width={'fit-content'}>
          <Badge type={FINANCE_OPERATION_TYPES.CONSUMPTION}>
            <CutText fontSize={14} rows={1}>
              {getFinanceOperationValue(analytic.consumption)}
            </CutText>
          </Badge>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Сумма доходов
        </CutText>
        <FlexBlock width={'fit-content'}>
          <Badge type={FINANCE_OPERATION_TYPES.INCOME}>
            <CutText fontSize={14} rows={1}>
              {getFinanceOperationValue(analytic.income)}
            </CutText>
          </Badge>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Итоговый результат
        </CutText>
        <FlexBlock width={'fit-content'}>
          <Badge
            type={
              analytic.profit >= 0
                ? FINANCE_OPERATION_TYPES.INCOME
                : FINANCE_OPERATION_TYPES.CONSUMPTION
            }
          >
            <CutText fontSize={14} rows={1}>
              {getFinanceOperationValue(analytic.profit)}
            </CutText>
          </Badge>
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};