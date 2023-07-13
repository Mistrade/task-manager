import {
  clearCreateInitialState,
  setCreateEventInitialState,
  setCreateEventModalIsOpen,
} from '@planner-reducer/index';
import { CreateEventInitialState } from '@planner-reducer/types';
import { useAppDispatch } from '@redux/hooks/hooks';
import { useCallback, useMemo } from 'react';

import { useSearchNavigate } from './useSearchNavigate';

export interface UseCreateEventReturned {
  openModal(
    initialValues: Partial<CreateEventInitialState>,
    options: { modalPath?: string; useReturnBackOnDecline?: boolean }
  ): void;

  declineModal(path?: string | null): void;

  clearState(): void;
}

type UseCreateEventHook = () => UseCreateEventReturned;

export const useCreateEventModal: UseCreateEventHook = () => {
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();

  const openModal: UseCreateEventReturned['openModal'] = useCallback(
    (initialValues, { modalPath, useReturnBackOnDecline }) => {
      dispatch(
        setCreateEventInitialState({
          data: initialValues || null,
          prevUrl: useReturnBackOnDecline ? location.pathname : null,
        })
      );

      dispatch(setCreateEventModalIsOpen(true));

      modalPath && navigate(modalPath);
    },
    [navigate]
  );

  const clearState = useCallback(() => {
    dispatch(clearCreateInitialState());
  }, []);

  const declineModal: UseCreateEventReturned['declineModal'] = useCallback(
    (path?: string) => {
      dispatch(setCreateEventModalIsOpen(false));
      clearState();
      path && navigate(path);
    },
    []
  );

  return useMemo(
    () => ({
      openModal,
      declineModal,
      clearState,
    }),
    []
  );
};
