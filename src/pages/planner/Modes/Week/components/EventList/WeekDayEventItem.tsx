import {
  getSearchStringFromEntries,
  plannerDateToSearchParams,
} from '@planner-reducer/utils';
import { Tooltip } from 'chernikov-kit';
import dayjs from 'dayjs';
import React, { FC, useMemo, useState } from 'react';

import { LinkStyled } from '@components/Buttons/Link.styled';
import { EventShortHoverCard } from '@components/HoverCard/EventShortHoverCard';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { EventIcon } from '@components/Icons/EventIcon';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';

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
import { GroupLogo } from '../../../../Groups/styled';
import { EventContainer } from '../styled';
import { IWeekDayEventItemProps } from '../types';

export const WeekDayEventItemContent: FC<
  Pick<IWeekDayEventItemProps, 'taskInfo'>
> = ({ taskInfo }) => {
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
    </FlexBlock>
  );
};

export const WeekDayEventItem: FC<IWeekDayEventItemProps> = ({
  taskInfo,
  date,
  tooltipPlacement,
  onSelect,
}) => {
  const [isHover, setIsHover] = useState(false);
  const condition = useMemo(() => {
    return !date.meta.isDisabled;
  }, [date, taskInfo]);

  const Content = useMemo(() => {
    const defaultPath = `event/info/${taskInfo._id}/${EVENT_INFORMER_TAB_NAMES.ABOUT}`;
    const searchParams = plannerDateToSearchParams(date.value);
    const to = defaultPath + getSearchStringFromEntries(searchParams);

    return (
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
          <WeekDayEventItemContent taskInfo={taskInfo} />
        </EventContainer>
      </LinkStyled>
    );
  }, [isHover, condition, date.value.day, taskInfo]);

  if (tooltipPlacement === null) {
    return Content;
  }

  return (
    <Tooltip
      animation={'shift-away'}
      content={<EventShortHoverCard event={taskInfo} />}
      theme={'light'}
      placement={tooltipPlacement}
      // offset={[0, 15]}
      delay={[1500, 150]}
    >
      {Content}
    </Tooltip>
  );
};
