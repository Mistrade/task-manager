import {
  getBottomToolbarAnalytic,
  getFinanceOperationValue,
} from '../../utils/table.config';
import {
  FINANCE_OPERATION_TYPES,
  TFinanceOperationWithDate,
} from '@api/finance-api/types';
import Badge from '@components/Badge';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { MRT_TableInstance } from 'material-react-table';
import React, { FC, useMemo } from 'react';


export const OperationTableFooter: FC<{
  table: MRT_TableInstance<TFinanceOperationWithDate>;
}> = ({ table }) => {
  const {
    allCount,
    incomeCount,
    consumptionCount,
    consumption,
    income,
    maxIncome,
    isPositiveResult,
    maxConsumption,
    profit,
  } = useMemo(() => {
    const rows = table.getGlobalFacetedRowModel().rows;
    return getBottomToolbarAnalytic(rows);
  }, [table.getGlobalFacetedRowModel().rows]);

  return (
    <FlexBlock justify={'space-between'} width={'100%'}>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Кол-во операций
        </CutText>
        <FlexBlock width={'fit-content'}>
          <CutText fontSize={14} rows={1}>
            {allCount} шт.
          </CutText>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Доходных операций
        </CutText>
        <FlexBlock width={'fit-content'}>
          <CutText fontSize={14} rows={1}>
            {incomeCount} шт.
          </CutText>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'column'} align={'center'} gap={6} pl={12} pr={12}>
        <CutText style={{ fontWeight: 'bold' }} fontSize={15}>
          Расходных операций
        </CutText>
        <FlexBlock width={'fit-content'}>
          <CutText fontSize={14} rows={1}>
            {consumptionCount} шт.
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
              {getFinanceOperationValue(maxIncome?.result || 0)}
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
              {getFinanceOperationValue(maxConsumption?.result || 0)}
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
              {getFinanceOperationValue(consumption)}
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
              {getFinanceOperationValue(income)}
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
              isPositiveResult
                ? FINANCE_OPERATION_TYPES.INCOME
                : FINANCE_OPERATION_TYPES.CONSUMPTION
            }
          >
            <CutText fontSize={14} rows={1}>
              {getFinanceOperationValue(profit)}
            </CutText>
          </Badge>
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};