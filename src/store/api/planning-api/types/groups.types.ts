import { ObjectId, UtcDate } from '@api/rtk-api.types';
import { UserModel } from '@api/session-api/session-api.types';

export interface ChangeSelectGroupRequestProps extends GroupIdObject {
  state: boolean;
}

export interface GroupIdObject {
  groupId: ObjectId;
}

export type GroupTypes = 'Invite' | 'Custom' | 'Main';

export interface GroupModelResponse {
  _id: ObjectId;
  userId: UserModel;
  created: UtcDate;
  isSelected: boolean;
  title: string;
  editable: boolean;
  color: string;
  deletable: boolean;
  type: GroupTypes;
}

export interface GetGroupsListRequestProps {
  exclude?: Array<GroupModelResponse['type']>;
}

export type ArrayOfGroupModel = Array<GroupModelResponse>;