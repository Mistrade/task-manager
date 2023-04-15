import { useGetEventInfoQuery } from '@api/planning-api';
import { ErrorBoundary } from '@components/Errors/ErrorBoundary';
import { Modal, ModalBody } from '@components/LayoutComponents/Modal/Modal';
import { Loader } from '@components/Loaders/Loader';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectCurrentMode } from '@selectors/planner';
import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router';
import { EventInfoModalProps } from '../planner.types';

const Informer = React.lazy(() =>
  import('../TaskInformer/TaskInformer').then(({ TaskInformer }) => ({
    default: TaskInformer,
  }))
);

export const TaskInfoModal: FC<EventInfoModalProps> = ({
  onCloneEvent,
  onOpenClonedEvent,
}) => {
  const { taskId } = useParams<{ taskId: string }>();
  const backgroundUrl = useAppSelector(plannerSelectCurrentMode);
  const {
    data: taskInfo,
    isLoading,
    error,
  } = useGetEventInfoQuery(taskId || '', {
    skip: !taskId,
  });
  const navigate = useSearchNavigate();

  const closeHandler = useCallback(() => {
    navigate(backgroundUrl);
  }, [backgroundUrl]);

  return (
    <Modal style={{ width: '90%' }} isView={!!taskId} onClose={closeHandler}>
      <ModalBody>
        <ErrorBoundary
          title={'Произошла ошибка при отрисовке, мы уже работаем над этим'}
          errorType={'SYSTEM_ERROR'}
        >
          <Loader title={'Загрузка информации...'} isActive={isLoading}>
            <React.Suspense
              fallback={
                <Loader
                  title={'Загрузка дополнительных скриптов...'}
                  isActive={true}
                />
              }
            >
              <Informer
                eventInfo={taskInfo?.data || null}
                onOpenClonedEvent={onOpenClonedEvent}
                onCloneEvent={onCloneEvent}
                eventErrorInfo={
                  (error && 'data' in error && error.data.info?.message) || ''
                }
              />
            </React.Suspense>
          </Loader>
        </ErrorBoundary>
      </ModalBody>
    </Modal>
  );
};