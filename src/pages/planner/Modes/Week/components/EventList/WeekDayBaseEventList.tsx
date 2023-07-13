import { FC, useMemo, useRef } from 'react';

import { FlexBlock } from '@components/LayoutComponents';

import { IWeekDayBaseEventListProps } from '../types';
import { TemplateWeekDayEventList } from './TemplateWeekDayEventList';
import { WeekDayHiddenEvents } from './WeekDayHiddenEvents';


export const WeekDayBaseEventList: FC<IWeekDayBaseEventListProps> = ({
  onSelectTask,
  events,
  date,
  renderEventCount,
  byEventsSample
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const slice = useMemo(() => {
    const count =
      typeof renderEventCount === 'number'
        ? renderEventCount
        : events?.length || 5;

    return {
      visible: events?.slice(0, count),
      hidden: events?.slice(count),
    };
  }, [events, renderEventCount]);

  return (
    <FlexBlock
      direction={'column'}
      gap={4}
      width={'100%'}
      ref={ref}
      overflow={'hidden'}
    >
      <TemplateWeekDayEventList
        byEventsSample={byEventsSample}
        events={slice.visible}
        date={date}
        onSelectTask={onSelectTask}
      />
      {!!slice.hidden.length && (
        <WeekDayHiddenEvents
          byEventsSample={byEventsSample}
          events={slice.hidden}
          date={date}
          onSelectTask={onSelectTask}
        />
      )}
    </FlexBlock>
  );
};