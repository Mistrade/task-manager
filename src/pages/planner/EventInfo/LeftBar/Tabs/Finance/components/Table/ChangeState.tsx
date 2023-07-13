import { useUpdateFinanceOperationStateMutation } from '@api/finance-api';
import { ObjectId } from '@api/rtk-api.types';
import { Checkbox, Flex } from 'chernikov-kit';
import React, { FC } from 'react';


export interface IChangeFinanceOperationStateProps {
  index: number;
  modelId: ObjectId;
  prevState: boolean;
  operationId: ObjectId;
}

export const ChangeFinanceOperationState: FC<
  IChangeFinanceOperationStateProps
> = ({ index, prevState, operationId, modelId }) => {
  const [updateItemState, { isLoading }] =
    useUpdateFinanceOperationStateMutation();

  return (
    <Flex width={'100%'} height={'100%'} justify={'center'} align={'center'}>
      <Checkbox
        iconProps={{ size: 18 }}
        isChecked={prevState}
        title={''}
        isLoading={isLoading}
        onChange={() =>
          updateItemState({
            modelId,
            index,
            state: !prevState,
            _id: operationId,
          })
        }
      />
    </Flex>
  );
};