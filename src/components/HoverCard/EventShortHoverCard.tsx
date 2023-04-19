import React, { FC, useMemo } from 'react';

import {
  DateHelper,
  HumanizeDateValueOptions,
} from '@src/common/calendarSupport/dateHelper';
import { PRIORITY_TITLES } from '@src/common/constants/constants';
import { convertEventStatus } from '@src/common/functions';

import { Badge } from '@components/Badge/Badge';
import { JoinToEventButton } from '@components/Buttons/Buttons.styled';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { TreeIcon } from '@components/Icons/CalendarIcons/TreeIcon';
import { EventIcon } from '@components/Icons/EventIcon';
import { UrlIcon } from '@components/Icons/SocialNetworkIcons';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { UserAvatar } from '@components/Users/UserAvatar';

import { GroupLogo } from '@planner/Groups/styled';

import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';

export interface EventShortHoverCardProps {
  event: ShortEventInfoModel;
}

export const EventShortHoverCard: FC<EventShortHoverCardProps> = ({
  event,
}) => {
  const time = useMemo(() => {
    const options: HumanizeDateValueOptions = {
      withTime: true,
      withYear: false,
      yearPattern: 'short',
      monthPattern: 'full',
    };
    const start = DateHelper.getHumanizeDateValue(event.time, options);
    const end = DateHelper.getHumanizeDateValue(event.timeEnd, options);

    return (
      <>
        <span style={{ fontSize: 14, color: '#000' }} key={'0'}>
          c {start}
        </span>
        <br />
        <span style={{ fontSize: 14, color: '#000' }} key={'1'}>
          по {end}
        </span>
      </>
    );
  }, []);
  return (
    <FlexBlock direction={'column'} p={4} width={'100%'} gap={8}>
      <FlexBlock width={'100%'} gap={6} align={'center'}>
        <FlexBlock shrink={0}>
          <UserAvatar
            user={{ name: event.userId.name, surname: event.userId.surname }}
          />
        </FlexBlock>
        <FlexBlock fSize={15} style={{ color: '#000' }}>
          {event.title}
        </FlexBlock>
      </FlexBlock>
      <Badge
        style={{
          padding: 6,
          whiteSpace: 'pre-wrap',
          fontSize: 14,
          lineHeight: '16px',
        }}
      >
        {time}
      </Badge>
      <FlexBlock gap={4} align={'center'}>
        <EventIcon status={event.status} size={16} />
        {convertEventStatus(event.status)}
      </FlexBlock>
      <FlexBlock gap={4} align={'center'}>
        <PriorityCalendarIcon priorityKey={event.priority} size={16} />
        {PRIORITY_TITLES[event.priority] + ' приоритет'}
      </FlexBlock>
      {event.treeId && (
        <FlexBlock gap={4} align={'center'}>
          <TreeIcon size={16} />
          Состоит в дереве событий
        </FlexBlock>
      )}
      <FlexBlock gap={4} align={'center'}>
        <GroupLogo color={event.group?.color || ''} size={16} />
        {event.group?.title || ''}
      </FlexBlock>
      {event.description && <CutText>{event.description}</CutText>}
      {event.link && (
        <FlexBlock width={'100%'} justify={'center'} mt={12}>
          <JoinToEventButton
            href={event.link.value}
            target={'_blank'}
            rel={'noreferrer'}
          >
            <FlexBlock gap={6} align={'center'}>
              <UrlIcon name={event.link.key || 'default'} size={16} />
              Подключиться по ссылке
            </FlexBlock>
          </JoinToEventButton>
        </FlexBlock>
      )}
    </FlexBlock>
  );
};
