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
import { useCreateEventModal } from '../../../../hooks/useCreateEventModal';

const CreateEventForm = React.lazy(() =>
  import('./CreateEventForm').then(({ CreateEventForm }) => ({
    default: CreateEventForm,
  }))
);

export const CreateEventModal: FC<CreateEventModalProps> = ({
  onClose,
  clonedEventInfo,
}) => {
  const { data: groupsList, isLoading } = useGetGroupsListQuery({
    exclude: ['Invite'],
  });

  const { declineModal } = useCreateEventModal({});

  return (
    <Modal isView={true} onClose={declineModal}>
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
                  onCancel={(value) => {
                    onClose && onClose();
                    if (clonedEventInfo?.parentId) {
                      history.back();
                    }
                  }}
                />
              </React.Suspense>
            </Loader>
          </ErrorBoundary>
        </FlexBlock>
      </ModalBody>
    </Modal>
  );
};
