import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import {
  clearCreateInitialState,
  CreateEventInitialState,
  setCreateEventInitialState,
} from '@redux/reducers/planner-reducer';
import { plannerSelectLayout, plannerSelectStatus } from '@selectors/planner';
import { useCallback, useMemo } from 'react';
import { useSearchNavigate } from './useSearchNavigate';

interface UseCreateEventProps {
  useReturnBackOnDecline?: boolean;
}

interface UseCreateEventReturned {
  openModal(initialValues: Partial<CreateEventInitialState>): void;

  navigateToModal(): void;

  declineModal(): void;

  clearState(): void;
}

type UseCreateEventHook = (
  props: UseCreateEventProps
) => UseCreateEventReturned;

export const useCreateEventModal: UseCreateEventHook = ({
  useReturnBackOnDecline,
}) => {
  const createEventPrevUrl = useAppSelector(
    (state) => state.planner.createEventPrevUrl
  );
  const layout = useAppSelector(plannerSelectLayout);
  const status = useAppSelector(plannerSelectStatus);
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();

  const navigateToModal = useCallback(() => {
    navigate(`/${ServicesNames.PLANNER}/${layout}/${status}/event/create`);
  }, [layout, status]);

  const openModal: UseCreateEventReturned['openModal'] = useCallback(
    (initialValues) => {
      dispatch(
        setCreateEventInitialState({
          data: initialValues || null,
          prevUrl: useReturnBackOnDecline ? location.pathname : null,
        })
      );

      navigateToModal();
    },
    [useReturnBackOnDecline, navigate]
  );

  const clearState = useCallback(() => {
    dispatch(clearCreateInitialState());
  }, []);

  const declineModal: UseCreateEventReturned['declineModal'] =
    useCallback(() => {
      if (createEventPrevUrl) {
        navigate(createEventPrevUrl, { replace: true });
      } else {
        const [serviceName, layout, status] = window.location.pathname
          .split('/')
          .filter((item) => !!item);
        navigate('/' + [serviceName, layout, status].join('/'));
      }
      clearState();
    }, [createEventPrevUrl]);

  return useMemo(
    () => ({
      openModal,
      navigateToModal,
      declineModal,
      clearState,
    }),
    [layout, status, createEventPrevUrl]
  );
};
