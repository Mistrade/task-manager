import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { useCallback } from 'react';

import {
  useChangeSelectGroupMutation,
  useGetGroupsListQuery,
} from '@api/planning-api';
import { GroupModelResponse } from '@api/planning-api/types/groups.types';
import { ObjectId } from '@api/rtk-api.types';

import { SERVICES_NAMES } from '../common/constants/enums';
import { getPath } from '../common/functions';
import { useCreateEventModal } from './useCreateEventModal';
import { useSearchNavigate } from './useSearchNavigate';

export const useGroupList = () => {
  const { openModal } = useCreateEventModal();
  const { currentData } = useGetGroupsListQuery({});
  const [changeSelect] = useChangeSelectGroupMutation();
  const navigate = useSearchNavigate();
  const layout = useAppSelector(plannerSelectLayout);
  const onDelete = useCallback(
    (item: GroupModelResponse) => {
      navigate(
        getPath(SERVICES_NAMES.PLANNER, layout, `group/remove/${item._id}`)
      );
    },
    [layout]
  );

  const onEdit = useCallback(
    (_id: ObjectId) => {
      navigate(getPath(SERVICES_NAMES.PLANNER, layout, `group/update/${_id}`));
    },
    [layout]
  );

  const changeHandler = async ({
    groupId,
    state,
  }: {
    groupId: ObjectId;
    state: boolean;
  }) => {
    return await changeSelect({
      groupId,
      state,
    }).unwrap();
  };

  const onCreateEvent = (item: GroupModelResponse) => {
    openModal(
      {
        group: item._id,
      },
      {
        useReturnBackOnDecline: true,
        modalPath: getPath(SERVICES_NAMES.PLANNER, layout, 'event/create'),
      }
    );
  };

  return {
    changeHandler,
    onEdit,
    onDelete,
    currentData,
    onCreateEvent,
  };
};
