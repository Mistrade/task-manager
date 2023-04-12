import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { EventInformerProps, MainEventInformerProps } from '../planner.types';
import dayjs from 'dayjs';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { useUpdateTaskMutation } from '@api/planning-api';
import {
  EventInfoUpdateFn,
  ToggleEventCalendar,
  ToggleEventPriority,
  ToggleEventStatus,
} from './SupportsComponent/ToggleTaskInformerButtons';
import { TaskInformerRightBar } from './RightBar/TaskInformerRightBar';
import {
  EVENT_INFORMER_TAB_NAMES,
  TaskInformerLeftBar,
} from './LeftBar/TaskInformerLeftBar';
import { TaskInfoNotFound } from './SupportsComponent/TaskInfoNotFound';
import { DateListGenerator } from '@src/common/calendarSupport/generators';
import {
  borderRadiusSize,
  disabledColor,
  pageHeaderColor,
} from '@src/common/constants';
import { TaskInformerTitle } from './SupportsComponent/TaskInformerTitle';
import { TaskInformerLinkButton } from './SupportsComponent/TaskInformerLinkButton';
import { TaskInformerSwitchers } from './SupportsComponent/TaskInformerSwitchers';
import { useAppSelector } from '@redux/hooks/hooks';
import { CalendarSelectors } from '@selectors/calendarItems';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { TaskInformerMoreActions } from './SupportsComponent/TaskInformerMoreActions';
import { css } from 'styled-components';
import {
  CatchHandleForToast,
  thenHandleForToast,
} from '@api/tools';
import { useLocation } from 'react-router';
import { PlannerContext } from '@src/Context/planner.context';

const getInitialSwitcher = (pathname: string): EVENT_INFORMER_TAB_NAMES => {
  const pathArr = pathname.split('/');
  const el = pathArr[7];

  return (el || '') as unknown as EVENT_INFORMER_TAB_NAMES;
};

const TaskInformerMain: FC<MainEventInformerProps> = ({
  eventInfo,
  onCloneEvent,
  onOpenClonedEvent,
  // onClose,
}) => {
  const {
    planner: { layout },
    statuses,
  } = useAppSelector(CalendarSelectors.dataForURL);

  const navigate = useSearchNavigate();
  const location = useLocation();
  const [switcher, setSwitcher] = useState<EVENT_INFORMER_TAB_NAMES>(
    getInitialSwitcher(location.pathname)
  );

  const prevPath = useMemo(() => {
    return `/planner/${layout}/${statuses}/info/${eventInfo._id}`;
  }, [layout, statuses, eventInfo._id]);

  const options = useMemo(() => {
    const start = dayjs(eventInfo.time);
    const monthItem = new DateListGenerator({
      useOtherDays: true,
    }).getMonthItem(start.toDate());

    return {
      monthItem,
      currentDate: start.toDate(),
    };
  }, [eventInfo.time]);

  const [updateTask, { data }] = useUpdateTaskMutation();

  const updateTaskHandler: EventInfoUpdateFn = useCallback(
    async (field, data, taskId) => {
      return await updateTask({
        id: taskId || eventInfo._id,
        field,
        data,
      })
        .unwrap()
        .then(thenHandleForToast)
        .catch(CatchHandleForToast);
    },
    [eventInfo._id]
  );

  const {
    methods: { plannerNavigate },
  } = useContext(PlannerContext);

  return (
    <FlexBlock direction={'column'} width={'100%'} height={'100%'}>
      <FlexBlock
        pt={24}
        mb={12}
        pl={20}
        pr={20}
        gap={8}
        bgColor={pageHeaderColor}
        borderRadius={`${borderRadiusSize.xl} ${borderRadiusSize.xl} 0px 0px`}
        direction={'column'}
        width={'100%'}
        additionalCss={css``}
      >
        <FlexBlock direction={'row'} justify={'flex-start'} gap={12} mb={12}>
          <TaskInformerTitle
            title={eventInfo.title}
            onChange={async (value) => await updateTaskHandler('title', value)}
            isLiked={eventInfo.isLiked}
            onChangeLiked={async (value) =>
              await updateTaskHandler('isLiked', value)
            }
          />
        </FlexBlock>
        <FlexBlock
          justify={'flex-start'}
          gap={8}
          direction={'row'}
          additionalCss={css`
            z-index: 1;
          `}
        >
          <TaskInformerMoreActions
            // onClose={onClose}
            onCloneEvent={onCloneEvent}
            onOpenClonedEvent={onOpenClonedEvent}
            taskItem={eventInfo}
          />
          <FlexBlock maxWidth={600} width={'100%'}>
            <TaskInformerLinkButton
              link={eventInfo.link}
              updateFn={updateTaskHandler}
            />
          </FlexBlock>
        </FlexBlock>
        <FlexBlock
          gap={12}
          p={`4px 8px`}
          border={`1px solid ${disabledColor}`}
          align={'center'}
          borderRadius={borderRadiusSize.sm}
        >
          <ToggleEventCalendar
            elementId={`set_event_group_${eventInfo._id}`}
            value={eventInfo.group}
            onChange={updateTaskHandler}
          />
          <ToggleEventPriority
            elementId={`set_event_priority_${eventInfo._id}`}
            value={eventInfo.priority}
            onChange={updateTaskHandler}
          />
          <ToggleEventStatus
            elementId={`set_event_status_${eventInfo._id}`}
            value={eventInfo.status}
            onChange={updateTaskHandler}
          />
        </FlexBlock>
        <TaskInformerSwitchers
          badges={{
            members: (eventInfo.invites.length || 0) + 1,
            history: 0,
            chains: 0,
            comments: 0,
          }}
          selected={switcher}
          onChange={(value) => {
            setSwitcher(value.key);
            plannerNavigate('eventInfo').go(eventInfo._id, value.key);
          }}
        />
      </FlexBlock>
      <FlexBlock
        direction={'row'}
        width={'100%'}
        height={'100%'}
        gap={12}
        pl={20}
        pb={12}
        pr={20}
        overflow={'hidden'}
        additionalCss={css`
          z-index: 0;
        `}
      >
        <TaskInformerLeftBar
          eventInfo={eventInfo}
          updateFn={updateTaskHandler}
        />
        <TaskInformerRightBar
          eventInfo={eventInfo}
          monthItem={options.monthItem}
          updateFn={updateTaskHandler}
        />
      </FlexBlock>
    </FlexBlock>
  );
};

export const TaskInformer: FC<EventInformerProps> = ({
  eventInfo,
  onCloneEvent,
  onOpenClonedEvent,
  eventErrorInfo,
}) => {
  return !eventInfo ? (
    <TaskInfoNotFound message={eventErrorInfo} />
  ) : (
    <TaskInformerMain
      eventInfo={eventInfo}
      onOpenClonedEvent={onOpenClonedEvent}
      onCloneEvent={onCloneEvent}
    />
  );
};
