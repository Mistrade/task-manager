import { FC } from 'react';

import { Modal } from '@components/LayoutComponents/Modal/Modal';

import { ChangeGroupModalProps } from '@planner/Groups/types';

import { CreateOrUpdateGroupForm } from './Form';

export const CreateOrUpdateGroupModal: FC<ChangeGroupModalProps> = ({
  onClose,
  isEditing,
  initialValues,
}) => {
  return (
    <Modal style={{ height: 'fit-content' }} isView={true} onClose={onClose}>
      <CreateOrUpdateGroupForm
        onClose={onClose}
        initialValues={initialValues}
        isEditing={isEditing}
      />
    </Modal>
  );
};
