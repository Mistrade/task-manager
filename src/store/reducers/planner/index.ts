import {
  dateToPlannerDate,
  getPlannerMetaData,
  isEqualPlannerDate,
  plannerDateToDate,
  setLayoutConfig,
} from '@planner-reducer/utils';
import {
  IPlannerDate,
  IPlannerReducer,
  TSetPlannerDatePayload,
} from '@redux/reducers/planner/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { PlannerObserver } from '@src/common/calendarSupport/observer';
import { ShortChangeCurrentPattern } from '@src/common/commonTypes';
import {
  CHANGE_DATE_OF_PATTERN_SIGNATURE,
  DEFAULT_PLANNER_LAYOUT,
  DEFAULT_PLANNER_STATUS,
  PLANNER_LAYOUTS,
} from '@src/common/constants';

import { EventFilterTaskStatuses } from '@pages/planner/RenderModes/FindEventFilter/find-event-filters.types';

import { EVENT_INFORMER_TAB_NAMES } from '@planner/TaskInformer/LeftBar/TaskInformerLeftBar';

import { ObjectId } from '@api/rtk-api.types';


const plannerSlice = createSlice({
  name: 'planner',
  initialState: (): IPlannerReducer => {
    const observer = new PlannerObserver();

    const today = dayjs();

    const todayPlannerDate: IPlannerDate = {
      month: dayjs().month(),
      day: dayjs().date(),
      year: dayjs().year(),
      week: dayjs().week(),
    };

    const { status, layout, eventInfoId } = getPlannerMetaData(
      window.location.pathname
    );
    const todayDate = dayjs().toDate();
    const todayMonthItem = observer.getMonthItem(todayDate);
    const todayWeekItem = observer.getWeekItem(todayDate);
    const todayYearItem = observer.getYearItem(todayDate);
    return {
      date: {
        day: todayPlannerDate,
        week: todayPlannerDate,
        month: todayPlannerDate,
        year: todayPlannerDate,
        list: todayPlannerDate,
        favorites: todayPlannerDate,
      },
      layout: layout || DEFAULT_PLANNER_LAYOUT,
      status: status || DEFAULT_PLANNER_STATUS,
      eventInfo: {
        _id: eventInfoId || null,
        tabName: EVENT_INFORMER_TAB_NAMES.ABOUT,
      },
      config: {
        layouts: {
          month: todayMonthItem,
          week: todayWeekItem,
          year: todayYearItem,
          day: {
            scope: {
              startDate: dateToPlannerDate(today.startOf('day').toDate()),
              endDate: dateToPlannerDate(today.endOf('day').toDate()),
            },
          },
          list: {
            scope: {
              startDate: dateToPlannerDate(today.startOf('day').toDate()),
              endDate: dateToPlannerDate(
                today.add(3, 'day').endOf('day').toDate()
              ),
            },
          },
          favorites: {
            scope: {
              startDate: dateToPlannerDate(new Date(2022, 0, 1)),
              endDate: dateToPlannerDate(dayjs().add(5, 'year')),
            },
          },
        },
        optionsPanel: todayMonthItem,
      },
      createEventModal: {
        isOpen: false,
      },
    };
  },
  reducers: {
    setEventInfoTabName(
      state,
      { payload }: PayloadAction<EVENT_INFORMER_TAB_NAMES>
    ) {
      state.eventInfo.tabName = payload;
    },
    setCreateEventModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.createEventModal.isOpen = payload;
    },
    setOpenEventId(state, { payload }: PayloadAction<ObjectId | null>) {
      if (!!payload) {
        state.eventInfo = {
          _id: payload,
          tabName: state.eventInfo.tabName,
        };
        return;
      }
      state.eventInfo = {
        _id: null,
        tabName: state.eventInfo.tabName,
      };
    },
    setPlannerDate(state, { payload }: PayloadAction<TSetPlannerDatePayload>) {
      const prev = state.date[payload.layout];

      const datesIsEqual = isEqualPlannerDate(prev, payload.date);
      console.log('date is equal: ', datesIsEqual, prev, payload.date);

      if (!datesIsEqual) {
        state.date[payload.layout] = { ...payload.date };
        setLayoutConfig(state, payload);
      }
    },
    setPlannerLayout(state, { payload }: PayloadAction<PLANNER_LAYOUTS>) {
      const prev = state.layout;

      const isEqualLayout = prev === payload;

      if (!isEqualLayout) {
        state.layout = payload;
      }
    },
    setPlannerDateAndLayout(
      state: IPlannerReducer,
      { payload }: PayloadAction<TSetPlannerDatePayload>
    ) {
      const prevLayout = state.layout;
      const prevDate = state.date[payload.layout];

      const datesIsEqual = isEqualPlannerDate(prevDate, payload.date);

      if (!datesIsEqual) {
        state.date[payload.layout] = { ...payload.date };
      }

      const isEqualLayout = prevLayout === payload.layout;

      if (!isEqualLayout) {
        state.layout = payload.layout;
      }

      setLayoutConfig(state, payload);
    },
    setPlannerStatus(
      state,
      { payload }: PayloadAction<EventFilterTaskStatuses>
    ) {
      const prev = state.status;

      const isEqual = prev === payload;

      if (!isEqual) {
        state.status = payload;
      }
    },
    changeDateOfPattern(
      state,
      {
        payload,
      }: PayloadAction<{
        pattern: ShortChangeCurrentPattern;
      }>
    ) {
      const { pattern } = payload;
      const { layout } = state;
      const prev = state.date[layout];

      if (pattern === 'today') {
        const result = dateToPlannerDate(new Date());
        const isEqual = isEqualPlannerDate(prev, result);

        if (!isEqual) {
          setLayoutConfig(state, {
            date: result,
            layout,
          });
          state.date[layout] = result;
        }

        return;
      }

      const { method, unit, value } =
        CHANGE_DATE_OF_PATTERN_SIGNATURE[layout][pattern];

      let result: IPlannerDate = dateToPlannerDate(
        dayjs(plannerDateToDate(prev))[method](value, unit)
      );

      const isEqual = isEqualPlannerDate(prev, result);

      if (!isEqual) {
        setLayoutConfig(state, {
          date: result,
          layout,
        });
        state.date[layout] = result;
      }
    },
  },
});

const plannerReducer = plannerSlice.reducer;
export const {
  setPlannerDate,
  setPlannerStatus,
  setPlannerLayout,
  changeDateOfPattern,
  setPlannerDateAndLayout,
  setOpenEventId,
  setEventInfoTabName,
  setCreateEventModalIsOpen,
} = plannerSlice.actions;

export default plannerReducer;