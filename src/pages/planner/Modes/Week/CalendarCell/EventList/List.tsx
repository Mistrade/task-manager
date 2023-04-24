import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { Tooltip } from '@components/Tooltip/Tooltip';

import {
  CalendarItem,
  GlobalTaskListProps,
  OnSelectTaskFnType,
} from '@planner/types';

import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';

import { CellDate } from '../CellDate';
import { CalendarCellEventItem } from './Item';

const CalendarCellEventsListContainer = styled('div')`
  & {
    display: flex;
    flex-direction: column;
    width: 100%;
    //max-height: 30vh;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: unset;
    transition: all 0.3s ease;
  }
`;

export interface CalendarCellEventsListProps
  extends Omit<GlobalTaskListProps, 'renderTaskCount'> {
  tasks?: Array<ShortEventInfoModel>;
  date: CalendarItem;
  onSelect?: OnSelectTaskFnType;
}

export const CalendarCellEventsList: FC<CalendarCellEventsListProps> = ({
  tasks = [],
  date,
  onSelect,
}) => {
  const events = useMemo(() => {
    return {
      visible: tasks?.slice(0, 5),
      hidden: tasks?.slice(5),
    };
  }, [tasks]);

  const [isOpenHiddenEvents, setIsOpenHiddenEvents] = useState(false);

  if (!!events.visible?.length) {
    return (
      <CalendarCellEventsListContainer>
        {events.visible.map((item, index) => (
          <CalendarCellEventItem
            tooltipPlacement={'left'}
            key={item._id}
            taskInfo={item}
            date={date}
            onSelect={onSelect}
          />
        ))}
        {!!events.hidden.length && (
          <Tooltip
            theme={'light'}
            delay={[0, 0]}
            maxWidth={320}
            visible={isOpenHiddenEvents}
            onClickOutside={() => setIsOpenHiddenEvents(false)}
            placement={'left'}
            interactive={true}
            content={
              <VerticalScroll
                renderPattern={'top-bottom'}
                placementStatic={'top'}
                containerProps={{ maxHeight: 300 }}
                staticContent={
                  <CellDate
                    date={date}
                    renderMonth={true}
                    useHoverNavigation={false}
                  />
                }
              >
                <CalendarCellEventsListContainer>
                  {events.hidden.map((item) => (
                    <CalendarCellEventItem
                      tooltipPlacement={null}
                      taskInfo={item}
                      date={date}
                      key={item._id}
                      onSelect={(_id) => {
                        setIsOpenHiddenEvents(false);
                      }}
                    />
                  ))}
                </CalendarCellEventsListContainer>
              </VerticalScroll>
            }
          >
            <EmptyButtonStyled
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
              onClick={() => setIsOpenHiddenEvents((prev) => !prev)}
            >
              {`Еще ${events.hidden.length}`}
            </EmptyButtonStyled>
          </Tooltip>
        )}
      </CalendarCellEventsListContainer>
    );
  }

  return <></>;
};
