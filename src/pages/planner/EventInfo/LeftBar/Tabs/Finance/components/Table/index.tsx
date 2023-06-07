import { useFinanceOperationTable } from '@hooks/useFinanceOperationTable';
import { LoaderIcon, RefreshIcon } from 'chernikov-icons-kit';
import { Tooltip } from 'chernikov-kit';
import dayjs from 'dayjs';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import React, { FC, useMemo } from 'react';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { CancelIcon, FiltersIcon, PlusIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';

import { useLazyForceRefreshFinanceModelQuery } from '@api/finance-api';
import {
  IFinanceModel,
  IFinanceOperation,
  IGetFinanceModelsReturned,
} from '@api/finance-api/types';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';

import {
  currentColor,
  darkColor,
  defaultColor,
  disabledColor,
  hoverColor,
} from '../../../../../../../../common/constants/constants';
import { borderRadiusSize } from '../../../../../../../../common/css/mixins';
import { CenteredContainer } from '../../../../../../../../routes/Interceptors/SessionInterceptor';
import { FinanceOperationModal } from '../Forms/UpdateModal';
import { OperationTableFooter } from './Footer';


interface OperationsTableProps {
  model: IFinanceModel;
  showFilters?: boolean;
  maxHeight?: number;
  operationsList: Array<IFinanceOperation>;
  eventInfo: EventInfoModel;
  isLoading?: boolean;
  switcherData: IGetFinanceModelsReturned['switcherData'];
}

export const OperationsTable: FC<OperationsTableProps> = ({
  model,
  operationsList,
  eventInfo,
  isLoading,
}) => {
  const [refreshModel, { isFetching: isRefreshLoading }] =
    useLazyForceRefreshFinanceModelQuery();

  const {
    onCreateEvent,
    setModalState,
    modalState,
    initialSorting,
    columns,
    columnFilters,
    resetColumnFiltersState,
  } = useFinanceOperationTable({
    eventInfo,
    model,
  });

  const data = useMemo(
    () =>
      operationsList.map((item) => ({
        ...item,
        date: item.date ? dayjs(item.date).toDate() : null,
      })),
    [operationsList]
  );

  return (
    <>
      <MaterialReactTable
        muiTableBodyCellSkeletonProps={{
          animation: 'pulse',
          sx: { background: hoverColor },
        }}
        enableColumnActions={false}
        enableColumnFilterModes={false}
        enableFilters={true}
        enablePinning={true}
        state={{
          columnPinning: {
            left: ['name'],
            right: ['result', 'state', '_id'],
          },
          density: 'compact',
          columnFilterFns: columnFilters.fns,
          columnFilters: columnFilters.values,
          showSkeletons: isLoading,
        }}
        initialState={{
          sorting: initialSorting,
        }}
        enableRowActions={false}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <FlexBlock height={'100%'} align={'center'} gap={6}>
              <Tooltip
                content={
                  'Обновить аналитику по всем операциям. Чаще всего аналитика обновляется в фоновом режиме, но бывают ситуации, когда из-за какой-либо произошедшей ошибки может понадобиться принудительное обновление. Функция доступна не чаще, чем раз в 15 секунд.'
                }
                theme={'light'}
                placement={'top'}
                delay={100}
              >
                <EmptyButtonStyled
                  // disabled={isRefreshLoading}
                  onClick={() => {
                    refreshModel(model._id).unwrap();
                  }}
                >
                  {isRefreshLoading ? (
                    <LoaderIcon size={24} />
                  ) : (
                    <RefreshIcon size={24} />
                  )}
                </EmptyButtonStyled>
              </Tooltip>
              <CutText rows={1} color={darkColor} fontSize={22}>
                Список операций: {model.title}
              </CutText>
            </FlexBlock>
          );
        }}
        enableTableFooter={true}
        enableTopToolbar={true}
        enableToolbarInternalActions={true}
        renderToolbarInternalActions={({ table }) => {
          return (
            <FlexBlock gap={6} align={'center'}>
              <Tooltip
                content={'Добавить новую операцию в текущую фин. модель.'}
                theme={'light'}
                delay={100}
                strategy={'fixed'}
                placement={'top'}
              >
                <EmptyButtonStyled onClick={onCreateEvent}>
                  <PlusIcon size={24} color={currentColor} />
                </EmptyButtonStyled>
              </Tooltip>
              <Tooltip
                content={'Скрыть/Показать панель с фильтрами. При скрытии фильтры не сбрасываются.'}
                theme={'light'}
                delay={100}
                placement={'top'}
                strategy={'fixed'}
              >
                <EmptyButtonStyled
                  onClick={() => table.setShowColumnFilters((prev) => !prev)}
                >
                  <FiltersIcon
                    size={24}
                    color={
                      table.getState().showColumnFilters
                        ? currentColor
                        : defaultColor
                    }
                  />
                </EmptyButtonStyled>
              </Tooltip>
              <Tooltip
                content={'Сбросить состояние всех фильтров и закрыть их.'}
                placement={'top'}
                theme={'light'}
                delay={100}
                strategy={'fixed'}
              >
                <EmptyButtonStyled
                  onClick={() => {
                    resetColumnFiltersState();
                    table.setShowColumnFilters(false);
                  }}
                >
                  <CancelIcon color={defaultColor} size={24} />
                </EmptyButtonStyled>
              </Tooltip>
            </FlexBlock>
          );
        }}
        renderBottomToolbarCustomActions={({ table }) => (
          <OperationTableFooter model={model} table={table} />
        )}
        enableDensityToggle={false}
        enableBottomToolbar={true}
        enableStickyHeader={true}
        enableTableHead={true}
        enableEditing={false}
        enableSorting={true}
        enableFilterMatchHighlighting={false}
        enableRowVirtualization={true} //
        enableExpandAll={false}
        enableExpanding={false}
        muiTopToolbarProps={{
          sx: {
            borderBottom: `1px solid ${disabledColor}`,
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            borderTop: `1px solid ${disabledColor}`,
            display: 'flex',
            alignItems: 'center',
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            verticalAlign: 'top',
          },
        }}
        muiTablePaperProps={{
          sx: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: `none`,
            border: `1px solid ${disabledColor}`,
            borderRadius: borderRadiusSize.sm,
            overflow: 'hidden',
            pl: 1,
            pr: 1,
          },
        }}
        muiTableDetailPanelProps={{
          sx: { width: '100%', boxShadow: `0px 10px 15px ${defaultColor}` },
        }}
        muiTableContainerProps={{
          sx: {
            height: '100%',
          },
        }}
        muiTableBodyRowProps={(props) => ({
          sx: {
            minHeight: 42,
          },
        })}
        renderEmptyRowsFallback={({ table }) => (
          <CenteredContainer>
            <ErrorScreen
              title={'Операции по заданным фильтрам не найдены'}
              errorType={'ERR_FORBIDDEN'}
              action={{
                title: 'Добавить операцию',
                onClick: onCreateEvent,
              }}
            />
          </CenteredContainer>
        )}
        enablePagination={false}
        columns={columns}
        data={data}
        localization={MRT_Localization_RU}
        memoMode={'rows'}
        rowVirtualizerProps={{
          estimateSize: () => 42,
        }}
      />
      {!!modalState && (
        <FinanceOperationModal
          onClose={() => setModalState(null)}
          data={modalState}
          model={model}
        />
      )}
    </>
  );
};