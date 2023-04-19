import React, { FC, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import {
  EventInformerProps,
  MainEventInformerProps,
} from 'src/pages/planner/types';

import { FlexBlock } from '@components/LayoutComponents';

import { EventInformerHeader } from '@planner/EventInfo/Header/EventInformerHeader';

import { useUpdateTaskMutation } from '@api/planning-api';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

import { TaskInformerLeftBar } from './LeftBar/TaskInformerLeftBar';
import { TaskInformerRightBar } from './RightBar/TaskInformerRightBar';
import { TaskInfoNotFound } from './SupportsComponent/TaskInfoNotFound';
import { EventInfoUpdateFn } from './SupportsComponent/ToggleTaskInformerButtons';
import { EventInformerContentContainer } from './TaskInformer.styled';

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
        <EventInformerContentContainer>
          <TaskInformerLeftBar
            eventInfo={eventInfo}
            updateFn={updateTaskHandler}
          />
          <TaskInformerRightBar eventInfo={eventInfo} />
        </EventInformerContentContainer>
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
  if (eventInfo) {
    return (
      <TaskInformerMain
        eventInfo={eventInfo}
        onOpenClonedEvent={onOpenClonedEvent}
        onCloneEvent={onCloneEvent}
      />
    );
  }

  return <TaskInfoNotFound message={eventErrorInfo} />;
};
