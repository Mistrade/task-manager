import { ICheckListItem } from '@planner/planner.types';
import { ObjectId, UtcDate } from '@api/rtk-api.types';

export interface CreateCheckListRequest {
  title: string;
  data: Array<ICheckListItem>;
  eventId: ObjectId;
}

export interface CheckListModel {
  title: string;
  _id: ObjectId;
  createdAt: UtcDate;
  updatedAt: UtcDate;
  data: Array<ICheckListItem>;
}

export interface CheckListUpdateMainTitleRequest {
  fieldName: 'title';
  _id: ObjectId;
  data: string;
}

export interface CheckListUpdateItemTitleRequest {
  fieldName: 'item-title';
  _id: ObjectId;
  data: {
    itemId: ObjectId;
    value: string;
  };
}

export interface CheckListUpdateItemStateRequest {
  fieldName: 'item-state';
  _id: ObjectId;
  data: {
    itemId: ObjectId;
    value: boolean;
  };
}

export interface CheckListUpdateCreateNewElementRequest {
  fieldName: 'create';
  _id: ObjectId;
  data: Pick<ICheckListItem, 'title' | 'state'>;
}

export interface CheckListUpdateDeleteElementRequest {
  fieldName: 'delete';
  _id: ObjectId;
  data: ObjectId;
}

export type CheckListUpdateRequestData =
  | CheckListUpdateMainTitleRequest
  | CheckListUpdateItemTitleRequest
  | CheckListUpdateItemStateRequest
  | CheckListUpdateCreateNewElementRequest
  | CheckListUpdateDeleteElementRequest;
