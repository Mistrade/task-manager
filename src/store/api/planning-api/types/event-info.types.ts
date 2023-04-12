import {
  CalendarPriorityKeys,
  EventLinkItem,
  ICheckListItem,
  TaskStatusesType,
} from '@planner/planner.types';
import { UserModel } from '@api/session-api/session-api.types';
import { GroupModelResponse } from './groups.types';
import { ObjectId, UtcDate } from '@api/rtk-api.types';
import { EventFilterTaskStatuses } from '@planner/RenderModes/FindEventFilter/find-event-filters.types';

export type EventInviteAcceptedStatuses =
  | 'not_accepted'
  | 'accepted'
  | 'decline';
export type EventInviteAccessRights = 'viewer' | 'editor' | 'admin';
export type AccessRightsWithOwner = EventInviteAccessRights | 'owner';

export interface CheckListModel {
  title: string;
  data: Array<ICheckListItem>;
}

export interface EventInfoModel {
  _id: ObjectId;
  description: string;
  link: EventLinkItem | null;
  linkedFrom?: ObjectId;
  parentId?: ObjectId;
  priority: CalendarPriorityKeys;
  status: TaskStatusesType;
  title: string;
  type: string;
  time: UtcDate;
  timeEnd: UtcDate;
  createdAt: UtcDate;
  updatedAt: UtcDate;
  userId: UserModel;
  group: GroupModelResponse | null;
  invites: Array<ObjectId>;
  isLiked: boolean;
  accessRights?: AccessRightsWithOwner;
  acceptedStatus?: EventInviteAcceptedStatuses;
  treeId?: ObjectId | null;
  checkList?: ObjectId | null;
}

export type ShortEventItemWithoutUserId = Pick<
  EventInfoModel,
  | 'title'
  | 'time'
  | 'timeEnd'
  | 'link'
  | '_id'
  | 'priority'
  | 'description'
  | 'status'
  | 'group'
  | 'isLiked'
  | 'treeId'
>;

export interface ShortEventInfoModel extends ShortEventItemWithoutUserId {
  userId: UserModel;
}

export interface GetEventsFiltersExcludeOptions {
  eventIds?: Array<ObjectId>;
  linkedFrom?: ObjectId;
  parentId?: ObjectId;
}

export type FilterChainsTypes = 'parentOf' | 'childOf';

export interface GetEventsFiltersRequestProps {
  limit?: number | null;
  fromDate?: string | null;
  toDate?: string | null;
  title?: string | null;
  priority?: CalendarPriorityKeys | null;
  taskStatus?: EventFilterTaskStatuses | null;
  onlyFavorites?: boolean;
  utcOffset: number;
  findOnlyInSelectedGroups?: boolean;
  exclude?: GetEventsFiltersExcludeOptions;
  chainsFilter?: {
    type: FilterChainsTypes;
    eventId: ObjectId;
  }; //учитывать тип связей
}

export interface UpdateEventRequestProps {
  id: ObjectId;
  field: string;
  data: any;
}

export interface EventIdObject {
  eventId: ObjectId;
}

export type GetEventsSchemeResponse = {
  [key: string]: boolean | undefined;
};

export interface SortedEventsObject<
  EventType extends ShortEventInfoModel | EventInfoModel = ShortEventInfoModel
> {
  throughEvents: Array<EventType>;
  baseEvents: Array<EventType>;
}

export type ShortEventsArray = Array<ShortEventInfoModel>;
