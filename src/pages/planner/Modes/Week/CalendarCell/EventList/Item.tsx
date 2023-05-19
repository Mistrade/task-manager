import {
  getSearchStringFromEntries,
  plannerDateToSearchParams,
} from '@planner-reducer/utils';
import dayjs from 'dayjs';
import React, { FC, useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import {
  DateHelper,
  HumanizeDateValueOptions,
} from '@src/common/calendarSupport/dateHelper';
import {
  darkColor,
  defaultColor,
  delayedColor,
  hoverColor,
  orangeColor,
} from '@src/common/constants/constants';
import { DATE_HOURS_FORMAT } from '@src/common/constants/defaultConstants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { LinkStyled } from '@components/Buttons/Link.styled';
import { EventShortHoverCard } from '@components/HoverCard/EventShortHoverCard';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { EventIcon } from '@components/Icons/EventIcon';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { GroupLogo } from '@planner/Groups/styled';
import { TaskTileItemProps } from '@planner/types';

import { CalendarCellStyledComponentProps } from '../Cell';

interface EventContainerProps extends CalendarCellStyledComponentProps {
  withFill?: boolean;
  fillColor?: string;
}

interface EventTextProps {
  isCompleted?: boolean;
  fs?: string;
}

const EventAnimation = keyframes`
  from {
    opacity: .3;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const EventContainer = styled('div')<EventContainerProps>`
  & {
    gap: 4px;
    color: ${darkColor};
    background-color: ${(props) =>
      props.withFill ? props.fillColor || hoverColor : ''};
    width: 100%;
    padding: 5px 7px;
    text-align: center;
    border-radius: ${borderRadiusSize.sm};
    margin-top: 4px;
    opacity: ${(props) => (props.disabled ? 0.2 : 1)};
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
    flex-direction: column;
    animation: ${EventAnimation} 0.3s ease-in;
    transition: background-color 0.3s ease-in;
  }
`;

const EllipsisMixin = css`
  display: block;
  line-height: 1;
  width: 100%;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

export const EventText = styled('span')<EventTextProps>`
  & {
    ${EllipsisMixin};
    font-size: ${(props) => props.fs || '14px'};
    text-decoration: ${(props) =>
      props.isCompleted ? 'line-through' : 'none'};
    text-decoration-color: ${(props) =>
      props.isCompleted ? orangeColor : '#000'};
    text-decoration-thickness: 2px;
    font-weight: 500;
  }
`;

const EventTimeValue = styled('span')`
  & {
    ${EllipsisMixin};
    font-size: 12px;
    color: ${defaultColor};
  }
`;

const isEqualEventInfo = (
  prev: TaskTileItemProps['taskInfo'],
  next: TaskTileItemProps['taskInfo']
) => {
  return (
    prev.title === next.title &&
    prev.group === next.group &&
    prev.time === next.timeEnd &&
    prev.priority === next.priority &&
    prev._id === next._id
  );
};

export const CalendarCellItemContent: FC<
  Pick<TaskTileItemProps, 'taskInfo'>
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
        <CutText lang={'ru'} rows={2} fontSize={15}>
          {taskInfo.title}
        </CutText>
      </FlexBlock>
      <FlexBlock width={'100%'}>
        <EventTimeValue>{timeValue}</EventTimeValue>
      </FlexBlock>
      <FlexBlock width={'100%'} gap={12} wrap={'wrap'}>
        <GroupLogo color={taskInfo.group?.color || ''} size={18} />
        <PriorityCalendarIcon priorityKey={taskInfo.priority} size={18} />
        <EventIcon status={taskInfo.status} size={18} />
      </FlexBlock>
    </FlexBlock>
  );
};

export const CalendarCellEventItem: FC<TaskTileItemProps> = ({
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
    const defaultPath = `event/info/${taskInfo._id}`;
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
          <CalendarCellItemContent taskInfo={taskInfo} />
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
      offset={[0, 15]}
      delay={[1000, 500]}
    >
      {Content}
    </Tooltip>
  );
};
