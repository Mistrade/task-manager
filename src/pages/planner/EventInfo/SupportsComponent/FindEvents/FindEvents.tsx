import { useEventFilters } from '@hooks/useEventFilters';
import dayjs from 'dayjs';
import { FC, ReactNode, useEffect } from 'react';
import { css } from 'styled-components';

import { UTC_OFFSET } from '@src/common/constants/defaultConstants';

import { FlexBlock } from '@components/LayoutComponents';

import { useLazyGetShortEventsArrayQuery } from '@api/planning-api';
import {
  EventInfoModel,
  GetEventsFiltersRequestProps,
} from '@api/planning-api/types/event-info.types';
import { CatchHandleForToast } from '@api/tools';

import { ExtendSelectableEventListProps } from './EventsList';
import { PreviewEventsList } from './PreviewEventsList';
import { SmartFindEventFilters } from './SmartFindEventFilters';

export interface FindEventsProps
  extends Partial<ExtendSelectableEventListProps> {
  buttons?: ReactNode;
  taskInfo: EventInfoModel;
  excludeFromFilters?: GetEventsFiltersRequestProps['exclude'];
  chainsFilter?: GetEventsFiltersRequestProps['chainsFilter'];
}

export const FindEvents: FC<FindEventsProps> = ({
  selectedEvents,
  onSelect,
  onSelectActionType,
  buttons,
  taskInfo,
  excludeFromFilters,
  chainsFilter,
}) => {
  const { debounceValue, filters, handlers } = useEventFilters({
    initialValues: {
      start: null,
      end: null,
      title: null,
      taskStatus: 'all',
      priority: null,
      exclude: excludeFromFilters,
      utcOffset: UTC_OFFSET,
      chainsFilter,
    },
    debounceTimeout: 500,
    useNavigate: false,
    layout: 'day',
  });

  const [
    getEventsArray,
    { data: eventsArray, isFetching: isFetchingTaskList, error },
  ] = useLazyGetShortEventsArrayQuery();

  useEffect(() => {
    const {
      end,
      title,
      priority,
      onlyFavorites,
      start,
      taskStatus,
      exclude,
      chainsFilter: ch,
    } = debounceValue;

    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (
      (start && !startDate.isValid()) ||
      (end && !endDate.isValid()) ||
      startDate.isSame(end, 'minutes')
    ) {
      return;
    }

    if (title || priority || end || start) {
      getEventsArray({
        utcOffset: UTC_OFFSET,
        title,
        priority,
        fromDate: start ? dayjs(start).utc().toString() : '',
        toDate: end ? dayjs(end).utc().toString() : '',
        taskStatus,
        exclude,
        onlyFavorites: false,
        chainsFilter: ch,
      })
        .unwrap()
        .then((r) => console.log(r))
        .catch(CatchHandleForToast);
    }
  }, [debounceValue]);

  return (
    <PreviewEventsList
      title={
        <FlexBlock direction={'column'} gap={12}>
          <FlexBlock
            width={'100%'}
            additionalCss={css`
              z-index: 1;
            `}
          >
            <SmartFindEventFilters
              values={filters}
              onChangeHandlers={handlers}
            />
          </FlexBlock>
        </FlexBlock>
      }
      selectedEvents={selectedEvents || []}
      onSelectActionType={onSelectActionType || 'select'}
      eventsArray={eventsArray}
      onSelect={onSelect}
      isLoading={isFetchingTaskList}
      error={(error && 'status' in error && error.data.info) || undefined}
      buttons={buttons}
    />
  );
};
