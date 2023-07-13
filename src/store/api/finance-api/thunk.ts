import { RootDispatch } from '../../index';
import { financeApi } from './index';
import {
  IAddFinanceOperationToStateThunkProps,
  IRemoveFinanceOperationFromStateThunkProps,
  IUpdateFinanceModelStateThunkProps,
  IUpdateOperationListStateProps,
} from './types';
import { updateGetFinanceModelsData } from './utils';

export const updateOperationsListThunk =
  ({ operation, index, modelId }: IUpdateOperationListStateProps) =>
  (dispatch: RootDispatch) => {
    if (operation) {
      dispatch(
        financeApi.util.updateQueryData(
          'getFinanceOperationList',
          modelId,
          (draft) => {
            const prevArr = draft.data || [];

            prevArr[index] = operation;

            Object.assign(draft, {
              data: prevArr,
              info: draft.info,
            });
          }
        )
      );
    }
  };

export const addFinanceOperationToStateThunk =
  ({ operation, modelId }: IAddFinanceOperationToStateThunkProps) =>
  (dispatch: RootDispatch) => {
    if (operation && modelId !== '') {
      dispatch(
        financeApi.util.updateQueryData(
          'getFinanceOperationList',
          modelId,
          (draft) => {
            const prevArr = [...(draft.data || [])];

            Object.assign(draft, {
              data: prevArr.concat(operation),
              info: draft.info,
            });
          }
        )
      );
    }
  };

export const removeFinanceOperationFromStateThunk = ({operationId, modelId}: IRemoveFinanceOperationFromStateThunkProps) => (dispatch: RootDispatch) => {
  dispatch(
    financeApi.util.updateQueryData(
      'getFinanceOperationList',
      modelId,
      (draft) => {
        const prevArr = [...(draft.data || [])].filter(
          (item) => item._id !== operationId
        );

        Object.assign(draft, {
          data: prevArr,
          info: draft.info,
        });
      }
    )
  );
}

export const updateFinanceModelStateThunk =
  ({
    sourceModelId,
    newModel,
    sourceModelType,
  }: IUpdateFinanceModelStateThunkProps) =>
  (dispatch: RootDispatch) => {
    if (newModel) {
      dispatch(
        financeApi.util.updateQueryData(
          'getFinanceModels',
          { _id: sourceModelId, sourceModel: sourceModelType },
          (draft) => {
            const prevArr = draft.initial ? [...draft.initial] : [];
            const arr = [...prevArr];

            const index = arr.findIndex((item) => item._id === newModel._id);

            arr[index] = newModel;

            const { switcherData, models } = updateGetFinanceModelsData(arr);

            Object.assign(draft, {
              switcherData,
              models,
              initial: arr,
            });
          }
        )
      );
    }
  };