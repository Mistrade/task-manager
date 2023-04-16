import React, { FC, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { css } from 'styled-components';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { EventInformerHeader } from '@planner/TaskInformer/Header/EventInformerHeader';

import { useUpdateTaskMutation } from '@api/planning-api';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

import { EventInformerProps, MainEventInformerProps } from '../planner.types';
import { TaskInformerLeftBar } from './LeftBar/TaskInformerLeftBar';
import { TaskInformerRightBar } from './RightBar/TaskInformerRightBar';
import { TaskInfoNotFound } from './SupportsComponent/TaskInfoNotFound';
import { EventInfoUpdateFn } from './SupportsComponent/ToggleTaskInformerButtons';

const TaskInformerMain: FC<MainEventInformerProps> = ({ eventInfo }) => {
  const [updateTask] = useUpdateTaskMutation();

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

  return (
    <>
      <Helmet title={eventInfo.title} />
      <FlexBlock direction={'column'} width={'100%'} height={'100%'}>
        <EventInformerHeader
          eventInfo={eventInfo}
          updateTaskHandler={updateTaskHandler}
        />
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
          <TaskInformerRightBar eventInfo={eventInfo} />
        </FlexBlock>
      </FlexBlock>
    </>
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
