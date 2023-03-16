import React, { FC } from 'react';
import { EventInfoModalProps } from '../planner.types';
import {
  Modal,
  ModalBody,
} from '../../../components/LayoutComponents/Modal/Modal';
import { useGetEventInfoQuery } from '../../../store/api/planning-api';
import { useParams } from 'react-router';
import { ErrorBoundary } from '../../../components/Errors/ErrorBoundary';
import { Loader } from '../../../components/Loaders/Loader';

const Informer = React.lazy(() =>
  import('../TaskInformer/TaskInformer').then(({ TaskInformer }) => ({
    default: TaskInformer,
  }))
);

export const TaskInfoModal: FC<EventInfoModalProps> = ({
  onClose,
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

  return (
    <Modal style={{ width: '90%' }} isView={!!taskId} onClose={() => onClose()}>
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
                onClose={onClose}
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
