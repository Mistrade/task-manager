import React, { FC, useContext } from 'react';
import { EventInfoModalProps } from '../planner.types';
import { Modal, ModalBody } from '@components/LayoutComponents/Modal/Modal';
import { useGetEventInfoQuery } from '@api/planning-api';
import { useParams } from 'react-router';
import { ErrorBoundary } from '@components/Errors/ErrorBoundary';
import { Loader } from '@components/Loaders/Loader';
import { PlannerContext } from '@src/Context/planner.context';

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
  const {
    data: taskInfo,
    isLoading,
    error,
  } = useGetEventInfoQuery(taskId || '', {
    refetchOnMountOrArgChange: true,
    skip: !taskId,
  });

  const {
    methods: { closeEventInfo },
  } = useContext(PlannerContext);

  return (
    <Modal style={{ width: '90%' }} isView={!!taskId} onClose={closeEventInfo}>
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
