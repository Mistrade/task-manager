import { EventInformerToggles } from '../../../Header/TogglesBar';
import { TaskInformerLinkButton } from '../../../SupportsComponent/TaskInformerLinkButton';
import { DatePicker } from '@components/DatePicker/DatePicker';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { TaskInformerDescription } from '@planner/EventInfo/SupportsComponent/TaskInformerDescription';
import { EventInfoUpdateFn } from '@planner/EventInfo/SupportsComponent/ToggleTaskInformerButtons';
import { EventInfoBaseProps } from '@planner/types';
import { CancelIcon, TooltipIcon } from 'chernikov-icons-kit';
import { Select } from 'chernikov-kit';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import styled from 'styled-components';


export interface EventInfoAboutTabProps extends EventInfoBaseProps {
  updateFn: EventInfoUpdateFn;
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
            <TaskInformerLinkButton link={eventInfo.link} updateFn={updateFn} />
          </FlexBlock>
        </ActionsAndLinkContainer>
        <EventInformerToggles
          _id={eventInfo._id}
          updateTaskHandler={updateFn}
          status={eventInfo.status}
          group={eventInfo.group}
          priority={eventInfo.priority}
        />
        <FlexBlock direction={'row'} gap={12} width={'100%'}>
          <DatePicker
            label={'Дата начала'}
            currentDate={dayjs(eventInfo.time).toDate()}
            onChange={async (date) => {
              await updateFn('time', dayjs(date).toString());
            }}
            useForceUpdateValue={true}
          />
          <DatePicker
            label={'Дата завершения'}
            currentDate={dayjs(eventInfo.timeEnd).toDate()}
            onChange={async (date) => {
              await updateFn('timeEnd', dayjs(date).toString());
            }}
            useForceUpdateValue={true}
          />
        </FlexBlock>
        <TaskInformerDescription eventInfo={eventInfo} updateFn={updateFn} />
        <Select
          label={'label'}
          placeholder={'placeholder'}
          popupOpenTrigger={'click'}
          renderSelectItemIcon={() => [
            <CancelIcon size={16} />,
            <TooltipIcon size={16} />,
          ]}
          selectItemIconPlacement={'right'}
          data={[
            { title: '123', _id: '123' },
            { title: 'hello', _id: 'hello' },
            { title: 'Элемент', _id: 'el' },
          ]}
        />
      </FlexBlock>
    </VerticalScroll>
  );
};