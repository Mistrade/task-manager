import React from 'react';

import { GroupModelResponse } from '@api/planning-api/types/groups.types';
import { ObjectId } from '@api/rtk-api.types';

export interface UpdateGroupModalProps {
  onClose?: () => void;
}

export interface ChangeGroupModalProps extends UpdateGroupModalProps {
  initialValues?: CreateGroupProps;
  isEditing?: boolean;
}

export interface CreateGroupProps {
  groupId: string;
  color: string;
  title: string;
}

export interface ChangeGroupHockProps extends UpdateGroupModalProps {}

export interface UpdateGroupInfoMiddlewareProps extends UpdateGroupModalProps {
  groupId: ObjectId;
}

export interface BaseGroupItemProps {
  onChange?: (data: { groupId: ObjectId; state: boolean }) => Promise<any>;
  item: GroupModelResponse;
  isChecked: boolean;
  isDisabled?: boolean;
  onDelete?: (item: GroupModelResponse) => void;
  onSuccessChangeSelect?: () => Promise<void>;
  onEdit?: (_id: ObjectId) => void;
  renderPattern?: 'full' | 'short';
  index?: number;
  onCreateEvent?: (item: GroupModelResponse) => void;
}

export interface GroupItemProps extends BaseGroupItemProps {
  onContextMenu?: (event: React.MouseEvent<HTMLLIElement>) => void;
  isFetching?: boolean;
  replaceChangeHandler?: boolean;
}
