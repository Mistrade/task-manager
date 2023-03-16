import React, { FC } from 'react';
import { CalendarTaskItem, CreateEventModalProps } from '../../planner.types';
import {
  Modal,
  ModalBody,
} from '../../../../components/LayoutComponents/Modal/Modal';
import { ERROR_DESCRIPTIONS, ERROR_TITLES } from '../../../../common/constants';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { ErrorBoundary } from '../../../../components/Errors/ErrorBoundary';
import dayjs from 'dayjs';
import { EventInfoModel } from '../../../../store/api/planning-api/types/event-info.types';
import { Loader } from '../../../../components/Loaders/Loader';
import { useGetGroupsListQuery } from '../../../../store/api/planning-api';

const CreateEventForm = React.lazy(() =>
  import('./CreateEventForm').then(({ CreateEventForm }) => ({
    default: CreateEventForm,
  }))
);

export const CreateEventModal: FC<CreateEventModalProps> = ({
  date,
  onClose,
  clonedEventInfo,
  onSuccessClonedEvent,
  onComplete,
}) => {
  const { data: groupsList, isLoading } = useGetGroupsListQuery({
    exclude: ['Invite'],
  });
  const getInitialValues = (
    data: Partial<EventInfoModel> | null | undefined
  ): CalendarTaskItem | undefined => {
    if (!data) {
      return undefined;
    }

    const time = data.time ? dayjs(data.time).toDate() : dayjs().toDate();

    const timeEnd = data.timeEnd
      ? dayjs(data.timeEnd).toDate()
      : dayjs().add(1, 'hour').toDate();

    return {
      description: clonedEventInfo?.description || '',
      timeEnd,
      time,
      status: 'created',
      priority: data.priority || 'medium',
      group: data.group?._id || '',
      createdAt: '',
      type: 'event',
      title: data.title || '',
      members: [],
      link: data.link || null,
      linkedFrom: data._id || '',
      parentId: data.parentId || '',
    };
  };

  return (
    <Modal isView={true}>
      <ModalBody>
        <FlexBlock
          minWidth={'60vw'}
          maxWidth={'80vw'}
          grow={10}
          height={'100%'}
        >
          <ErrorBoundary
            title={ERROR_TITLES['SUSPENSE']}
            description={ERROR_DESCRIPTIONS['SUSPENSE']}
            errorType={'SYSTEM_ERROR'}
          >
            <Loader isActive={isLoading} title={'Загрузка данных...'}>
              <React.Suspense
                fallback={
                  <Loader isActive={true} title={'Загрузка формы...'} />
                }
              >
                <CreateEventForm
                  groupsList={groupsList?.data || []}
                  onComplete={(value, taskId) => {
                    if (value.linkedFrom || value.parentId) {
                      onSuccessClonedEvent &&
                        onSuccessClonedEvent(value.time, 'created', taskId);
                    } else {
                      onClose && onClose();
                    }
                  }}
                  initialValues={getInitialValues(clonedEventInfo)}
                  onCancel={(value) => {
                    onClose && onClose();
                    if (clonedEventInfo?.parentId) {
                      history.back();
                    }
                  }}
                  date={date}
                />
              </React.Suspense>
            </Loader>
          </ErrorBoundary>
        </FlexBlock>
      </ModalBody>
    </Modal>
  );
};
