import { FC } from 'react';

import { FlexBlock, VerticalScroll } from '@components/LayoutComponents';

import { borderRadiusSize } from '../../../../../../common/css/mixins';
import { ITemplateWeekDayEventListProps } from '../types';
import { TemplateWeekDayEventList } from './TemplateWeekDayEventList';

export const WeekDayScrollableEventList: FC<ITemplateWeekDayEventListProps> = ({
  onSelectTask,
  events,
  date,
}) => {
  return (
    <FlexBlock grow={3} maxHeight={'100%'} width={'100%'} overflow={'hidden'}>
      <VerticalScroll
        renderPattern={'top-bottom'}
        useShadow={true}
        containerProps={{
          borderRadius: borderRadiusSize.sm,
          overflow: 'hidden',
        }}
        scrollContainerProps={{
          maxHeight: '100%',
        }}
      >
        <TemplateWeekDayEventList
          events={events}
          date={date}
          onSelectTask={onSelectTask}
        />
      </VerticalScroll>
    </FlexBlock>
  );
};
