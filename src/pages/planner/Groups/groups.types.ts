import { GroupModelResponse } from '@api/planning-api/types/groups.types';
import { UsePlannerReturned } from '@hooks/usePlanner';
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
  onEdit?: UsePlannerReturned['onCreateGroup'];
}

export interface RemoveGroupModalBaseProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export interface RemoveGroupHockProps extends RemoveGroupModalBaseProps {
  groupInfo: GroupModelResponse | null;
}

export interface RemoveGroupControllerProps extends RemoveGroupModalBaseProps {
  groupInfo: GroupModelResponse;
}

export interface RemoveGroupModalProps extends RemoveGroupControllerProps {
  count: number;
}
