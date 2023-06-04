import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { ModalContext } from '@components/LayoutComponents/Modal/Modal';
import { IsDelayedEvent } from '@planner/EventInfo/Header/IsDelayedEvent';
import { TaskInformerSwitchers } from '@planner/EventInfo/SupportsComponent/TaskInformerSwitchers';
import { TaskInformerTitle } from '@planner/EventInfo/SupportsComponent/TaskInformerTitle';
import { EventInfoUpdateFn } from '@planner/EventInfo/SupportsComponent/ToggleTaskInformerButtons';
import { pageHeaderColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';
import React, { memo, useContext } from 'react';
import styled from 'styled-components';


export interface EventInformerHeaderProps {
  eventInfo: EventInfoModel;
  updateTaskHandler: EventInfoUpdateFn;
  onClose?: () => void;
}

const EventInfoHeaderContainer = styled('header')`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${borderRadiusSize.xl} ${borderRadiusSize.xl} 0px 0px;
  gap: 8px;
  margin-bottom: 12px;
  padding: 16px 20px 0px 20px;
  background-color: ${pageHeaderColor};
`;

const TitleContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
`;

export const EventInformerHeader = memo<EventInformerHeaderProps>(
  ({ eventInfo, updateTaskHandler, onClose }) => {
    const modalContext = useContext(ModalContext);
    return (
      <EventInfoHeaderContainer>
        <TitleContainer>
          <TaskInformerTitle
            eventInfo={eventInfo}
            onChange={async (value) => await updateTaskHandler('title', value)}
            isLiked={eventInfo.isLiked}
            onChangeLiked={async (value) =>
              await updateTaskHandler('isLiked', value)
            }
          />
          <IsDelayedEvent isDelayed={!!eventInfo.isDelayed} />
          <EmptyButtonStyled
            onClick={() => {
              modalContext?.closeModalAnimation()?.then(onClose);
            }}
          >
            Закрыть
          </EmptyButtonStyled>
        </TitleContainer>
        <TaskInformerSwitchers key={'switchers'} />
      </EventInfoHeaderContainer>
    );
  },
  (prevProps, nextProps) =>
    prevProps.eventInfo._id === nextProps.eventInfo._id &&
    prevProps.eventInfo.title === nextProps.eventInfo.title &&
    prevProps.eventInfo.link?.value === nextProps.eventInfo.link?.value &&
    prevProps.eventInfo.priority === nextProps.eventInfo.priority &&
    prevProps.eventInfo.status === nextProps.eventInfo.status &&
    prevProps.eventInfo.isLiked === nextProps.eventInfo.isLiked &&
    prevProps.eventInfo.group?._id === nextProps.eventInfo.group?._id
);