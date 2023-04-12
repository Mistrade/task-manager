import { EventFilterTaskStatuses } from '@pages/planner/RenderModes/FindEventFilter/find-event-filters.types';
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
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlannerObserver } from '@src/common/calendarSupport/observer';
import { ShortChangeCurrentPattern } from '@src/common/commonTypes';
import {
  CHANGE_DATE_OF_PATTERN_SIGNATURE,
  DEFAULT_PLANNER_LAYOUT,
  DEFAULT_PLANNER_STATUS,
  PLANNER_LAYOUTS,
} from '@src/common/constants';
import dayjs from 'dayjs';

const today = dayjs();

const todayPlannerDate: IPlannerDate = {
  month: today.month(),
  day: today.date(),
  year: today.year(),
  week: today.week(),
};

const { status, layout, eventInfoId } = getPlannerMetaData(
  window.location.pathname
);

const observer = new PlannerObserver();
const todayDate = today.toDate();
const todayMonthItem = observer.getMonthItem(todayDate);
const todayWeekItem = observer.getWeekItem(todayDate);
const todayYearItem = observer.getYearItem(todayDate);

const initialState: IPlannerReducer = {
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
  eventInfo: eventInfoId ? { _id: eventInfoId } : null,
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
          endDate: dateToPlannerDate(today.add(3, 'day').endOf('day').toDate()),
        },
      },
      favorites: {
        scope: {
          startDate: dateToPlannerDate(today.startOf('day').toDate()),
          endDate: dateToPlannerDate(today.endOf('day').toDate()),
        },
      },
    },
    optionsPanel: todayMonthItem,
  },
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
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
} = plannerSlice.actions;

export default plannerReducer;
