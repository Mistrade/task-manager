import { Tooltip } from 'chernikov-kit';
import React, { FC, useState } from 'react';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { VerticalScroll } from '@components/LayoutComponents';

import { CellDate } from '../CalendarCell/CellDate';
import { ITemplateWeekDayEventListProps } from '../types';
import { TemplateWeekDayEventList } from './TemplateWeekDayEventList';

export const WeekDayHiddenEvents: FC<ITemplateWeekDayEventListProps> = ({
  date,
  events,
  onSelectTask,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip
      visible={isOpen}
      onClickOutside={() => setIsOpen(false)}
      theme={'light'}
      delay={[150, 150]}
      maxWidth={320}
      // offset={({ placement, popper, reference }) => [0, 4]}
      arrow={false}
      placement={'top'}
      interactive={true}
      interactiveBorder={20}
      zIndex={9999}
      strategy={'absolute'}
      disableFlip={true}
      content={
        <VerticalScroll
          useShadow={true}
          renderPattern={'top-bottom'}
          containerProps={{
            pt: 10,
            pb: 10,
          }}
          scrollContainerProps={{
            pb: 20,
            maxHeight: 400,
            height: 'auto',
          }}
          staticContent={
            <CellDate
              renderMonth={true}
              useHoverNavigation={false}
              date={date}
            />
          }
          placementStatic={'top'}
        >
          <TemplateWeekDayEventList
            events={events}
            date={date}
            onSelectTask={(taskId) => {
              setIsOpen(false);
              onSelectTask && onSelectTask(taskId);
            }}
          />
        </VerticalScroll>
      }
    >
      <EmptyButtonStyled
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {`Еще ${events.length}`}
      </EmptyButtonStyled>
    </Tooltip>
  );
};
