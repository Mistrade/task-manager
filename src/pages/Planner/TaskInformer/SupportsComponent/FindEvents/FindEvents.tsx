import { FC, ReactNode, useEffect } from 'react';
import { useLazyGetShortEventsArrayQuery } from '../../../../../store/api/planning-api';
import { ExtendSelectableEventListProps } from './EventsList';
import { FlexBlock } from '../../../../../components/LayoutComponents/FlexBlock';
import { useEventFilters } from '../../../../../hooks/useEventFilters';
import { SmartFindEventFilters } from './SmartFindEventFilters';
import { css } from 'styled-components';
import { PreviewEventsList } from './PreviewEventsList';
import {
  EventInfoModel,
  GetEventsFiltersRequestProps,
} from '../../../../../store/api/planning-api/types/event-info.types';

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
  const { debounceValue, filters, setFiltersState, handlers } = useEventFilters(
    {
      initialValues: {
        title: null,
        status: 'all',
        priority: null,
        // exclude: excludeFromFilters,
        // utcOffset: dayjs().utcOffset(),
        // chainsFilter,
      },
      debounceTimeout: 500,
      useNavigate: false,
      layout: 'day',
    }
  );

  useEffect(() => {
    console.log(debounceValue);
  }, [debounceValue]);

  const [
    getEventsArray,
    { data: eventsArray, isFetching: isFetchingTaskList, error },
  ] = useLazyGetShortEventsArrayQuery();

  {
    /*useEffect(() => {*/
  }
  {
    /*  const {*/
  }
  //     end,
  //     title,
  //     priority,
  //     onlyFavorites,
  //     start,
  //     taskStatus,
  //     exclude,
  //     chainsFilter: ch,
  //   } = debounceValue;
  {
    /*  const startDate = dayjs(start);*/
  }
  {
    /*  const endDate = dayjs(end);*/
  }
  //
  //   if (
  //     (start && !startDate.isValid()) ||
  //     (end && !endDate.isValid()) ||
  //     startDate.isSame(end, 'minutes')
  //   ) {
  {
    /*    return;*/
  }
  {
    /*  }*/
  }

  {
    /*  if (title || priority || end || start) {*/
  }
  //     getEventsArray({
  //       utcOffset: dayjs().utcOffset(),
  //       title,
  //       priority,
  //       fromDate: start ? dayjs(start).utc().toString() : '',
  //       toDate: end ? dayjs(end).utc().toString() : '',
  //       taskStatus,
  //       exclude,
  //       chainsFilter: ch,
  //     })
  //       .unwrap()
  //       .then((r) => console.log(r))
  //       .catch(CatchHandleForToast);
  //   }
  // }, [debounceValue]);

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
