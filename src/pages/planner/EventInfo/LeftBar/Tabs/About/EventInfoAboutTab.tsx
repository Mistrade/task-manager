import dayjs from 'dayjs';
import React, { FC } from 'react';
import styled from 'styled-components';

import { DatePicker } from '@components/DatePicker/DatePicker';
import { EventSystemWidget } from '@components/EventSystemDescription';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';

import { TaskInformerDescription } from '@planner/EventInfo/SupportsComponent/TaskInformerDescription';
import { EventInfoUpdateFn } from '@planner/EventInfo/SupportsComponent/ToggleTaskInformerButtons';

import { IGetEventInfoResponse } from '@api/planning-api/types/event-info.types';

import { EventInformerToggles } from '../../../Header/TogglesBar';
import { TaskInformerLinkButton } from '../../../SupportsComponent/TaskInformerLinkButton';


export interface EventInfoAboutTabProps {
  updateFn: EventInfoUpdateFn;
  eventInfo: IGetEventInfoResponse;
}

const ActionsAndLinkContainer = styled('div')`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  flex-direction: row;
  max-width: 100%;
  flex-wrap: nowrap;
  z-index: 1;
`;

export const EventInfoAboutTab: FC<EventInfoAboutTabProps> = ({
  eventInfo,
  updateFn,
}) => {
  return (
    <VerticalScroll renderPattern={'top-bottom'}>
      <FlexBlock direction={'column'} gap={12} pb={40} width={'100%'}>
        <ActionsAndLinkContainer>
          <FlexBlock maxWidth={600} width={'100%'}>
            <TaskInformerLinkButton
              link={eventInfo.base.link}
              updateFn={updateFn}
            />
          </FlexBlock>
        </ActionsAndLinkContainer>
        <EventInformerToggles
          _id={eventInfo.base._id}
          updateTaskHandler={updateFn}
          status={eventInfo.base.status}
          group={eventInfo.base.group}
          priority={eventInfo.base.priority}
        />
        <FlexBlock direction={'row'} gap={12} width={'100%'}>
          <DatePicker
            label={'Дата начала'}
            currentDate={dayjs(eventInfo.base.time).toDate()}
            onChange={async (date) => {
              await updateFn('time', dayjs(date).toString());
            }}
            useForceUpdateValue={true}
          />
          <DatePicker
            label={'Дата завершения'}
            currentDate={dayjs(eventInfo.base.timeEnd).toDate()}
            onChange={async (date) => {
              await updateFn('timeEnd', dayjs(date).toString());
            }}
            useForceUpdateValue={true}
          />
        </FlexBlock>
        <TaskInformerDescription
          eventInfo={eventInfo.base}
          updateFn={updateFn}
        />
        {eventInfo.widget?.model && (
          <EventSystemWidget
            data={{
              title: eventInfo.widget.title,
              fromEvent: eventInfo.widget.fromEvent,
              model: eventInfo.widget.modelName,
              modelId: eventInfo.widget.model._id,
              data: eventInfo.widget.model,
              message: eventInfo.widget.message,
            }}
          />
        )}
      </FlexBlock>
    </VerticalScroll>
  );
};