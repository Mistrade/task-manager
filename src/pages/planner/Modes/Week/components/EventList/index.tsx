import { FC } from 'react';

import { IWeekDayEventListProps } from '../types';
import { WeekDayBaseEventList } from './WeekDayBaseEventList';
import { WeekDayScrollableEventList } from './WeekDayScrollableEventList';

export const WeekDayEventList: FC<IWeekDayEventListProps> = ({
  renderEventCount,
  events,
  date,
  renderMode,
  onSelectTask,
}) => {
  if (!events.length) {
    return <></>;
  }

  switch (renderMode) {
    case 'scrollable':
      return (
        <WeekDayScrollableEventList
          events={events}
          date={date}
          onSelectTask={onSelectTask}
        />
      );
    case 'base':
      return (
        <WeekDayBaseEventList
          events={events}
          date={date}
          onSelectTask={onSelectTask}
          renderEventCount={renderEventCount}
        />
      );
    default:
      return <></>;
  }
};
