import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { useCallback } from 'react';
import { useLocation } from 'react-router';
import { CreateEventDataObject } from '../pages/Planner/planner.types';
import {
  clearCreateInitialState,
  CreateEventInitialState,
  PlannerReducerState,
  setCreateEventInitialState,
} from '../store/reducers/planner-reducer';
import { useSearchNavigate } from './useSearchNavigate';
import { createEventInitialStateSelector } from '../store/selectors/calendarItems';

interface UseCreateEventProps {
  useReturnBackOnDecline?: boolean;
}

interface UseCreateEventReturned {
  openModal(initialValues: Partial<CreateEventInitialState>): void;

  navigateToModal(): void;

  initialState: CreateEventDataObject;
  prevUrl: PlannerReducerState['createEventPrevUrl'];

  declineModal(): void;
  clearState(): void;
}

type UseCreateEventHook = (
  props: UseCreateEventProps
) => UseCreateEventReturned;

export const useCreateEvent: UseCreateEventHook = ({
  useReturnBackOnDecline,
}) => {
  const {
    statuses,
    planner: { layout },
    createEventPrevUrl,
  } = useAppSelector((state) => state.planner);

  const createEventInitialState = useAppSelector(
    createEventInitialStateSelector
  );
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();

  const navigateToModal = useCallback(() => {
    navigate(`/planner/${layout}/${statuses}/create`);
  }, [statuses, layout, navigate]);

  const openModal: UseCreateEventReturned['openModal'] = useCallback(
    (initialValues) => {
      console.log('open Modal with props: ', initialValues);
      dispatch(
        setCreateEventInitialState({
          data: initialValues || null,
          prevUrl: useReturnBackOnDecline ? location.pathname : null,
        })
      );

      navigateToModal();
    },
    [useReturnBackOnDecline, statuses, layout, navigate]
  );

  const clearState = useCallback(() => {
    dispatch(clearCreateInitialState());
  }, []);

  const declineModal: UseCreateEventReturned['declineModal'] =
    useCallback(() => {
      if (createEventPrevUrl) {
        navigate(createEventPrevUrl, { replace: true });
      } else {
        navigate(`/planner/${layout}/${statuses}`);
      }
      clearState();
    }, [useReturnBackOnDecline, createEventPrevUrl, statuses, layout]);

  return {
    openModal,
    navigateToModal,
    initialState: createEventInitialState,
    prevUrl: createEventPrevUrl,
    declineModal,
    clearState,
  };
};
