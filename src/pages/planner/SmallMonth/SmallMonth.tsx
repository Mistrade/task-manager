import { FC, ReactNode, memo } from 'react';
import styled from 'styled-components';

import {
  MonthList,
  WeekDaysShortList,
  defaultColor,
} from '@src/common/constants/constants';

import { FlexBlock } from '@components/LayoutComponents';

import { DateWithTooltipProps } from '@planner/SmallMonth/DateWithTooltipPlanner';
import {
  MonthItem,
  OnSelectDateFromCalendarFn,
  PlannerMonthMode,
  PlannerWeekMode,
} from '@planner/types';

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

const SmallMonthWeekDays = () => {
  return (
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
  );
};

const SmallMonthTitle = memo<{ monthIndex: number }>(({ monthIndex }) => (
  <h2>{MonthList[monthIndex]}</h2>
));

const SmallMonthContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallMonthMainColumn = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SmallMonthTitleContainer = styled('div')`
  display: flex;
  flex-direction: row;
`;

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
    <SmallMonthContainer>
      <SmallMonthMainColumn>
        <SmallMonthTitleContainer>
          {title || <SmallMonthTitle monthIndex={monthItem.monthOfYear} />}
        </SmallMonthTitleContainer>
        <SmallMonthWeekDays key={`weekdays_${monthItem.monthOfYear}`} />
        {monthItem.weeks.map((weekItem) => (
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
      </SmallMonthMainColumn>
    </SmallMonthContainer>
  );
};
