import React, { FC, useCallback } from 'react';
import { EventsStorage, ListCalendarModeProps } from '../../planner.types';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { FindEventFilter } from '../FindEventFilter/FindEventFilter';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { changePlanner } from '../../../../store/reducers/planner-reducer';
import { ListModeTaskController } from './ListModeTaskController';
import { useEventStorage } from '../../../../hooks/useEventStorage';
import { ShortEventInfoModel } from '../../../../store/api/planning-api/types/event-info.types';

export const ListCalendarMode: FC<ListCalendarModeProps> = ({
  current,
  onSelectTask,
}) => {
  const dispatch = useAppDispatch();
  const {
    TaskStorage,
    SwitcherBadges,
    handlers,
    filters,
    debounceValue,
    isFetching,
  } = useEventStorage({
    layout: 'list',
    scope: {
      start: current.fromDate,
      end: current.toDate,
    },
  });

  const onChangeDate = useCallback(
    (date: Date | null, type: 'start' | 'end') => {
      if (type === 'start') {
        handlers.start(date);
        return dispatch(
          changePlanner({
            layout: 'list',
            date: {
              layout: 'list',
              fromDate: date?.toString() || '',
              toDate: current.toDate.toString(),
            },
          })
        );
      }

      if (type === 'end') {
        handlers.end(date);
        return dispatch(
          changePlanner({
            layout: 'list',
            date: {
              layout: 'list',
              fromDate: current.fromDate.toString(),
              toDate: date?.toString() || '',
            },
          })
        );
      }
    },
    [current]
  );

  return (
    <FlexBlock width={'100%'} direction={'column'} mt={4} mb={4}>
      <FlexBlock width={'100%'} mb={8}>
        <FindEventFilter
          values={filters}
          onChangeHandlers={{
            ...handlers,
            start: (date) => onChangeDate(date, 'start'),
            end: (date) => onChangeDate(date, 'end'),
          }}
          statusBadges={SwitcherBadges}
          isLoading={isFetching}
        />
      </FlexBlock>
      <FlexBlock
        overflowY={'auto'}
        overflowX={'hidden'}
        position={'relative'}
        direction={'column'}
        height={'100vh'}
        width={'100%'}
        ml={-8}
        mr={-8}
        pl={8}
        pr={8}
      >
        <ListModeTaskController
          eventStorage={TaskStorage as EventsStorage<ShortEventInfoModel>}
          fromDate={debounceValue.start}
          toDate={debounceValue.end}
          onSelectTask={onSelectTask}
        />
      </FlexBlock>
    </FlexBlock>
  );
};
