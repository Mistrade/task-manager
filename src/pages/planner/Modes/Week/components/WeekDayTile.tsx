import { FC } from 'react';

import { CellDate } from './CalendarCell/CellDate';
import { WeekDayEventList } from './EventList';
import { StyledWeekDayTile } from './styled';
import { IWeekDayTileProps } from './types';


export const WeekDay: FC<IWeekDayTileProps> = ({
  tileDate,
  renderTaskCount,
  onSelectTask,
  events,
  renderMode,
  animationIndex,
  byEventsSample
}) => {
  return (
    <StyledWeekDayTile
      delayByStepMs={60}
      isCurrentTile={tileDate.meta.isCurrent}
      fullHeight={renderMode === 'scrollable'}
      animationIndex={animationIndex}
    >
      <CellDate date={tileDate} />
      <WeekDayEventList
        byEventsSample={byEventsSample}
        renderEventCount={renderTaskCount}
        onSelectTask={onSelectTask}
        events={events}
        date={tileDate}
        renderMode={renderMode}
      />
    </StyledWeekDayTile>
  );
};