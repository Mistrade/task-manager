import {
  getSearchStringFromEntries,
  plannerDateToSearchParams,
} from '@planner-reducer/utils';
import { Flex, Text, Tooltip, kitColors } from 'chernikov-kit';
import dayjs from 'dayjs';
import React, { FC, useMemo, useState } from 'react';

import Badge from '@components/Badge';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { EventShortHoverCard } from '@components/HoverCard/EventShortHoverCard';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { EventIcon } from '@components/Icons/EventIcon';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';

import { FINANCE_OPERATION_TYPES } from '@api/finance-api/types';

import {
  DateHelper,
  HumanizeDateValueOptions,
} from '../../../../../../common/calendarSupport/dateHelper';
import {
  defaultColor,
  delayedColor,
  hoverColor,
} from '../../../../../../common/constants/constants';
import { DATE_HOURS_FORMAT } from '../../../../../../common/constants/defaultConstants';
import { EVENT_INFORMER_TAB_NAMES } from '../../../../../../common/constants/enums';
import { getFinanceOperationValue } from '../../../../EventInfo/LeftBar/Tabs/Finance/utils/table.config';
import { GroupLogo } from '../../../../Groups/styled';
import { EventContainer } from '../styled';
import { IWeekDayEventItemProps } from '../types';


export const WeekDayEventItemContent: FC<
  Pick<IWeekDayEventItemProps, 'taskInfo' | 'eventSample'>
> = ({ taskInfo, eventSample }) => {
  const timeValue = useMemo(() => {
    const start = dayjs(taskInfo.time);
    const end = dayjs(taskInfo.timeEnd);

    if (start.isSame(end, 'date')) {
      const shortStart = start.format(DATE_HOURS_FORMAT);
      const shortEnd = end.format(DATE_HOURS_FORMAT);
      return `${shortStart} - ${shortEnd}`;
    }

    const options: HumanizeDateValueOptions = {
      withTime: false,
      yearPattern: 'short',
    };

    const humanizeStart = DateHelper.getHumanizeDateValue(
      start.toDate(),
      options
    );

    const humanizeEnd = DateHelper.getHumanizeDateValue(end.toDate(), options);

    return `${humanizeStart} - ${humanizeEnd}`;
  }, [taskInfo.time, taskInfo.timeEnd]);

  return (
    <FlexBlock direction={'column'} gap={4} width={'100%'}>
      <FlexBlock width={'100%'}>
        <CutText
          lang={'ru'}
          rows={2}
          fontSize={15}
          style={{ fontWeight: 'bold' }}
        >
          {taskInfo.title}
        </CutText>
      </FlexBlock>
      <FlexBlock width={'100%'}>
        <CutText rows={1} fontSize={12} color={defaultColor}>
          {timeValue}
        </CutText>
      </FlexBlock>
      <FlexBlock width={'100%'} gap={12} wrap={'wrap'}>
        <GroupLogo color={taskInfo.group?.color || ''} size={18} />
        <PriorityCalendarIcon priorityKey={taskInfo.priority} size={18} />
        <EventIcon status={taskInfo.status} size={18} />
      </FlexBlock>
      {eventSample && (
        <Flex>
          <Badge
            type={
              eventSample.profit >= 0
                ? FINANCE_OPERATION_TYPES.INCOME
                : FINANCE_OPERATION_TYPES.CONSUMPTION
            }
          >
            <Text rows={1} fontSize={15} color={kitColors.dark}>
              {(eventSample.profit > 0 ? '+' : "") + getFinanceOperationValue(eventSample.profit)}
            </Text>
          </Badge>
        </Flex>
      )}
    </FlexBlock>
  );
};

export const WeekDayEventItem: FC<IWeekDayEventItemProps> = ({
  taskInfo,
  date,
  tooltipPlacement,
  onSelect,
  eventSample,
}) => {
  const [isHover, setIsHover] = useState(false);
  const condition = useMemo(() => {
    return !date.meta.isDisabled;
  }, [date, taskInfo]);

  const defaultPath = `event/info/${taskInfo._id}/${EVENT_INFORMER_TAB_NAMES.ABOUT}`;
  const searchParams = plannerDateToSearchParams(date.value);
  const to = defaultPath + getSearchStringFromEntries(searchParams);

  return (
    <Tooltip
      animation={'shift-away'}
      content={<EventShortHoverCard event={taskInfo} />}
      theme={'light'}
      placement={tooltipPlacement || 'left'}
      delay={[1500, 150]}
    >
      <LinkStyled to={to}>
        <EventContainer
          onMouseEnter={() => condition && setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          withFill={taskInfo.isDelayed || isHover}
          fillColor={taskInfo.isDelayed ? delayedColor : hoverColor}
          disabled={date.meta.isDisabled}
          isCurrent={date.meta.isCurrent}
          onClick={() => {
            onSelect && onSelect(taskInfo._id);
          }}
        >
          <WeekDayEventItemContent
            eventSample={eventSample}
            taskInfo={taskInfo}
          />
        </EventContainer>
      </LinkStyled>
    </Tooltip>
  );
};