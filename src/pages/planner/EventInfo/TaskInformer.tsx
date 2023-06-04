import { EVENT_INFORMER_TAB_NAMES } from '../../../common/constants/enums';
import { TaskInformerLeftBar } from './LeftBar/TaskInformerLeftBar';
import { TaskInfoNotFound } from './SupportsComponent/TaskInfoNotFound';
import { EventInfoUpdateFn } from './SupportsComponent/ToggleTaskInformerButtons';
import { EventInformerContentContainer } from './TaskInformer.styled';
import { useUpdateTaskMutation } from '@api/planning-api';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock } from '@components/LayoutComponents';
import { setEventInfoTabName } from '@planner-reducer/index';
import { EventInformerHeader } from '@planner/EventInfo/Header/EventInformerHeader';
import { useAppDispatch } from '@redux/hooks/hooks';
import { CenteredContainer } from '@src/routes/Interceptors/SessionInterceptor';
import React, { FC, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import {
  EventInformerProps,
  MainEventInformerProps,
} from 'src/pages/planner/types';


const TaskInformerMain: FC<MainEventInformerProps> = ({
  eventInfo,
  onClose,
}) => {
  const [updateTask] = useUpdateTaskMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setEventInfoTabName(EVENT_INFORMER_TAB_NAMES.ABOUT));
    };
  }, []);

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
      <FlexBlock
        direction={'column'}
        width={'100%'}
        height={'100%'}
        id={'event--view'}
      >
        <EventInformerHeader
          onClose={onClose}
          eventInfo={eventInfo}
          updateTaskHandler={updateTaskHandler}
        />
        <EventInformerContentContainer>
          <Routes>
            <Route
              path={':tabName/*'}
              index={true}
              element={
                <TaskInformerLeftBar
                  eventInfo={eventInfo}
                  updateFn={updateTaskHandler}
                />
              }
              errorElement={
                <CenteredContainer>
                  <ErrorScreen
                    title={'Произошла ошибка'}
                    errorType={'SYSTEM_ERROR'}
                  />
                </CenteredContainer>
              }
            />
          </Routes>
          {/*<TaskInformerRightBar eventInfo={eventInfo} />*/}
        </EventInformerContentContainer>
      </FlexBlock>
    </>
  );
};

export const TaskInformer: FC<EventInformerProps> = ({
  eventInfo,
  eventErrorInfo,
  onClose,
}) => {
  if (eventInfo) {
    return <TaskInformerMain eventInfo={eventInfo} onClose={onClose} />;
  }

  return <TaskInfoNotFound message={eventErrorInfo} />;
};