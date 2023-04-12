import React, { FC } from 'react';
import { EventInfoBaseProps } from '@planner/planner.types';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import dayjs from 'dayjs';
import { Heading } from '@components/Text/Heading';
import { CalendarUserIndicator } from '@planner/Users/UserIndicator';
import { openUrlInNewTab } from '@src/common/url';
import { getDateDescription } from '@src/common/calendarSupport/dateHelper';

export const TaskCreatedMessage: FC<EventInfoBaseProps> = ({ eventInfo }) => {
  return (
    <FlexBlock fSize={16} direction={'column'} gap={12} width={'100%'}>
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
    </FlexBlock>
  );
};
