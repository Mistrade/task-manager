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

export interface GroupItemProps {
  onChange?: (checked: boolean) => void;
  item: GroupModelResponse;
  isChecked: boolean;
  isDisabled?: boolean;
  onDelete?: (item: GroupModelResponse) => void;
  onSuccessChangeSelect?: () => Promise<void>;
  onEdit?: (_id: ObjectId) => void;
}
