import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout, plannerSelectStatus } from '@selectors/planner';
import dayjs from 'dayjs';
import React, { FC, useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import {
  DateHelper,
  HumanizeDateValueOptions,
} from '@src/common/calendarSupport/dateHelper';
import {
  DATE_HOURS_FORMAT,
  defaultColor,
  delayedColor,
  hoverColor,
  orangeColor,
} from '@src/common/constants';
import { eventIsDelayed } from '@src/common/functions';

import { EventShortHoverCard } from '@components/HoverCard/EventShortHoverCard';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { GroupLogo } from '@planner/Groups/GroupList.styled';
import { TaskTileItemProps } from '@planner/planner.types';

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

const memoFn = (prev: TaskTileItemProps, next: TaskTileItemProps) => {
  return isEqualEventInfo(prev.taskInfo, next.taskInfo);
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
      <FlexBlock direction={'row'} gap={4} align={'center'}>
        <GroupLogo color={taskInfo.group?.color || ''} size={16} />
        <FlexBlock width={'calc(100% - 16px)'}>
          <EventText isCompleted={taskInfo.status === 'completed'}>
            {taskInfo.title}
          </EventText>
        </FlexBlock>
      </FlexBlock>
      <FlexBlock direction={'row'} gap={4} align={'center'}>
        <PriorityCalendarIcon priorityKey={taskInfo.priority} size={16} />
        <FlexBlock width={'calc(100% - 16px)'}>
          <EventTimeValue>{timeValue}</EventTimeValue>
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};

export const CalendarCellEventItem: FC<TaskTileItemProps> = ({
  taskInfo,
  date,
  tooltipPlacement,
}) => {
  const [isHover, setIsHover] = useState(false);

  const condition = useMemo(() => {
    return !date.meta.isDisabled;
  }, [date, taskInfo]);

  const layout = useAppSelector(plannerSelectLayout);
  const status = useAppSelector(plannerSelectStatus);
  const navigate = useSearchNavigate();

  const Content = useMemo(() => {
    const isDelayed = eventIsDelayed(taskInfo.timeEnd, taskInfo.status);
    return (
      <EventContainer
        onMouseEnter={() => condition && setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        withFill={isDelayed || isHover}
        fillColor={isDelayed ? delayedColor : hoverColor}
        disabled={date.meta.isDisabled}
        isCurrent={date.meta.isCurrent}
        onClick={() => condition && navigate(`event/info/${taskInfo._id}`)}
      >
        <CalendarCellItemContent taskInfo={taskInfo} />
      </EventContainer>
    );
  }, [isHover, condition, date.value.day, taskInfo, layout, status]);

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