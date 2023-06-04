import { DateHelper } from '../common/calendarSupport/dateHelper';
import { currentColor, disabledColor } from '../common/constants/constants';
import { SERVICES_NAMES } from '../common/constants/enums';
import { getPath } from '../common/functions';
import { useCreateEventModal } from './useCreateEventModal';
import { useRemoveFinanceOperationMutation } from '@api/finance-api';
import {
  FINANCE_OPERATION_TYPES,
  FINANCE_SOURCE_MODELS,
  IFinanceModel,
  TFinanceOperationWithDate,
} from '@api/finance-api/types';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { UtcDate } from '@api/rtk-api.types';
import Badge from '@components/Badge';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PencilIcon, PlusIcon, TrashIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { ModalContext } from '@components/LayoutComponents/Modal/Modal';
import {
  FINANCE_OPERATION_TITLES,
  TFinanceOperationFormType,
} from '@planner/EventInfo/LeftBar/Tabs/Finance/components';
import {
  IModalStateCreate,
  IModalStateUpdate,
} from '@planner/EventInfo/LeftBar/Tabs/Finance/components/Forms/UpdateModal';
import { ChangeFinanceOperationState } from '@planner/EventInfo/LeftBar/Tabs/Finance/components/Table/ChangeState';
import { FiltersByDate } from '@planner/EventInfo/LeftBar/Tabs/Finance/components/Table/FiltersByDate';
import { FiltersByNumber } from '@planner/EventInfo/LeftBar/Tabs/Finance/components/Table/FiltersByNumber';
import { FiltersBySelect } from '@planner/EventInfo/LeftBar/Tabs/Finance/components/Table/FiltersBySelect';
import { FiltersByText } from '@planner/EventInfo/LeftBar/Tabs/Finance/components/Table/FiltersByText';
import { OperationHeaderCell } from '@planner/EventInfo/LeftBar/Tabs/Finance/components/Table/HeaderCell';
import { OperationTableCellText } from '@planner/EventInfo/LeftBar/Tabs/Finance/components/Table/ViewComponents';
import {
  buildEventDescriptionFromOperation,
  getFinanceOperationValue,
} from '@planner/EventInfo/LeftBar/Tabs/Finance/utils/table.config';
import {
  FilterFields,
  IColumnFilterState,
  TCallbackData,
  TColumnFilterValuesMap,
  TColumnsFilterFnsMap,
} from '@planner/EventInfo/LeftBar/Tabs/Finance/utils/types';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import dayjs from 'dayjs';
import { MRT_ColumnDef } from 'material-react-table';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface UseFinanceOperationTableReturn {
  onCreateEventFromOperation: TOnCreateEventFromFinanceOperationFn;
  onRemoveFinanceOperation: TOnRemoveFinanceOperationFn;
  modalState: IFinanceOperationModalState;
  setModalState: Dispatch<SetStateAction<IFinanceOperationModalState>>;
  onCreateEvent: TOnCreateEventFromFinanceTable;
  initialSorting: Array<{ id: string; desc: boolean }>;
  columnFilters: IColumnFilterState;
  changeColumnFiltersHandler: <Key extends FilterFields>(
    props: TCallbackData<Key>
  ) => void;
  columns: Array<MRT_ColumnDef<TFinanceOperationWithDate>>;
  resetColumnFiltersState: () => void;
}

interface IUpdateHandlerOptions<T extends keyof UpdateFields> {
  key: T;
  value: UpdateFields[T];
}

type UpdateFields = Pick<
  TFinanceOperationFormType,
  'value' | 'count' | 'name'
> & { date: Date | null };

export type TUpdateOperationFn = <T extends keyof UpdateFields>(
  options: IUpdateHandlerOptions<T>,
  item: TFinanceOperationWithDate,
  index: number
) => Promise<any>;

export interface IUseFinanceOperationTableProps {
  eventInfo: EventInfoModel;
  model: IFinanceModel;
}

export interface IOnCreateEventFromFinanceOperationFnArgs {
  financeOperationItem: TFinanceOperationWithDate;
}

export type TOnCreateEventFromFinanceOperationFn = (
  args: IOnCreateEventFromFinanceOperationFnArgs
) => void;

export interface IOnRemoveFinanceOperationFnArgs {
  financeOperation: TFinanceOperationWithDate;
}

