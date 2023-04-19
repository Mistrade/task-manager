import { PayloadAction } from '@reduxjs/toolkit';

import {
  EVENT_INFORMER_TAB_NAMES,
  PLANNER_LAYOUTS,
} from '@src/common/constants/enums';

import { EventFilterTaskStatuses } from '@pages/planner/RenderModes/FindEventFilter/find-event-filters.types';

import {
  CalendarPriorityKeys,
  CreateEventDataObject,
  MonthItem,
  TLayoutItemsScope,
  WeekItem,
  YearItem,
} from '@planner/planner.types';

import { ObjectId } from '@api/rtk-api.types';

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

type ReplaceType<
  Object extends object,
  ReplaceKeys extends keyof Object,
  PasteType
> = Omit<Object, ReplaceKeys> & {
  [key in ReplaceKeys]: PasteType;
};
export type CreateEventInitialState = Partial<
  ReplaceType<CreateEventDataObject, 'time' | 'timeEnd', string>
>;
export type SetCreateEventInitialStatePayload = PayloadAction<{
  data: Partial<CreateEventInitialState> | null;
  prevUrl: string | null;
}>;

export interface IPlannerReducer {
  date: Record<PLANNER_LAYOUTS, IPlannerDate>;
  layout: PLANNER_LAYOUTS;
  eventInfo: IEventInfoState;
  config: {
    layouts: IPlannerLayoutRenderConfig;
    optionsPanel: TPlannerPanelRenderConfig;
  };
  createEventModal: {
    isOpen: boolean;
  };
  eventFilter: IEventFiltersState;
  createEventInitialState: null | CreateEventInitialState;
  createEventPrevUrl: string | null;
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

export interface IEventFiltersState {
  lastResetTS: number;
  title: string;
  taskStatus: EventFilterTaskStatuses;
  priority: CalendarPriorityKeys | null;
}
