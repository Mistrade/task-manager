import { useAppSelector } from '@redux/hooks/hooks';
import { selectCreateEventModalIsOpen } from '@selectors/planner';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { ERROR_DESCRIPTIONS, ERROR_TITLES } from '@src/common/constants/enums';

import { ErrorBoundary } from '@components/Errors/ErrorBoundary';
import { FlexBlock } from '@components/LayoutComponents';
import { Modal, ModalBody } from '@components/LayoutComponents/Modal/Modal';
import { Loader } from '@components/Loaders/Loader';

import { useGetGroupsListQuery } from '@api/planning-api';

import { CreateEventModalProps } from 'src/pages/planner/types';


const CreateEventForm = React.lazy(() =>
  import('./CreateEventForm').then(({ CreateEventForm }) => ({
    default: CreateEventForm,
  }))
);

export const CreateEventModal: FC<CreateEventModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const { data: groupsList, isLoading } = useGetGroupsListQuery({});
  const isOpen = useAppSelector(selectCreateEventModalIsOpen);

  return (
    <>
      <Helmet title={`Форма создания нового события`} />
      <Modal isView={isOpen} onClose={onClose}>
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
                    onClose={onClose}
                    onSuccess={onSuccess}
                  />
                </React.Suspense>
              </Loader>
            </ErrorBoundary>
          </FlexBlock>
        </ModalBody>
      </Modal>
    </>
  );
};