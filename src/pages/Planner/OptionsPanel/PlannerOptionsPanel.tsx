import React, { FC, useCallback, useContext, useMemo } from 'react';
import { FlexBlock } from '../../../components/LayoutComponents/FlexBlock';
import { DaySettingsPanelProps, PlannerMode } from '../planner.types';
import { SmallCalendarMonthTitle } from '../SmallMotnCalendar/SmallCalendarMonthTitle';
import dayjs from 'dayjs';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { GroupList } from '../Groups/GroupList';
import { PourDatesProps, SmallMonth } from '../SmallMotnCalendar/SmallMonth';
import { getCalendarTitle } from '../../../common/functions';
import { CalendarCurrentTitle } from '../Header/CalendarCurrentTitle';
import { css } from 'styled-components';
import { useCreateEventModal } from '../../../hooks/useCreateEventModal';
import { PlannerContext } from '../../../Context/planner.context';
import { PLANNER_LAYOUTS } from '../../../common/constants';

export const PlannerOptionsPanel: FC<DaySettingsPanelProps> = ({}) => {
  const {
    methods: { updateCurrentDate, updateCurrentLayoutAndNavigate },
    currentLayout,
    currentStatus,
    currentDate,
    layoutItems: { optionsPanel: optionsPanelMonthItem },
  } = useContext(PlannerContext);
  const { openModal: openCreateEventModal } = useCreateEventModal({});

  const renderDate: Date = useMemo(() => {
    switch (currentLayout) {
      case PLANNER_LAYOUTS.DAY:
        return currentDate.day;
      case PLANNER_LAYOUTS.WEEK:
        const d = dayjs(currentDate.week);

        if (d.startOf('week').month() !== d.endOf('week').month()) {
          return d.startOf('month').toDate();
        }

        return d.startOf('week').toDate();
      case PLANNER_LAYOUTS.MONTH:
        return dayjs()
          .set('year', currentDate.month.getFullYear())
          .set('month', currentDate.month.getMonth())
          .startOf('month')
          .toDate();
      case PLANNER_LAYOUTS.YEAR:
        return dayjs().startOf('month').toDate();
      case PLANNER_LAYOUTS.LIST:
        return currentDate.list;
      case PLANNER_LAYOUTS.FAVORITES:
        return currentDate.favorites;
    }
  }, [currentLayout, currentDate]);

  const pour: PourDatesProps | undefined = useMemo(() => {
    if (currentLayout === PLANNER_LAYOUTS.WEEK) {
      return {
        type: 'week',
        date: currentDate.week,
      };
    }

    return undefined;
  }, [currentLayout, currentDate]);

  const title: string = useMemo(
    () => getCalendarTitle(currentLayout, currentDate[currentLayout]),
    [currentLayout, currentDate]
  );

  const addTaskHandler = useCallback(() => {
    if (currentLayout !== PLANNER_LAYOUTS.DAY) {
      return openCreateEventModal({ time: new Date().toString() });
    }

    return openCreateEventModal({
      time: currentDate[currentLayout].toString(),
      timeEnd: dayjs(currentDate[currentLayout])
        .add(1, 'hour')
        .toDate()
        .toString(),
    });
  }, [currentDate, currentLayout]);

  const MonthCurrent: PlannerMode = useMemo(
    () => ({
      layout: 'month',
      month: dayjs().month(),
      year: dayjs().year(),
    }),
    []
  );

  return (
    <FlexBlock
      width={'100%'}
      direction={'column'}
      grow={0}
      align={'flex-start'}
      position={'relative'}
      additionalCss={css`
        z-index: 0;
      `}
    >
      <FlexBlock mb={24} width={'100%'} justify={'center'}>
        <CalendarCurrentTitle
          title={title}
          currentLayout={currentLayout}
          statuses={currentStatus}
          onAddTask={addTaskHandler}
          onChangeSwitcherState={updateCurrentDate}
        />
      </FlexBlock>
      <FlexBlock minHeight={200} mb={24}>
        <SmallMonth
          pourDates={pour}
          monthItem={optionsPanelMonthItem}
          title={
            <SmallCalendarMonthTitle
              monthItem={optionsPanelMonthItem}
              onClick={(data) =>
                updateCurrentLayoutAndNavigate(
                  PLANNER_LAYOUTS.MONTH,
                  new Date(data.year, data.monthOfYear, 1)
                )
              }
            />
          }
          current={MonthCurrent}
          value={currentDate[currentLayout]}
          onSelectDate={(date) =>
            updateCurrentLayoutAndNavigate(PLANNER_LAYOUTS.DAY, date.value)
          }
          onSelectWeek={(date) =>
            updateCurrentLayoutAndNavigate(
              PLANNER_LAYOUTS.WEEK,
              date.aroundDate
            )
          }
        />
      </FlexBlock>
      <FlexBlock
        textAlign={'left'}
        mb={24}
        justify={'flex-end'}
        align={'flex-end'}
        width={'100%'}
      >
        <Tooltip
          content={`Рассчитано на основе текущего часового пояса: UTC${
            dayjs().utcOffset() >= 0
              ? `+${dayjs().utcOffset() / 60}`
              : `-${dayjs().utcOffset() / 60}`
          }`}
          placement={'right'}
          children={`Часовой пояс:\n${dayjs.tz.guess()}`}
        />
      </FlexBlock>
      <FlexBlock width={'100%'}>
        <GroupList />
      </FlexBlock>
    </FlexBlock>
  );
};
