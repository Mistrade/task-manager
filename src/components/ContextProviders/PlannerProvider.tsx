import { PlannerContext } from '../../Context/planner.context';
import {
  FCWithChildren,
  MonthItem,
  WeekItem,
  YearItem,
} from '../../pages/Planner/planner.types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EventFilterTaskStatuses } from '../../pages/Planner/RenderModes/FindEventFilter/find-event-filters.types';
import { PlannerObserver } from '../../common/calendarSupport/observer';
import {
  defaultMonthItem,
  defaultWeekItem,
  defaultYearItem,
  PLANNER_LAYOUTS,
} from '../../common/constants';
import { useSearchNavigate } from '../../hooks/useSearchNavigate';
import { ShortChangeCurrentPattern } from '../../common/commonTypes';
import dayjs from 'dayjs';
import { ObjectId } from '../../store/api/rtk-api.types';
import { EVENT_INFORMER_TAB_NAMES } from '../../pages/Planner/TaskInformer/LeftBar/TaskInformerLeftBar';
import { useAppDispatch } from '../../store/hooks/hooks';
import { ServicesNames, setServiceName } from '../../store/reducers/global';

const today = new Date();

export type TPlannerProviderCurrentDate = {
  [key in PLANNER_LAYOUTS]: Date;
};

export interface ILayoutItemsMap {
  week: WeekItem;
  month: MonthItem;
  optionsPanel: MonthItem;
  year: YearItem;
}

export interface IPlannerProviderMethods {
  updateCurrentLayout(layout: PLANNER_LAYOUTS, date?: Date): void;

  updateCurrentLayoutAndNavigate(layout: PLANNER_LAYOUTS, date?: Date): void;

  updateCurrentStatus(status: EventFilterTaskStatuses): void;

  updateCurrentDate(pattern: ShortChangeCurrentPattern): void;

  openEventInfo(_id: ObjectId): void;

  closeEventInfo(): void;

  plannerNavigate(item: 'current'): { go(): void };

  plannerNavigate(item: 'layout'): { go(layout: PLANNER_LAYOUTS): void };

  plannerNavigate(item: 'status'): {
    go(status: EventFilterTaskStatuses): void;
  };

  plannerNavigate(item: 'createEventModal'): { go(): void };

  plannerNavigate(item: 'eventInfo'): {
    go(_id: ObjectId, tabName: EVENT_INFORMER_TAB_NAMES): void;
  };
}

export interface IPlannerProviderValue {
  currentDate: TPlannerProviderCurrentDate;
  currentLayout: PLANNER_LAYOUTS;
  currentStatus: EventFilterTaskStatuses;
  openEventId: ObjectId | null;
  layoutItems: ILayoutItemsMap;
  methods: IPlannerProviderMethods;
}

