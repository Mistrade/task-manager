import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {
  IPlannerDate,
  IPlannerReducer,
  TSetPlannerDatePayload,
} from '@redux/reducers/planner/types';
import { getPlannerMetaData, isEqualPlannerDate } from '@planner-reducer/utils';
import {
  DEFAULT_PLANNER_LAYOUT,
  DEFAULT_PLANNER_STATUS,
  PLANNER_LAYOUTS,
} from '@src/common/constants';
import { EventFilterTaskStatuses } from '@pages/planner/RenderModes/FindEventFilter/find-event-filters.types';

const today = dayjs();

const todayPlannerDate: IPlannerDate = {
  month: today.month(),
  day: today.date(),
  year: today.year(),
};

const { status, layout, eventInfoId } = getPlannerMetaData(
  window.location.pathname
);

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
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setPlannerDate(state, { payload }: PayloadAction<TSetPlannerDatePayload>) {
      const prev = state.date[payload.layout];

      const datesIsEqual = isEqualPlannerDate(prev, payload.date);

      if (!datesIsEqual) {
        state.date[payload.layout] = payload.date;
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
      state,
      { payload }: PayloadAction<TSetPlannerDatePayload>
    ) {
      this.setPlannerDate(state, {
        type: 'setPlannerDate',
        payload: payload,
      });
      this.setPlannerLayout(state, {
        type: 'setPlannerLayout',
        payload: payload.layout,
      });
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
  },
});

const plannerReducer = plannerSlice.reducer;
export const {} = plannerSlice.actions;

export default plannerReducer;
