import { ObjectId } from '@api/rtk-api.types';
import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setEventInfoTabName } from '@planner-reducer/index';
import { CreateEventModal } from '@planner/Forms/CreateEvent/CreateEventModal';
import { EVENT_INFORMER_TAB_NAMES } from '@planner/TaskInformer/LeftBar/TaskInformerLeftBar';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import { plannerSelectLayout, plannerSelectStatus } from '@selectors/planner';
import { getPath } from '@src/common/functions';
import { FC, useCallback } from 'react';

export const CreateEventFromPlanner: FC = ({}) => {
  const { declineModal, clearState } = useCreateEventModal();

  const navigate = useSearchNavigate();
  const status = useAppSelector(plannerSelectStatus);
  const layout = useAppSelector(plannerSelectLayout);
  const prevUrl = useAppSelector((state) => state.planner.createEventPrevUrl);
  const dispatch = useAppDispatch();
  const successHandler = useCallback(
    (eventId: ObjectId) => {
      clearState();
      dispatch(setEventInfoTabName(EVENT_INFORMER_TAB_NAMES.ABOUT));
      navigate(
        getPath(ServicesNames.PLANNER, layout, status, 'event', 'info', eventId)
      );
    },
    [layout, status, clearState]
  );

  const closeHandler = useCallback(() => {
    declineModal(prevUrl || getPath(ServicesNames.PLANNER, layout, status));
  }, [declineModal, prevUrl, layout, status]);

  return <CreateEventModal onSuccess={successHandler} onClose={closeHandler} />;
};
