import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { Tooltip } from '@components/Tooltip/Tooltip';

import {
  CalendarItem,
  GlobalTaskListProps,
  OnSelectTaskFnType,
} from '@planner/planner.types';

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

  if (!!events.visible?.length) {
    return (
      <CalendarCellEventsListContainer>
        {events.visible.map((item, index) => (
          <CalendarCellEventItem
            tooltipPlacement={'left'}
            key={item._id + item.title}
            taskInfo={item}
            date={date}
            onSelect={onSelect}
          />
        ))}
        {!!events.hidden.length && (
          <Tooltip
            trigger={'click'}
            theme={'light'}
            hideOnClick={true}
            delay={[0, 200]}
            maxWidth={320}
            placement={'left'}
            interactive={true}
            content={
              <ScrollVerticalView
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
                      onSelect={onSelect}
                    />
                  ))}
                </CalendarCellEventsListContainer>
              </ScrollVerticalView>
            }
          >
            <EmptyButtonStyled
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
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