export const PlannerProvider: FCWithChildren<{
  layout: PLANNER_LAYOUTS;
  status: EventFilterTaskStatuses;
}> = ({ children, layout, status }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setServiceName(ServicesNames.PLANNER));
    return () => {
      dispatch(setServiceName(null));
    };
  }, []);

  const observer = useMemo(() => new PlannerObserver(), []);
  const navigate = useSearchNavigate();

  const [currentDate, setCurrentDate] = useState<TPlannerProviderCurrentDate>({
    day: today,
    week: today,
    month: today,
    year: today,
    list: today,
    favorites: today,
  });

  const [currentLayout, setCurrentLayout] = useState<PLANNER_LAYOUTS>(layout);

  useEffect(() => {
    if (currentLayout !== layout) {
      updateCurrentLayout(layout);
    }
  }, [layout, currentLayout]);

  const [currentStatus, setCurrentStatus] =
    useState<EventFilterTaskStatuses>(status);

  useEffect(() => {
    if (currentStatus !== status) {
      updateCurrentStatus(status);
    }
  }, [status, currentStatus]);

  const [openEventId, setOpenEventId] = useState<ObjectId | null>(null);

  const [weekItem, setWeekItem] = useState<ILayoutItemsMap['week']>(
    currentLayout === PLANNER_LAYOUTS.WEEK
      ? observer.getWeekItem(today)
      : defaultWeekItem
  );
  const [monthItem, setMonthItem] = useState<ILayoutItemsMap['month']>(
    currentLayout === PLANNER_LAYOUTS.MONTH
      ? observer.getMonthItem(today)
      : defaultMonthItem
  );
  const [yearItem, setYearItem] = useState<ILayoutItemsMap['year']>(
    currentLayout === PLANNER_LAYOUTS.YEAR
      ? observer.getYearItem(today)
      : defaultYearItem
  );
  const [optionsPanelItem, setOptionsPanelItem] = useState<
    ILayoutItemsMap['optionsPanel']
  >(observer.getMonthItem(today));

  const plannerNavigate: IPlannerProviderMethods['plannerNavigate'] =
    useCallback(
      (essence) => {
        const defaultPath = `/${ServicesNames.PLANNER}/`;

        console.log('planner navigate: ', essence);

        const result: { [key in typeof essence]: any } = {
          current: {
            go() {
              console.log('current navigate');
              navigate(defaultPath + [currentLayout, currentStatus].join('/'));
            },
          },
          layout: {
            go(layout: PLANNER_LAYOUTS) {
              console.log('layout navigate');
              navigate(defaultPath + [layout, currentStatus].join('/'));
            },
          },
          status: {
            go(status: EventFilterTaskStatuses) {
              console.log('status navigate');
              navigate(defaultPath + [currentLayout, status].join('/'));
            },
          },
          createEventModal: {
            go() {
              console.log('create navigate');
              navigate(
                defaultPath +
                  [currentLayout, currentStatus, 'event', 'create'].join('/')
              );
            },
          },
          eventInfo: {
            go(_id: ObjectId, tabName: EVENT_INFORMER_TAB_NAMES) {
              console.log('info navigate');
              navigate(
                defaultPath +
                  [
                    currentLayout,
                    currentStatus,
                    'event',
                    'info',
                    _id,
                    tabName,
                  ].join('/')
              );
            },
          },
        };

        return result[essence];
      },
      [currentLayout, currentStatus, navigate]
    );

  const updateCurrentStatus = useCallback(
    (status: EventFilterTaskStatuses) => {
      setCurrentStatus(status);
    },
    [setCurrentStatus]
  );

  const updateCurrentLayout = useCallback(
    (layout: PLANNER_LAYOUTS, date?: Date) => {
      switch (layout) {
        case PLANNER_LAYOUTS.WEEK: {
          setWeekItem((prev) =>
            prev.weekOfYear >= 0 && !date
              ? prev
              : observer.getWeekItem(date || new Date())
          );
          break;
        }
        case PLANNER_LAYOUTS.MONTH: {
          setMonthItem((prev) =>
            prev.monthOfYear >= 0 && !date
              ? prev
              : observer.getMonthItem(date || new Date())
          );
          break;
        }
        case PLANNER_LAYOUTS.YEAR: {
          setYearItem((prev) =>
            prev.year >= 0 && !date
              ? prev
              : observer.getYearItem(date || new Date())
          );
          break;
        }
      }

      if (date) {
        setCurrentDate((prev) => {
          return {
            ...prev,
            [layout]: date,
          };
        });
      }

      setCurrentLayout(layout);
    },
    [
      setCurrentDate,
      setWeekItem,
      setMonthItem,
      setYearItem,
      setCurrentLayout,
      setCurrentStatus,
      observer,
    ]
  );

  const updateCurrentLayoutAndNavigate = useCallback(
    (layout: PLANNER_LAYOUTS, date?: Date) => {
      console.log('navigate to: ', layout);
      updateCurrentLayout(layout, date);
      plannerNavigate('layout').go(layout);
    },
    [plannerNavigate, updateCurrentLayout]
  );

  const updateCurrentDateOfDateLayout = useCallback(
    (pattern: ShortChangeCurrentPattern) => {
      setCurrentDate((prev) => {
        const prevDate = prev.day;
        let resultDate = new Date();

        switch (pattern) {
          case '++': {
            resultDate = dayjs(prevDate).add(7, 'day').toDate();
            break;
          }
          case '+': {
            resultDate = dayjs(prevDate).add(1, 'day').toDate();
            break;
          }
          case 'today': {
            resultDate = new Date();
            break;
          }
          case '-': {
            resultDate = dayjs(prevDate).subtract(1, 'day').toDate();
            break;
          }
          case '--': {
            resultDate = dayjs(prevDate).subtract(7, 'day').toDate();
          }
        }

        return {
          ...prev,
          day: resultDate,
        };
      });
    },
    [setCurrentDate]
  );

  const updateCurrentDateOfMonthLayout = useCallback(
    (pattern: ShortChangeCurrentPattern) => {
      let resultDate = new Date();

      setCurrentDate((prev) => {
        const prevDate = prev.month;

        switch (pattern) {
          case '++': {
            resultDate = dayjs(prevDate).add(3, 'month').toDate();
            break;
          }
          case '+': {
            resultDate = dayjs(prevDate).add(1, 'month').toDate();
            break;
          }
          case 'today': {
            resultDate = new Date();
            break;
          }
          case '-': {
            resultDate = dayjs(prevDate).subtract(1, 'month').toDate();
            break;
          }
          case '--': {
            resultDate = dayjs(prevDate).subtract(3, 'month').toDate();
          }
        }

        return {
          ...prev,
          month: resultDate,
        };
      });

      setMonthItem(observer.getMonthItem(resultDate));
    },
    [setCurrentDate]
  );

  const updateCurrentDateOFWeekLayout = useCallback(
    (pattern: ShortChangeCurrentPattern) => {
      let resultDate = new Date();
      setCurrentDate((prev) => {
        const prevDate = prev.week;

        switch (pattern) {
          case '++':
            resultDate = dayjs(prevDate).add(4, 'week').toDate();
            break;
          case '+':
            resultDate = dayjs(prevDate).add(1, 'week').toDate();
            break;
          case 'today':
            break;
          case '-':
            resultDate = dayjs(prevDate).subtract(1, 'week').toDate();
            break;
          case '--':
            resultDate = dayjs(prevDate).subtract(4, 'week').toDate();
        }

        return {
          ...prev,
          week: resultDate,
        };
      });

      setWeekItem(observer.getWeekItem(resultDate));
    },
    [setCurrentDate]
  );

  const updateCurrentDateOfYearLayout = useCallback(
    (pattern: ShortChangeCurrentPattern) => {
      let resultDate = new Date();

      setCurrentDate((prev) => {
        const prevDate = prev.year;

        switch (pattern) {
          case '++':
            resultDate = dayjs(prevDate).add(2, 'year').toDate();
            break;
          case '+':
            resultDate = dayjs(prevDate).add(1, 'year').toDate();
            break;
          case 'today':
            break;
          case '-':
            resultDate = dayjs(prevDate).subtract(1, 'year').toDate();
            break;
          case '--':
            resultDate = dayjs(prevDate).subtract(2, 'year').toDate();
            break;
        }

        return {
          ...prev,
          year: resultDate,
        };
      });

      setYearItem(observer.getYearItem(resultDate));
    },
    [setCurrentDate]
  );

  const updateCurrentDate = useCallback(
    (pattern: ShortChangeCurrentPattern) => {
      switch (currentLayout) {
        case PLANNER_LAYOUTS.DAY:
          return updateCurrentDateOfDateLayout(pattern);
        case PLANNER_LAYOUTS.WEEK:
          return updateCurrentDateOFWeekLayout(pattern);
        case PLANNER_LAYOUTS.MONTH:
          return updateCurrentDateOfMonthLayout(pattern);
        case PLANNER_LAYOUTS.YEAR:
          return updateCurrentDateOfYearLayout(pattern);
      }
    },
    [
      currentLayout,
      updateCurrentDateOfDateLayout,
      updateCurrentDateOfMonthLayout,
      updateCurrentDateOfYearLayout,
      updateCurrentDateOfYearLayout,
    ]
  );

  const openEventInfo = useCallback(
    (_id: ObjectId) => {
      setOpenEventId(_id);
      plannerNavigate('eventInfo').go(_id, EVENT_INFORMER_TAB_NAMES.ABOUT);
    },
    [setOpenEventId, plannerNavigate]
  );

  const closeEventInfo = useCallback(() => {
    setOpenEventId(null);
    plannerNavigate('current').go();
  }, [setOpenEventId, plannerNavigate]);

  return (
    <PlannerContext.Provider
      value={{
        currentDate,
        currentStatus,
        currentLayout,
        openEventId,
        layoutItems: {
          week: weekItem,
          year: yearItem,
          month: monthItem,
          optionsPanel: optionsPanelItem,
        },
        methods: {
          updateCurrentLayout,
          updateCurrentLayoutAndNavigate,
          updateCurrentStatus,
          updateCurrentDate,
          plannerNavigate,
          openEventInfo,
          closeEventInfo,
        },
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};
