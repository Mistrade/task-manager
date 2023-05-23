import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import {
  setCreateEventModalIsOpen,
  setEventInfoTabName,
} from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import {
  plannerSelectBackgroundUrl,
  plannerSelectLayout,
  plannerSelectPrevUrlOfCreateEventForm,
} from '@selectors/planner';
import React, { FC, useCallback, useLayoutEffect } from 'react';

import {
  EVENT_INFORMER_TAB_NAMES,
  SERVICES_NAMES,
} from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';

import { CreateEventModal } from '@planner/Forms/CreateEvent/CreateEventModal';

import { ObjectId } from '@api/rtk-api.types';

export const CreateEventFromPlanner: FC = ({}) => {
  const { declineModal, clearState } = useCreateEventModal();

  const navigate = useSearchNavigate();
  const layout = useAppSelector(plannerSelectLayout);
  const prevUrl = useAppSelector(plannerSelectPrevUrlOfCreateEventForm);
  const dispatch = useAppDispatch();
  const backgroundUrl = useAppSelector(plannerSelectBackgroundUrl);
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

  useLayoutEffect(() => {
    dispatch(setCreateEventModalIsOpen(true));
  }, []);

  const closeHandler = useCallback(() => {
    declineModal(
      prevUrl || backgroundUrl || getPath(SERVICES_NAMES.PLANNER, layout)
    );
  }, [declineModal, prevUrl, layout]);

  return <CreateEventModal onSuccess={successHandler} onClose={closeHandler} />;
};
