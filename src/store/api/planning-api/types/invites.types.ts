import { ObjectId, UtcDate } from '@api/rtk-api.types';
import { UserModel } from '@api/session-api/session-api.types';

import {
  EventInviteAcceptedStatuses,
  EventInviteAccessRights,
} from './event-info.types';

export interface UserInviteItem {
  user: UserModel;
  date: UtcDate;
  rights: EventInviteAccessRights;
  status: EventInviteAcceptedStatuses;
  _id: ObjectId;
}
