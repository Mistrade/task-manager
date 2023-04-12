import React, { FC, useCallback, useContext, useMemo } from 'react';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { DaySettingsPanelProps, PlannerMode } from '@planner/planner.types';
import { SmallCalendarMonthTitle } from '@planner/SmallMotnCalendar/SmallCalendarMonthTitle';
import dayjs from 'dayjs';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { GroupList } from '@planner/Groups/GroupList';
import {
  PourDatesProps,
  SmallMonth,
} from '@planner/SmallMotnCalendar/SmallMonth';
import { getCalendarTitle } from '@src/common/functions';
import { CalendarCurrentTitle } from '@planner/Header/CalendarCurrentTitle';
import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { PlannerContext } from '@src/Context/planner.context';
import { PLANNER_LAYOUTS } from '@src/common/constants';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';

export const PlannerOptionsPanel: FC<DaySettingsPanelProps> = ({}) => {
  const {
    methods: { updateCurrentDate, updateCurrentLayoutAndNavigate },
    currentLayout,
    currentStatus,
    currentDate,
    layoutItems: { optionsPanel: optionsPanelMonthItem },
  } = useContext(PlannerContext);
  const { openModal: openCreateEventModal } = useCreateEventModal({});

  // const renderDate: Date = useMemo(() => {
  //   switch (currentLayout) {
  //     case PLANNER_LAYOUTS.DAY:
  //       return currentDate.day;
  //     case PLANNER_LAYOUTS.WEEK:
  //       const d = dayjs(currentDate.week);
  //
  //       if (d.startOf('week').month() !== d.endOf('week').month()) {
  //         return d.startOf('month').toDate();
  //       }
  //
  //       return d.startOf('week').toDate();
  //     case PLANNER_LAYOUTS.MONTH:
  //       return dayjs()
  //         .set('year', currentDate.month.getFullYear())
  //         .set('month', currentDate.month.getMonth())
  //         .startOf('month')
  //         .toDate();
  //     case PLANNER_LAYOUTS.YEAR:
  //       return dayjs().startOf('month').toDate();
  //     case PLANNER_LAYOUTS.LIST:
  //       return currentDate.list;
  //     case PLANNER_LAYOUTS.FAVORITES:
  //       return currentDate.favorites;
  //   }
  // }, [currentLayout, currentDate]);

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
    <ScrollVerticalView
      gap={24}
      renderPattern={'top-bottom'}
      placementStatic={'top'}
      staticContent={
        <CalendarCurrentTitle
          title={title}
          currentLayout={currentLayout}
          statuses={currentStatus}
          onAddTask={addTaskHandler}
          onChangeSwitcherState={updateCurrentDate}
        />
      }
    >
      <FlexBlock gap={24} direction={'column'}>
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
        <FlexBlock
          textAlign={'left'}
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
    </ScrollVerticalView>
  );
};
