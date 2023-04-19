import { FC } from 'react';
import { useParams } from 'react-router';

import { CreateOrUpdateGroupModal } from '@planner/Groups/Create/CreateOrUpdateGroup';
import { UpdateGroupInfoMiddleware } from '@planner/Groups/Update/Middleware';
import { ChangeGroupHockProps } from '@planner/Groups/types';

export const UpdateGroupInfoHock: FC<ChangeGroupHockProps> = ({ onClose }) => {
  const { groupId } = useParams<{ groupId?: string }>();

  if (groupId) {
    return <UpdateGroupInfoMiddleware onClose={onClose} groupId={groupId} />;
  }

  return <CreateOrUpdateGroupModal onClose={onClose} />;
};
