import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { FC, useMemo } from 'react';
import styled from 'styled-components';

import { getTaskListOfDay } from '@src/common/functions';

import { Accordion } from '@components/Accordion/Accordion';

import { WeekHeader } from '@planner/Modes/Week/WeekHeader';
import { WeekCalendarProps } from '@planner/types';

import { CalendarCell } from './CalendarCell/Cell';

const WeekContainer = styled('div')`
  position: relative;
  grid-column-start: 1;
  grid-column-end: 8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  transition: all 0.3s ease-in;
  border: 1px solid transparent;
  padding-top: 12px;
  //z-index: 0;
`;

const DaysContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, minmax(80px, 1fr));
  grid-column-gap: 4px;
  width: 100%;
  max-height: fit-content;
  transition: all 0.3s ease-in;
`;

export const WeeKCalendar: FC<WeekCalendarProps> = ({
  config,
  renderTaskCount,
  taskStorage,
}) => {
  const currentLayout = useAppSelector(plannerSelectLayout);

  const content = useMemo(
    () => (
      <DaysContainer>
        {config.days.map((day) => (
          <CalendarCell
            isVisible={true}
            tasks={getTaskListOfDay(plannerDateToDate(day.value), taskStorage)}
            renderTaskCount={renderTaskCount}
            key={`date_year_${config.year}_month_${config.month}_${day.value.day}`}
            value={day}
          />
        ))}
      </DaysContainer>
    ),
    [taskStorage, config.weekOfYear]
  );

  if (currentLayout === 'month') {
    return (
      <WeekContainer>
        <Accordion title={<WeekHeader config={config} />}>{content}</Accordion>
      </WeekContainer>
    );
  }

  return <WeekContainer>{content}</WeekContainer>;
};
