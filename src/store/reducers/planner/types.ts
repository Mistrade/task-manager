import { ObjectId } from '@api/rtk-api.types';
import { EventFilterTaskStatuses } from '@pages/planner/RenderModes/FindEventFilter/find-event-filters.types';
import { PLANNER_LAYOUTS } from '@src/common/constants';

export interface IPlannerDate {
  day: number;
  month: number;
  year: number;
}

export interface IEventInfoState {
  _id: ObjectId;
}

export interface IPlannerReducer {
  date: Record<PLANNER_LAYOUTS, IPlannerDate>;
  layout: PLANNER_LAYOUTS;
  status: EventFilterTaskStatuses;
  eventInfo: IEventInfoState | null;
}

export interface IPlannerLayoutRenderConfig {
  // [PLANNER_LAYOUTS.DAY]:
}

//actions payload
export type TSetPlannerDatePayload = {
  date: IPlannerDate;
  layout: PLANNER_LAYOUTS;
};
