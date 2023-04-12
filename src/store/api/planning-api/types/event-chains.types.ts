import { ObjectId } from '@api/rtk-api.types';
import { ShortEventInfoModel } from './event-info.types';

export interface EventChainsObject {
  parentEvent: null | ShortEventInfoModel;
  childrenEvents: null | Array<ShortEventInfoModel>;
  linkedFromEvent: null | ShortEventInfoModel;
}

export interface AddChainsRequestData {
  eventId: ObjectId;
  eventsToAdd: Array<ObjectId>;
}

export type ProblemEventsSchema = {
  [key: string]: {
    _id: string;
    description: string;
    reqNodeId: string;
  };
};

export interface ConnectChildResponse {
  problemEventIds: ProblemEventsSchema;
}
