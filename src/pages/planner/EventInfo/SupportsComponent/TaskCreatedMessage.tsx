import dayjs from 'dayjs';
import React, { FC } from 'react';
import styled from 'styled-components';

import { getDateDescription } from '@src/common/calendarSupport/dateHelper';
import { openUrlInNewTab } from '@src/common/url';

import { FlexBlock } from '@components/LayoutComponents';
import { Heading } from '@components/Text/Heading';
import { CalendarUserIndicator } from '@components/Users/UserIndicator';

import { EventInfoModel } from '@api/planning-api/types/event-info.types';


const Container = styled('div')`
  display: flex;
  font-size: 16px;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
export const TaskCreatedMessage: FC<{ eventInfo: EventInfoModel }> = ({ eventInfo }) => {
  return (
    <Container>
      <Heading.H2 style={{ textAlign: 'left', fontSize: 16 }}>
        Создано
      </Heading.H2>
      <FlexBlock direction={'column'} gap={12} width={'100%'}>
        <CalendarUserIndicator
          name={eventInfo.userId.name}
          surname={eventInfo.userId.surname}
          id={eventInfo.userId._id}
          onClick={(userId) => {
            openUrlInNewTab(`${window.location.origin}/profile/${userId}`);
          }}
        />
        <span>
          {getDateDescription(dayjs(eventInfo.createdAt).toDate(), true)}
        </span>
      </FlexBlock>
    </Container>
  );
};