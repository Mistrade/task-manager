import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { memo, useCallback } from 'react';

import { SERVICES_NAMES } from '@src/common/constants/enums';
import { Delay, getPath } from '@src/common/functions';
import { GroupListStyled } from '@src/pages/planner/Groups/styled';

import { useGetGroupsListQuery } from '@api/planning-api';
import { GroupModelResponse } from '@api/planning-api/types/groups.types';
import { ObjectId } from '@api/rtk-api.types';

import { GroupItem } from './GroupItem';

export const GroupList = memo(() => {
  const { currentData } = useGetGroupsListQuery({});
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

  return (
    <GroupListStyled>
      {currentData?.data?.map((item) => {
        return (
          <GroupItem
            item={item}
            key={item._id}
            onDelete={onDelete}
            isChecked={item.isSelected}
            onEdit={onEdit}
            onSuccessChangeSelect={async () => await Delay(1000)}
          />
        );
      })}
    </GroupListStyled>
  );
});
