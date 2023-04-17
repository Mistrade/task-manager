import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setEventInfoTabName } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import React, { FC, useCallback } from 'react';

import { SERVICES_NAMES } from '@src/common/constants';
import { getPath } from '@src/common/functions';

import { CreateEventModal } from '@planner/Forms/CreateEvent/CreateEventModal';
import { EVENT_INFORMER_TAB_NAMES } from '@planner/TaskInformer/LeftBar/TaskInformerLeftBar';

import { ObjectId } from '@api/rtk-api.types';

export const CreateEventFromPlanner: FC = ({}) => {
  const { declineModal, clearState } = useCreateEventModal();

  const navigate = useSearchNavigate();
  const layout = useAppSelector(plannerSelectLayout);
  const prevUrl = useAppSelector((state) => state.planner.createEventPrevUrl);
  const dispatch = useAppDispatch();
  const successHandler = useCallback(
    (eventId: ObjectId) => {
      clearState();
      dispatch(setEventInfoTabName(EVENT_INFORMER_TAB_NAMES.ABOUT));
      navigate(
        getPath(SERVICES_NAMES.PLANNER, layout, 'event', 'info', eventId)
      );
    },
    [layout, clearState]
  );

  const closeHandler = useCallback(() => {
    declineModal(prevUrl || getPath(SERVICES_NAMES.PLANNER, layout));
  }, [declineModal, prevUrl, layout]);

  return <CreateEventModal onSuccess={successHandler} onClose={closeHandler} />;
};
