import { useAppDispatch } from '@redux/hooks/hooks';
import { setDisableModalState } from '@redux/reducers/global';
import React, { FC, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { FlexBlock } from '@components/LayoutComponents';
import { Modal, ModalContext } from '@components/LayoutComponents/Modal/Modal';

import {
  useCreateFinanceOperationMutation,
  useUpdateFinanceOperationMutation,
} from '@api/finance-api';
import {
  FINANCE_SOURCE_MODELS,
  IFinanceModel,
  TFinanceOperationWithDate,
} from '@api/finance-api/types';

import { FinanceForm, TFinanceOperationFormType } from '../index';

export interface IModalStateUpdate {
  show: boolean;
  actionType: 'update';
  data: TFinanceOperationWithDate;
  index: number;
}

export interface IModalStateCreate {
  actionType: 'create';
  show: boolean;
  data: TFinanceOperationFormType;
}

interface UpdateOperationModalProps {
  data: IModalStateUpdate | IModalStateCreate;
  model: IFinanceModel;
  onClose?: () => Promise<void> | void;
}

export const FinanceOperationModal: FC<UpdateOperationModalProps> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDisableModalState(true));
    return () => {
      dispatch(setDisableModalState(false));
    };
  }, []);

  return createPortal(
    <Modal isView={true} verticalPlacement={'center'}>
      <ModalBody {...props} />
    </Modal>,
    document.getElementById('root') as HTMLDivElement
  );
};

const ModalBody: FC<Omit<UpdateOperationModalProps, 'isView'>> = ({
  onClose,
  data,
  model,
}) => {
  const modalContext = useContext(ModalContext);

  const [updateFn, { isLoading: isUpdateLoading }] =
    useUpdateFinanceOperationMutation();

  const [createOperation, { isLoading: isCreateLoading }] =
    useCreateFinanceOperationMutation();

  const closeHandler = (cb?: () => any) => {
    if (modalContext?.closeModalAnimation) {
      modalContext.closeModalAnimation().then(cb);
    } else {
      cb && cb();
    }
  };

  return (
    <FlexBlock maxWidth={'400px'} minWidth={300} p={12}>
      <FinanceForm
        isUpdateMode={data.actionType === 'update'}
        isLoading={isUpdateLoading || isCreateLoading}
        onSave={async (item, isUpdateMode) => {
          if (data.actionType === 'update') {
            await updateFn({
              ...data.data,
              ...item,
              model: model._id,
              sourceModel: model.modelPath,
              sourceModelId: model.model,
              index: data.index,
            });
          } else {
            await createOperation({
              count: item.count,
              value: item.value,
              date: item.date,
              operationType: item.operationType,
              name: item.name,
              model: model?._id || '',
              description: item.description,
              sourceModel: model?.modelPath || FINANCE_SOURCE_MODELS.EVENT,
              sourceModelId: model?.model || '',
            }).unwrap();
          }

          isUpdateMode && closeHandler(onClose);
          return;
        }}
        onDecline={() => closeHandler(onClose)}
        clearAfterOnSave={true}
        initialValues={data.data}
      />
    </FlexBlock>
  );
};
