import { UserModel } from '../session-api/session-api.types';
import { ObjectId, UtcDate } from '../rtk-api.types';

export type TFriendModelAcceptedStatuses = 'CREATED' | 'ACCEPTED' | 'DECLINE';

export interface IFriendModel {
  userInfo: UserModel;
  acceptedStatus: TFriendModelAcceptedStatuses;
  _id: ObjectId;
  createdAt: UtcDate;
  updatedAt: UtcDate;
}

export type TFriendsModelList = Array<IFriendModel>;
