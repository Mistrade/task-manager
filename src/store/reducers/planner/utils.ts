import { ObjectId } from '@api/rtk-api.types';
import { EventFilterTaskStatuses } from '@pages/planner/RenderModes/FindEventFilter/find-event-filters.types';
import { EVENT_INFORMER_TAB_NAMES } from '@pages/planner/TaskInformer/LeftBar/TaskInformerLeftBar';
import { IPlannerDate } from '@planner-reducer/types';
import { ServicesNames } from '@redux/reducers/global';
import { PLANNER_LAYOUTS, URLTaskStatuses } from '@src/common/constants';
import dayjs, { Dayjs } from 'dayjs';

export const isEqualPlannerDate = (
  prev: IPlannerDate,
  next: IPlannerDate
): boolean => {
  const dayIsEqual = prev.day === next.day;
  const monthIsEqual = prev.month === next.month;
  const yearIsEqual = prev.year === next.year;

  return dayIsEqual && monthIsEqual && yearIsEqual;
};

export const dateToPlannerDate = (
  date: Date | Dayjs | string
): IPlannerDate => {
  const value = date instanceof Dayjs ? date : dayjs(date);

  return {
    day: value.date(),
    month: value.month(),
    year: value.year(),
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

  if (serviceName === ServicesNames.PLANNER) {
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
