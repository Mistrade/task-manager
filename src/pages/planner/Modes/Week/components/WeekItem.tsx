import { plannerDateToDate } from '@planner-reducer/utils';
import { FC } from 'react';

import { getTaskListOfDay } from '../../../../../common/functions';
import { WeekItemProps } from '../../../types';
import { WeekDay } from './WeekDayTile';
import { WeekDaysContainer } from './styled';


export const WeekItem: FC<WeekItemProps> = ({
  config,
  taskStorage,
  renderTaskCount,
  renderMode,
  byEventsSample
}) => {
  return (
    <WeekDaysContainer>
      {config.days.map((day, index) => (
        <WeekDay
          byEventsSample={byEventsSample}
          animationIndex={index}
          events={getTaskListOfDay(plannerDateToDate(day.value), taskStorage)}
          renderTaskCount={renderTaskCount || 'all'}
          key={index}
          tileDate={day}
          renderMode={renderMode}
        />
      ))}
    </WeekDaysContainer>
  );
};