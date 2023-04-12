import {
  useGetEventsCountOfStatusQuery,
  useGetShortEventsArrayQuery,
} from '@api/planning-api';
import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';
import { ObjectId } from '@api/rtk-api.types';
import { Accordion } from '@components/Accordion/Accordion';
import { Badge } from '@components/Badge/Badge';
import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';
import { Button } from '@components/Buttons/Buttons.styled';
import { EventEssence } from '@components/Essences/EventEssence/EventEssence';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { initialFiltersValues, useEventFilters } from '@hooks/useEventFilters';
import {
  GlobalTaskListProps,
  OnSelectTaskFnType,
} from '@planner/planner.types';
import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';
import { EVENT_INFORMER_TAB_NAMES } from '@planner/TaskInformer/LeftBar/TaskInformerLeftBar';
import {
  currentColor,
  defaultColor,
  MonthList,
  PLANNER_LAYOUTS,
  UTC_OFFSET,
} from '@src/common/constants';
import { PlannerContext } from '@src/Context/planner.context';
import dayjs from 'dayjs';
import React, { FC, useCallback, useContext, useMemo } from 'react';
import { NotFoundTask } from './NotFoundTasks';

interface DayTaskListProps extends GlobalTaskListProps {
  day: Date;
  onSelectTask?: OnSelectTaskFnType;
}

export const DayTaskList: FC<DayTaskListProps> = ({ day }) => {
  const {
    currentDate,
    currentStatus,
    methods: { updateCurrentLayoutAndNavigate, plannerNavigate },
  } = useContext(PlannerContext);

  const { filters, debounceValue, setFiltersState, handlers } = useEventFilters(
    {
      initialValues: initialFiltersValues(currentDate.day, currentStatus),
      layout: PLANNER_LAYOUTS.DAY,
    }
  );

  const queryArgs = useMemo(() => {
    return {
      fromDate: dayjs(currentDate.day).startOf('day').toDate().toString() || '',
      toDate: dayjs(currentDate.day).endOf('day').toDate().toString() || '',
      title: debounceValue.title,
      priority:
        debounceValue.priority === 'not_selected'
          ? null
          : debounceValue.priority,
      utcOffset: UTC_OFFSET,
      findOnlyInSelectedGroups: true,
      taskStatus: debounceValue.taskStatus,
    };
  }, [debounceValue, currentDate.day]);

  const {
    data,
    error,
    isFetching: isFetchingTasks,
  } = useGetShortEventsArrayQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: SwitcherBadges,
    refetch: refetchTaskCount,
    isFetching: isFetchingStatuses,
  } = useGetEventsCountOfStatusQuery(queryArgs);

  const clearFiltersHandle = useCallback(() => {
    setFiltersState(initialFiltersValues(currentDate.day, filters.taskStatus));
  }, [currentDate, filters.taskStatus]);

  const selectEventHandler = useCallback(
    (_id: ObjectId | null | undefined) => {
      if (_id) {
        plannerNavigate('eventInfo').go(_id, EVENT_INFORMER_TAB_NAMES.ABOUT);
      }
    },
    [plannerNavigate]
  );

  return (
    <ScrollVerticalView
      staticContent={
        <FlexBlock direction={'column'}>
          <BreadCrumbs
            data={[
              {
                title: `${currentDate.day.getFullYear()}г.`,
                value: PLANNER_LAYOUTS.YEAR,
              },
              {
                title: `${MonthList[currentDate.day.getMonth()]}`,
                value: PLANNER_LAYOUTS.MONTH,
              },
              {
                title: `Неделя ${dayjs(currentDate.day).week()}`,
                value: PLANNER_LAYOUTS.WEEK,
              },
            ]}
            onClick={(data) => {
              // updateCurrentLayoutAndNavigate(data, currentDate.day);
            }}
          />
          <FindEventFilter
            statusBadges={SwitcherBadges?.data}
            values={filters}
            isLoading={isFetchingTasks || isFetchingStatuses}
            onChangeHandlers={handlers}
          />
        </FlexBlock>
      }
      placementStatic={'top'}
      renderPattern={'top-bottom'}
    >
      {(data?.throughEvents?.length === 0 && data?.baseEvents?.length === 0) ||
      !data ||
      error ? (
        <FlexBlock
          width={'100%'}
          height={'100%'}
          justify={'center'}
          align={'center'}
        >
          <NotFoundTask
            day={day}
            text={
              <>
                По указанным фильтрам <br />
                ничего не найдено!
              </>
            }
            actions={
              <Button onClick={clearFiltersHandle}>Очистить фильтры</Button>
            }
          />
        </FlexBlock>
      ) : (
        <FlexBlock
          direction={'column'}
          width={'100%'}
          height={'max-content'}
          gap={12}
        >
          {!!data?.baseEvents?.length && (
            <Accordion
              zIndex={1}
              title={
                <FlexBlock
                  width={'100%'}
                  p={'4px 6px'}
                  align={'center'}
                  justify={'flex-start'}
                  fSize={22}
                  style={{ color: currentColor }}
                  fWeight={'bold'}
                >
                  <span style={{ fontSize: 22 }}>
                    Внутри дня{' '}
                    <Badge style={{ fontSize: 18, color: defaultColor }}>
                      {data.baseEvents.length}
                    </Badge>
                  </span>
                </FlexBlock>
              }
            >
              <FlexBlock direction={'column'} gap={6}>
                {data.baseEvents.map((task) => (
                  <EventEssence
                    status={task.status}
                    priority={task.priority}
                    title={task.title}
                    eventId={task._id}
                    description={task.description}
                    time={task.time}
                    timeEnd={task.timeEnd}
                    group={task.group}
                    onTitleClick={selectEventHandler}
                  />
                ))}
              </FlexBlock>
            </Accordion>
          )}
          {!!data?.throughEvents?.length && (
            <Accordion
              zIndex={2}
              initialState={true}
              title={
                <FlexBlock
                  width={'100%'}
                  p={'4px 6px'}
                  align={'center'}
                  justify={'flex-start'}
                  fSize={22}
                  style={{ color: currentColor }}
                  fWeight={'bold'}
                >
                  <span style={{ fontSize: 22 }}>
                    Сквозные события{' '}
                    <Badge style={{ fontSize: 18, color: defaultColor }}>
                      {data.throughEvents.length}
                    </Badge>
                  </span>
                </FlexBlock>
              }
            >
              <FlexBlock direction={'column'} gap={6}>
                {data.throughEvents.map((task: ShortEventInfoModel, index) => (
                  <EventEssence
                    status={task.status}
                    priority={task.priority}
                    title={task.title}
                    eventId={task._id}
                    description={task.description}
                    time={task.time}
                    timeEnd={task.timeEnd}
                    group={task.group}
                    onTitleClick={selectEventHandler}
                  />
                ))}
              </FlexBlock>
            </Accordion>
          )}
        </FlexBlock>
      )}
    </ScrollVerticalView>
  );
};
