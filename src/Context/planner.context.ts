import { createContext } from 'react';

import { ShortChangeCurrentPattern } from '@src/common/commonTypes';
import {
  PLANNER_LAYOUTS,
  defaultMonthItem,
  defaultWeekItem,
  defaultYearItem,
} from '@src/common/constants';

import { IPlannerProviderValue } from '@components/ContextProviders/PlannerProvider';

import { EventFilterTaskStatuses } from '@planner/RenderModes/FindEventFilter/find-event-filters.types';

import { ObjectId } from '@api/rtk-api.types';


const today = new Date();

export const PlannerContext = createContext<IPlannerProviderValue>({
  currentStatus: 'all',
  currentLayout: PLANNER_LAYOUTS.DAY,
  openEventId: null,
  layoutItems: {
    week: defaultWeekItem,
    year: defaultYearItem,
    month: defaultMonthItem,
    optionsPanel: defaultMonthItem,
  },
  methods: {
    updateCurrentLayout(layout: PLANNER_LAYOUTS, date?: Date) {},
    updateCurrentLayoutAndNavigate(layout: PLANNER_LAYOUTS, date?: Date) {},
    updateCurrentStatus(status: EventFilterTaskStatuses) {},
    updateCurrentDate(pattern: ShortChangeCurrentPattern) {},
    plannerNavigate(essence: any): any {
      return {
        go() {},
      };
    },
    openEventInfo(_id: ObjectId) {},
    closeEventInfo() {},
  },
  currentDate: {
    day: today,
    week: today,
    month: today,
    year: today,
    list: today,
    favorites: today,
  },
});