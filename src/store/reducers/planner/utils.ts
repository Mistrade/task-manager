import { IPlannerDate, IPlannerReducer } from '@planner-reducer/types';
import dayjs, { Dayjs } from 'dayjs';

import { PlannerObserver } from '@src/common/calendarSupport/observer';
import {
  EVENT_INFORMER_TAB_NAMES,
  PLANNER_LAYOUTS,
  SERVICES_NAMES,
} from '@src/common/constants/enums';
import { URLTaskStatuses } from '@src/common/constants/signatures';

import { EventFilterTaskStatuses } from '@pages/planner/RenderModes/FindEventFilter/find-event-filters.types';

import { ObjectId } from '@api/rtk-api.types';


export const isEqualPlannerDate = (
  prev: IPlannerDate,
  next: IPlannerDate
): boolean => {
  const dayIsEqual = prev.day === next.day;
  const monthIsEqual = prev.month === next.month;
  const yearIsEqual = prev.year === next.year;

  return dayIsEqual && monthIsEqual && yearIsEqual;
};

export const plannerDateToDate = (value: IPlannerDate) => {
  return new Date(value.year, value.month, value.day);
};

export const dateToPlannerDate = (
  date: Date | Dayjs | string
): IPlannerDate => {
  const value = dayjs(date);

  return {
    day: value.date(),
    month: value.month(),
    year: value.year(),
    week: value.week(),
  };
};

export const isCorrectLayout = (value: string): boolean => {
  const arrOfLayouts: Array<string> = Object.values(PLANNER_LAYOUTS);
  return arrOfLayouts.includes(value);
};

export const isCorrectStatus = (value: string): boolean => {
  return Object.keys(URLTaskStatuses).includes(value);
};

export const isCorrectEventId = (value: string): boolean => {
  return value.length === 24;
};

export const isCorrectEventInformerTabName = (value: string): boolean => {
  const arr: Array<string> = Object.values(EVENT_INFORMER_TAB_NAMES);
  return arr.includes(value);
};

export const getPlannerMetaData = (
  path: string
): {
  layout: PLANNER_LAYOUTS | null;
  status: EventFilterTaskStatuses | null;
  eventInfoId: ObjectId | null;
  eventInformerTabName: EVENT_INFORMER_TAB_NAMES | null;
} => {
  const [serviceName, layout, status, eventPath, infoPath, eventId, tabName] =
    path.split('/').filter((part) => part.length);

  if (serviceName === SERVICES_NAMES.PLANNER) {
    return {
      layout:
        layout && isCorrectLayout(layout) ? (layout as PLANNER_LAYOUTS) : null,
      status:
        status && isCorrectStatus(status)
          ? (status as EventFilterTaskStatuses)
          : null,
      eventInfoId:
        eventId && isCorrectEventId(eventId) ? (eventId as ObjectId) : null,
      eventInformerTabName:
        tabName && isCorrectEventInformerTabName(tabName)
          ? (tabName as EVENT_INFORMER_TAB_NAMES)
          : null,
    };
  }
  return {
    layout: null,
    status: null,
    eventInfoId: null,
    eventInformerTabName: null,
  };
};

export const setLayoutConfig = <T extends PLANNER_LAYOUTS>(
  state: IPlannerReducer,
  payload: { date: IPlannerDate; layout: T }
): void => {
  const observer = new PlannerObserver();

  console.log(state, payload);

  switch (payload.layout) {
    case PLANNER_LAYOUTS.DAY: {
      const prev = state.config.layouts.day.scope;
      const isEqual = isEqualPlannerDate(prev.startDate, payload.date);
      if (!isEqual) {
        state.config.layouts.day.scope = {
          startDate: payload.date,
          endDate: payload.date,
        };
      }
      break;
    }
    case PLANNER_LAYOUTS.WEEK: {
      const prev = state.config.layouts[PLANNER_LAYOUTS.WEEK].stateDate;
      const isEqual = isEqualPlannerDate(prev, payload.date);

      console.log('isEqual: ', isEqual, prev, payload);

      if (!isEqual) {
        state.config.layouts[PLANNER_LAYOUTS.WEEK] = observer.getWeekItem(
          plannerDateToDate(payload.date)
        );
      }
      break;
    }
    case PLANNER_LAYOUTS.MONTH: {
      const prev = state.config.layouts[PLANNER_LAYOUTS.MONTH].stateDate;
      const isEqual = isEqualPlannerDate(prev, payload.date);

      if (!isEqual) {
        state.config.layouts[PLANNER_LAYOUTS.MONTH] = observer.getMonthItem(
          plannerDateToDate(payload.date)
        );
      }
      break;
    }
    case PLANNER_LAYOUTS.YEAR: {
      const prev = state.config.layouts[PLANNER_LAYOUTS.YEAR].stateDate;
      const isEqual = isEqualPlannerDate(prev, payload.date);

      if (!isEqual) {
        state.config.layouts[PLANNER_LAYOUTS.YEAR] = observer.getYearItem(
          plannerDateToDate(payload.date)
        );
      }
      break;
    }
    case PLANNER_LAYOUTS.LIST: {
      const prev = state.config.layouts[PLANNER_LAYOUTS.LIST].scope;
      const isEqual = isEqualPlannerDate(prev.startDate, payload.date);

      if (!isEqual) {
        state.config.layouts[PLANNER_LAYOUTS.LIST].scope = {
          startDate: payload.date,
          endDate: dateToPlannerDate(
            dayjs(plannerDateToDate(payload.date)).add(3, 'day')
          ),
        };
      }
      break;
    }
    case PLANNER_LAYOUTS.FAVORITES: {
      break;
    }
  }
};