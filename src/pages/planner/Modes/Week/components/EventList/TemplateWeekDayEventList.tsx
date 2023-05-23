import { FC } from 'react';

import { StyledWeekDayEventItem, StyledWeekDayEventList } from '../styled';
import { ITemplateWeekDayEventListProps } from '../types';
import { WeekDayEventItem } from './WeekDayEventItem';

export const TemplateWeekDayEventList: FC<ITemplateWeekDayEventListProps> = ({
  date,
  events,
  onSelectTask,
}) => {
  return (
    <StyledWeekDayEventList>
      {events.map((eventItem) => (
        <StyledWeekDayEventItem key={eventItem._id}>
          <WeekDayEventItem
            date={date}
            taskInfo={eventItem}
            tooltipPlacement={'left'}
            onSelect={onSelectTask}
          />
        </StyledWeekDayEventItem>
      ))}
    </StyledWeekDayEventList>
  );
};
