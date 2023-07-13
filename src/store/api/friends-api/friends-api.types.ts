import { ObjectId, UtcDate } from '@api/rtk-api.types';
import { UserModel } from '@api/session-api/session-api.types';

export type TFriendModelAcceptedStatuses = 'CREATED' | 'ACCEPTED' | 'DECLINE';

export interface IFriendModel {
  userInfo: UserModel;
  acceptedStatus: TFriendModelAcceptedStatuses;
  _id: ObjectId;
  createdAt: UtcDate;
  updatedAt: UtcDate;
}

export type TFriendsModelList = Array<IFriendModel>;