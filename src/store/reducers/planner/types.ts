import { ObjectId } from '@api/rtk-api.types';
import { EventFilterTaskStatuses } from '@pages/planner/RenderModes/FindEventFilter/find-event-filters.types';
import {
  MonthItem,
  TLayoutItemsScope,
  WeekItem,
  YearItem,
} from '@planner/planner.types';
import { EVENT_INFORMER_TAB_NAMES } from '@planner/TaskInformer/LeftBar/TaskInformerLeftBar';
import { PLANNER_LAYOUTS } from '@src/common/constants';

export interface IPlannerDate {
  day: number;
  month: number;
  year: number;
  week: number;
}

export interface IEventInfoState {
  _id: ObjectId | null;
  tabName: EVENT_INFORMER_TAB_NAMES;
}

export interface IPlannerReducer {
  date: Record<PLANNER_LAYOUTS, IPlannerDate>;
  layout: PLANNER_LAYOUTS;
  status: EventFilterTaskStatuses;
  eventInfo: IEventInfoState;
  config: {
    layouts: IPlannerLayoutRenderConfig;
    optionsPanel: TPlannerPanelRenderConfig;
  };
}

export interface IPlannerLayoutRenderConfig {
  [PLANNER_LAYOUTS.WEEK]: WeekItem;
  [PLANNER_LAYOUTS.MONTH]: MonthItem;
  [PLANNER_LAYOUTS.YEAR]: YearItem;
  [PLANNER_LAYOUTS.DAY]: { scope: TLayoutItemsScope };
  [PLANNER_LAYOUTS.LIST]: { scope: TLayoutItemsScope };
  [PLANNER_LAYOUTS.FAVORITES]: { scope: TLayoutItemsScope };
}

export type TPlannerPanelRenderConfig = MonthItem;

//actions payload
export type TSetPlannerDatePayload = {
  date: IPlannerDate;
  layout: PLANNER_LAYOUTS;
};
