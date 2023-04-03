import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { useCallback, useContext } from 'react';
import { useLocation } from 'react-router';
import {
  clearCreateInitialState,
  CreateEventInitialState,
  setCreateEventInitialState,
} from '../store/reducers/planner-reducer';
import { useSearchNavigate } from './useSearchNavigate';
import { PlannerContext } from '../Context/planner.context';

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
  const { createEventPrevUrl } = useAppSelector((state) => state.planner);

  const {
    methods: { plannerNavigate },
  } = useContext(PlannerContext);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();

  const navigateToModal = useCallback(() => {
    plannerNavigate('createEventModal').go();
  }, [plannerNavigate]);

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
        plannerNavigate('current').go();
      }
      clearState();
    }, [createEventPrevUrl, plannerNavigate]);

  return {
    openModal,
    navigateToModal,
    declineModal,
    clearState,
  };
};
