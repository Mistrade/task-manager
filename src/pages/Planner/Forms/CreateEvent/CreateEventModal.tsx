import React, { FC } from 'react';
import { CreateEventModalProps } from '../../planner.types';
import {
  Modal,
  ModalBody,
} from '../../../../components/LayoutComponents/Modal/Modal';
import { ERROR_DESCRIPTIONS, ERROR_TITLES } from '../../../../common/constants';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { ErrorBoundary } from '../../../../components/Errors/ErrorBoundary';
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
