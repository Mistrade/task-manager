import { FC, ReactNode } from 'react';

import {
  MonthList,
  WeekDaysShortList,
  defaultColor,
} from '@src/common/constants';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { DateWithTooltipProps } from '@planner/SmallMotnCalendar/DateWithTooltipPlanner';
import {
  MonthItem,
  OnSelectDateFromCalendarFn,
  PlannerMonthMode,
  PlannerWeekMode,
} from '@planner/planner.types';

import { GetEventsSchemeResponse } from '@api/planning-api/types/event-info.types';

import { SmallMonthRow } from './SmallMonth.styled';
import { SmallMonthWeekItem } from './SmallMonthWeekItem';

export interface PourDatesProps {
  type: 'week' | 'month';
  date: Date;
}

export interface SmallMonthProps {
  current: PlannerMonthMode;
  value?: Date;
  onSelectDate?: OnSelectDateFromCalendarFn;
  monthItem: MonthItem;
  title?: ReactNode;
  onSelectWeek?: (current: PlannerWeekMode) => void;
  includesTasks?: GetEventsSchemeResponse;
  pourDates?: PourDatesProps;
  useTooltips?: boolean;
  dateComponent?: (props: DateWithTooltipProps) => ReactNode;
}

export const SmallMonth: FC<SmallMonthProps> = ({
  current,
  onSelectDate,
  monthItem,
  value,
  includesTasks,
  pourDates,
  onSelectWeek,
  title,
  useTooltips,
  dateComponent,
}) => {
  return (
    <FlexBlock
      justify={'center'}
      align={'center'}
      // style={{zIndex: 0}}
    >
      <FlexBlock direction={'column'} gap={4}>
        <FlexBlock>
          {title || <h2>{MonthList[monthItem?.monthOfYear || 1]}</h2>}
        </FlexBlock>
        <SmallMonthRow>
          <FlexBlock className={'row--item'} />
          {WeekDaysShortList.map((item, index, arr) => (
            <FlexBlock
              className={'row--item'}
              key={`weekDay_${item}_short`}
              borderBottom={`1px solid ${defaultColor}`}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </FlexBlock>
          ))}
        </SmallMonthRow>
        {monthItem?.weeks.map((weekItem) => (
          <SmallMonthWeekItem
            dateComponent={dateComponent}
            current={current}
            useTooltips={useTooltips}
            key={`short-week-${weekItem.weekOfYear}`}
            onSelectWeek={onSelectWeek}
            onSelectDate={onSelectDate}
            weekItem={weekItem}
            pourDates={pourDates}
            currentDate={value}
            taskScheme={includesTasks}
          />
        ))}
      </FlexBlock>
    </FlexBlock>
  );
};
