import React, { FC, useCallback, useContext, useMemo } from 'react';
import { FlexBlock } from '../../../../../components/LayoutComponents/FlexBlock';
import {
  GlobalTaskListProps,
  OnSelectTaskFnType,
} from '../../../planner.types';
import dayjs from 'dayjs';
import { Button } from '../../../../../components/Buttons/Buttons.styled';
import { FindEventFilter } from '../../FindEventFilter/FindEventFilter';
import {
  useGetEventsCountOfStatusQuery,
  useGetShortEventsArrayQuery,
  useRemoveEventMutation,
} from '../../../../../store/api/planning-api';
import { DayTaskItem } from './DayTaskItem';
import { NotFoundTask } from './NotFoundTasks';
import {
  initialFiltersValues,
  useEventFilters,
} from '../../../../../hooks/useEventFilters';
import {
  currentColor,
  defaultColor,
  MonthList,
  PLANNER_LAYOUTS,
  UTC_OFFSET,
} from '../../../../../common/constants';
import { Accordion } from '../../../../../components/Accordion/Accordion';
import { Badge } from '../../../../../components/Badge/Badge';
import { PlannerContext } from '../../../../../Context/planner.context';
import { ScrollVerticalView } from '../../../../../components/LayoutComponents/ScrollView/ScrollVerticalView';
import { BreadCrumbs } from '../../../../../components/BreadCrumbs/BreadCrumbs';

interface DayTaskListProps extends GlobalTaskListProps {
  day: Date;
  onSelectTask?: OnSelectTaskFnType;
}

export const DayTaskList: FC<DayTaskListProps> = ({ onSelectTask, day }) => {
  const {
    currentDate,
    currentStatus,
    methods: { updateCurrentLayoutAndNavigate },
  } = useContext(PlannerContext);

  const { filters, debounceValue, setFiltersState, handlers } = useEventFilters(
    {
      initialValues: initialFiltersValues(currentStatus),
      layout: PLANNER_LAYOUTS.DAY,
    }
  );

  const queryArgs = useMemo(() => {
    return {
      fromDate: dayjs(currentDate.day).startOf('date').toDate().toString(),
      toDate: dayjs(currentDate.day).endOf('date').toDate().toString(),
      title: debounceValue.title,
      priority:
        debounceValue.priority === 'not_selected'
          ? null
          : debounceValue.priority,
      utcOffset: UTC_OFFSET,
      findOnlyInSelectedGroups: true,
      taskStatus: debounceValue.status,
    };
  }, [debounceValue, currentDate]);

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

  const [removeTask] = useRemoveEventMutation();

  const clearFiltersHandle = useCallback(() => {
    setFiltersState(initialFiltersValues(filters.status));
  }, [currentDate, filters.status]);

  const memoRefetchTaskCount = useCallback(async () => {
    await refetchTaskCount();
  }, []);

  return (
    <ScrollVerticalView
      containerProps={{
        mt: 6,
        pt: 4,
        pb: 4,
      }}
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
              updateCurrentLayoutAndNavigate(data, currentDate.day);
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
                  <span>
                    Сквозные события{' '}
                    <Badge style={{ fontSize: 18, color: defaultColor }}>
                      {data.throughEvents.length}
                    </Badge>
                  </span>
                </FlexBlock>
              }
            >
              {data.throughEvents.map((task, index) => (
                <DayTaskItem
                  key={task._id}
                  taskInfo={task}
                  day={day}
                  tabIndex={index + 1}
                  onSelectTask={onSelectTask}
                  onDelete={async (id) =>
                    await removeTask({ eventId: id }).unwrap()
                  }
                  refetchTaskList={memoRefetchTaskCount}
                />
              ))}
            </Accordion>
          )}
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
                  <span>
                    Список событий{' '}
                    <Badge style={{ fontSize: 18, color: defaultColor }}>
                      {data.baseEvents.length}
                    </Badge>
                  </span>
                </FlexBlock>
              }
            >
              {data.baseEvents.map((task, index) => (
                <DayTaskItem
                  key={task._id}
                  taskInfo={task}
                  day={day}
                  tabIndex={index + 1}
                  onSelectTask={onSelectTask}
                  onDelete={async (id) =>
                    await removeTask({ eventId: id }).unwrap()
                  }
                  refetchTaskList={memoRefetchTaskCount}
                />
              ))}
            </Accordion>
          )}
        </FlexBlock>
      )}
    </ScrollVerticalView>
  );
};