export type TOnRemoveFinanceOperationFn = (
  args: IOnRemoveFinanceOperationFnArgs
) => void;
export type IFinanceOperationModalState =
  | IModalStateCreate
  | IModalStateUpdate
  | null;
export type TOnCreateEventFromFinanceTable = () => void;

export function useFinanceOperationTable(
  props: IUseFinanceOperationTableProps
): UseFinanceOperationTableReturn {
  const { openModal } = useCreateEventModal();
  const modalContext = useContext(ModalContext);
  const layout = useAppSelector(plannerSelectLayout);
  const [modalState, setModalState] =
    useState<IFinanceOperationModalState>(null);

  const [removeOperation] = useRemoveFinanceOperationMutation();

  const onRemoveFinanceOperation: TOnRemoveFinanceOperationFn = useCallback(
    ({ financeOperation }) => {
      if (props.model) {
        removeOperation({
          _id: financeOperation._id,
          model: financeOperation.model,
          sourceModel: props.model?.modelPath || FINANCE_SOURCE_MODELS.EVENT,
          sourceModelId: props.model?.model || '',
        });
      }
    },
    []
  );

  const onCreateEvent: TOnCreateEventFromFinanceTable = useCallback(() => {
    setModalState((prev) => {
      if (prev?.actionType === 'create') {
        return {
          ...prev,
          show: true,
        };
      }

      return {
        show: true,
        actionType: 'create',
        data: {
          name: '',
          operationType: FINANCE_OPERATION_TYPES.INCOME,
          date: dayjs(props.eventInfo.time).toDate(),
          count: 1,
          value: 0,
          description: '',
          _id: '',
        },
      };
    });
  }, []);

  const onCreateEventFromOperation: TOnCreateEventFromFinanceOperationFn =
    useCallback(({ financeOperationItem }) => {
      const action = () => {
        const time = financeOperationItem.date || props.eventInfo.time;

        openModal(
          {
            time: time.toString(),
            timeEnd: dayjs(time).add(1, 'hour').toDate().toString(),
            title: financeOperationItem.name,
            description: buildEventDescriptionFromOperation(
              financeOperationItem,
              props.eventInfo
            ),
            parentId: props.eventInfo._id,
            group: props.eventInfo.group?._id,
            systemDescription: {
              title: 'Событие создано на основе фин. операции',
              message: `Событие было создано от финансовой операции "${financeOperationItem.name}", закрепленной за событием "${props.eventInfo.title}".`,
              model: 'FinanceOperation',
              modelId: financeOperationItem._id,
              data: {
                ...financeOperationItem,
                date: financeOperationItem.date?.toString() || null,
              },
              fromEvent: props.eventInfo._id,
            },
          },
          {
            modalPath: getPath(SERVICES_NAMES.PLANNER, layout, 'event/create'),
            useReturnBackOnDecline: true,
          }
        );
      };
      if (modalContext?.closeModalAnimation) {
        modalContext.closeModalAnimation().then(action);
      } else {
        action();
      }
    }, []);

  const initialSorting = useMemo(() => [{ id: 'date', desc: true }], []);

  const [columnFilters, setColumnFilters] = useState<IColumnFilterState>({
    fns: {
      result: 'greaterThanOrEqualTo',
      count: 'greaterThanOrEqualTo',
      value: 'greaterThanOrEqualTo',
      name: 'includesString',
      operationType: 'equalsString',
      date: 'greaterThan',
    },
    values: [],
  });

  const changeColumnFiltersHandler = useCallback(
    function <Key extends FilterFields>(props: TCallbackData<Key>) {
      setColumnFilters((prev) => {
        const result = { fns: { ...prev.fns }, values: [...prev.values] };

        if (props.pattern) {
          result.fns = {
            ...result.fns,
            [props.key]: props.pattern,
          };
        }

        const index = result.values.findIndex((item) => item.id === props.key);

        if (index !== -1) {
          if (props.value) {
            result.values[index].value = props.value;
          } else {
            result.values.splice(index, 1);
          }
        } else {
          if (props.value) {
            result.values.push({
              id: props.key,
              value: props.value as NonNullable<
                TCallbackData<typeof props.key>['value']
              >,
            } as unknown as TColumnFilterValuesMap[typeof props.key]);
          }
        }

        return result;
      });
    },
    [setColumnFilters]
  );

  const resetColumnFiltersState = useCallback(() => {
    setColumnFilters((prev) => ({ ...prev, values: [] }));
  }, []);

  const columns: Array<MRT_ColumnDef<TFinanceOperationWithDate>> = useMemo(
    () => [
      {
        header: 'Статус',
        Header: (
          <OperationHeaderCell
            cellName={'Статус'}
            withTooltip={true}
            tooltipContent={
              'Статус операции бывает подтвержденный или не подтвержденный. Отличие в том, что подтвержденная операция уже произошла на самом деле. Нажмите на чекбокс напротив операции, чтобы подтвердить ее.'
            }
          />
        ),
        Cell: ({ row }) => {
          return (
            <ChangeFinanceOperationState
              index={row.index}
              operationId={row.original._id}
              prevState={row.original.state}
              modelId={props.model._id}
            />
          );
        },
        enableColumnFilter: false,
        accessorKey: 'state',
        maxSize: 100,
        minSize: 100,
        enableSorting: true,
        sortingFn: 'basic',
      },
      {
        header: 'Наименование',
        accessorKey: 'name',
        maxSize: 300,
        minSize: 250,
        enableSorting: true,
        sortingFn: 'text',
        Filter: ({ column }) => {
          const filterFn = column.getFilterFn()
            ?.name as TColumnsFilterFnsMap['name'];

          return (
            <FiltersByText
              initialValue={(column.getFilterValue() || '') as string}
              onChange={(value) =>
                changeColumnFiltersHandler({
                  key: 'name',
                  value,
                  pattern: filterFn,
                })
              }
            />
          );
        },
        Header: (
          <OperationHeaderCell
            cellName={'Наименование'}
            withTooltip={false}
            tooltipContent={
              'Чтобы редактировать наименование операции нажмите на нужную ячейку дважды и внесите изменения'
            }
            cellNameProps={{ maxWidth: 200 }}
          />
        ),
        Cell: ({ cell }) => (
          <OperationTableCellText value={cell.getValue<string>()} />
        ),
      },
      {
        header: 'Дата',
        accessorKey: 'date',
        enableColumnFilter: true,
        maxSize: 170,
        minSize: 150,
        enableSorting: true,
        sortingFn: 'datetime',
        Filter: ({ column }) => {
          const filterFn = column.getFilterFn()
            ?.name as TColumnsFilterFnsMap['date'];

          return (
            <FiltersByDate
              initialState={{
                pattern: filterFn,
                value: (column.getFilterValue() || null) as Date | null,
              }}
              onChange={(data) =>
                changeColumnFiltersHandler({ key: 'date', ...data })
              }
              onDecline={() =>
                changeColumnFiltersHandler({
                  key: 'date',
                  pattern: filterFn,
                  value: null,
                })
              }
            />
          );
        },
        Header: (
          <OperationHeaderCell
            cellName={'Дата'}
            tooltipContent={
              'Чтобы редактировать дату операции нажмите на нужную ячейку дважды и внесите изменения'
            }
            withTooltip={false}
          />
        ),
        Cell: ({ cell }) => {
          const value = cell.getValue<UtcDate | null>();

          return (
            <OperationTableCellText
              value={
                value
                  ? DateHelper.getHumanizeDateValue(value, {
                      withTime: true,
                      withYear: true,
                      monthPattern: 'short',
                      yearPattern: 'short',
                    })
                  : ''
              }
            />
          );
        },
      },
      {
        header: 'Тип операции',
        accessorKey: 'operationType',
        maxSize: 120,
        filterVariant: 'select',
        enableEditing: false,
        enableSorting: true,
        sortingFn: 'text',
        Filter: ({ column }) => (
          <FiltersBySelect
            initialState={
              (column.getFilterValue() ||
                null) as FINANCE_OPERATION_TYPES | null
            }
            onChange={(data) =>
              changeColumnFiltersHandler({
                key: 'operationType',
                value: data,
                pattern: 'equalsString',
              })
            }
          />
        ),
        Header: <OperationHeaderCell cellName={'Тип'} />,
        Cell: ({ cell }) => {
          const value = cell.getValue<FINANCE_OPERATION_TYPES>();

          return <Badge type={value}>{FINANCE_OPERATION_TITLES[value]}</Badge>;
        },
      },
      {
        header: 'Сумма',
        accessorKey: 'value',
        maxSize: 170,
        minSize: 150,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        Filter: ({ rangeFilterIndex, table, header, column }) => {
          const filterFn = column.getFilterFn()
            ?.name as TColumnsFilterFnsMap['result'];

          return (
            <FiltersByNumber
              initialState={{
                pattern: filterFn,
                value: (column.getFilterValue() || null) as number | null,
              }}
              onChange={(data) =>
                changeColumnFiltersHandler({ key: 'value', ...data })
              }
            />
          );
        },
        Cell: ({ cell }) => (
          <OperationTableCellText
            value={getFinanceOperationValue(cell.getValue<number>())}
          />
        ),
        Header: (
          <OperationHeaderCell
            cellName={'Сумма'}
            tooltipContent={
              'Чтобы редактировать сумму операции операции нажмите на нужную ячейку дважды и внесите изменения'
            }
            withTooltip={false}
          />
        ),
      },
      {
        header: 'Кол-во',
        accessorKey: 'count',
        maxSize: 170,
        minSize: 150,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        Filter: ({ rangeFilterIndex, table, header, column }) => {
          const filterFn = column.getFilterFn()
            ?.name as TColumnsFilterFnsMap['count'];

          return (
            <FiltersByNumber
              initialState={{
                pattern: filterFn,
                value: (column.getFilterValue() || null) as number | null,
              }}
              onChange={(data) =>
                changeColumnFiltersHandler({ key: 'count', ...data })
              }
            />
          );
        },
        Header: (
          <OperationHeaderCell
            cellName={'Кол-во'}
            tooltipContent={
              'Чтобы редактировать количество повторений операции нажмите на нужную ячейку дважды и внесите изменения'
            }
            withTooltip={false}
          />
        ),
        Cell: ({ cell }) => (
          <OperationTableCellText value={cell.getValue<number>()} />
        ),
      },
      {
        header: 'Результат',
        accessorKey: 'result',
        maxSize: 200,
        enableEditing: false,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        Header: <OperationHeaderCell cellName={'Результат'} />,
        Filter: ({ rangeFilterIndex, table, header, column }) => {
          const filterFn = column.getFilterFn()
            ?.name as TColumnsFilterFnsMap['result'];

          column.getFilterValue();
          return (
            <FiltersByNumber
              initialState={{
                value: (column.getFilterValue() || null) as number | null,
                pattern: filterFn,
              }}
              onChange={(data) =>
                changeColumnFiltersHandler({ key: 'result', ...data })
              }
            />
          );
        },
        Cell: ({ row }) => {
          const a = row.original.value * row.original.count;
          return <OperationTableCellText value={getFinanceOperationValue(a)} />;
        },
      },
      {
        header: 'Действия',
        accessorKey: '_id',
        maxSize: 100,
        Header: <OperationHeaderCell cellName={'Действия'} />,
        enableEditing: false,
        enableColumnFilter: false,
        enableColumnFilterModes: false,
        enableGlobalFilter: false,
        enableSorting: false,
        colSpan: 2,
        Cell: ({ row }) => {
          return (
            <FlexBlock gap={6} direction={'row'}>
              <EmptyButtonStyled>
                <PlusIcon
                  size={15}
                  onClick={() => {
                    onCreateEventFromOperation({
                      financeOperationItem: row.original,
                    });
                  }}
                />
              </EmptyButtonStyled>
              <EmptyButtonStyled
                onClick={() =>
                  setModalState({
                    actionType: 'update',
                    data: row.original,
                    index: row.index,
                    show: true,
                  })
                }
              >
                <PencilIcon size={15} color={currentColor} />
              </EmptyButtonStyled>
              <EmptyButtonStyled
                onClick={() => {
                  onRemoveFinanceOperation({
                    financeOperation: row.original,
                  });
                }}
              >
                <TrashIcon size={15} color={disabledColor} />
              </EmptyButtonStyled>
            </FlexBlock>
          );
        },
      },
    ],
    []
  );

  return {
    onCreateEventFromOperation,
    onRemoveFinanceOperation,
    modalState,
    onCreateEvent,
    setModalState,
    columns,
    columnFilters,
    changeColumnFiltersHandler,
    initialSorting,
    resetColumnFiltersState,
  };
}