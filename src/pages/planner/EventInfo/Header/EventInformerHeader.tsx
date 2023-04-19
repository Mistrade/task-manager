import React, { memo, useMemo } from 'react';
import styled from 'styled-components';

import { pageHeaderColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';
import { eventIsDelayed } from '@src/common/functions';

import { FlexBlock } from '@components/LayoutComponents';

import { IsDelayedEvent } from '@planner/EventInfo/Header/IsDelayedEvent';
import { EventInformerToggles } from '@planner/EventInfo/Header/Toggles';
import { TaskInformerLinkButton } from '@planner/EventInfo/SupportsComponent/TaskInformerLinkButton';
import { TaskInformerMoreActions } from '@planner/EventInfo/SupportsComponent/TaskInformerMoreActions';
import { TaskInformerSwitchers } from '@planner/EventInfo/SupportsComponent/TaskInformerSwitchers';
import { TaskInformerTitle } from '@planner/EventInfo/SupportsComponent/TaskInformerTitle';
import { EventInfoUpdateFn } from '@planner/EventInfo/SupportsComponent/ToggleTaskInformerButtons';

import { EventInfoModel } from '@api/planning-api/types/event-info.types';

export interface EventInformerHeaderProps {
  eventInfo: EventInfoModel;
  updateTaskHandler: EventInfoUpdateFn;
}

const EventInfoHeaderContainer = styled('header')`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${borderRadiusSize.xl} ${borderRadiusSize.xl} 0px 0px;
  gap: 8px;
  margin-bottom: 12px;
  padding: 24px 20px 0px 20px;
  background-color: ${pageHeaderColor};
`;

const TitleContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: nowrap;
`;

const ActionsAndLinkContainer = styled('div')`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  flex-direction: row;
  max-width: 100%;
  flex-wrap: nowrap;
  z-index: 1;
`;

export const EventInformerHeader = memo<EventInformerHeaderProps>(
  ({ eventInfo, updateTaskHandler }) => {
    const isDelayed = useMemo(
      () => eventIsDelayed(eventInfo.timeEnd, eventInfo.status),
      [eventInfo.timeEnd, eventInfo.status]
    );

    return (
      <EventInfoHeaderContainer>
        <TitleContainer>
          <TaskInformerTitle
            title={eventInfo.title}
            onChange={async (value) => await updateTaskHandler('title', value)}
            isLiked={eventInfo.isLiked}
            onChangeLiked={async (value) =>
              await updateTaskHandler('isLiked', value)
            }
          />
          <IsDelayedEvent isDelayed={isDelayed} />
        </TitleContainer>
        <ActionsAndLinkContainer>
          <TaskInformerMoreActions taskItem={eventInfo} />
          <FlexBlock maxWidth={600} width={'100%'}>
            <TaskInformerLinkButton
              link={eventInfo.link}
              updateFn={updateTaskHandler}
            />
          </FlexBlock>
        </ActionsAndLinkContainer>
        <EventInformerToggles
          _id={eventInfo._id}
          updateTaskHandler={updateTaskHandler}
          status={eventInfo.status}
          group={eventInfo.group}
          priority={eventInfo.priority}
        />
        <TaskInformerSwitchers />
      </EventInfoHeaderContainer>
    );
  },
  (prevProps, nextProps) =>
    prevProps.eventInfo._id === nextProps.eventInfo._id &&
    prevProps.eventInfo.title === nextProps.eventInfo.title &&
    prevProps.eventInfo.link === nextProps.eventInfo.link &&
    prevProps.eventInfo.priority === nextProps.eventInfo.priority &&
    prevProps.eventInfo.status === nextProps.eventInfo.status &&
    prevProps.eventInfo.isLiked === nextProps.eventInfo.isLiked &&
    prevProps.eventInfo.group?._id === nextProps.eventInfo.group?._id
);
