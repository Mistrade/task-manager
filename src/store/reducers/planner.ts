import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { DateScopeHelper } from '../../common/calendarSupport/scopes';
import { GetEventsFiltersRequestProps } from '../api/planning-api/types/event-info.types';

type LayoutTypes = 'day' | 'week' | 'month' | 'year' | 'list' | 'favorites';
export type Nullable<T> = null | T;

export interface IPlannerScope {
  from: string;
  to: string;
}

export interface IPlannerDayScope {
  date: string;
}

interface PlannerSliceStateType {
  layout: LayoutTypes;
  scope: {
    day: Nullable<IPlannerDayScope>;
    week: Nullable<IPlannerScope>;
    month: Nullable<IPlannerScope>;
    year: Nullable<IPlannerScope>;
    list: Nullable<IPlannerScope>;
  };
  filters: Omit<GetEventsFiltersRequestProps, 'fromDate' | 'toDate'>;
}

const scopeApi = new DateScopeHelper({ useOtherDays: true });
const date = dayjs().toDate();
const monthScope = scopeApi.getDateScopeOfMonth(date);
const yearScope = scopeApi.getDateScopeOfYear(date);
const weekScope = scopeApi.getDateScopeOfWeek(date);

const initialState: PlannerSliceStateType = {
  layout: 'day',
  scope: {
    day: {
      date: dayjs().format(),
    },
    week: {
      from: weekScope.startDate.toString(),
      to: weekScope.endDate.toString(),
    },
    month: {
      from: monthScope.startDate.toString(),
      to: monthScope.endDate.toString(),
    },
    year: {
      from: yearScope.startDate.toString(),
      to: yearScope.endDate.toString(),
    },
    list: null,
  },
  filters: {
    utcOffset: dayjs().utcOffset(),
    findOnlyInSelectedGroups: true,
  },
};

const plannerSlice = createSlice({
  name: '/planner/slice',
  initialState,
  reducers: {
    setPlannerLayout(state, { payload }: PayloadAction<LayoutTypes>) {
      state.layout = payload;
    },
    setPlannerDayScope(
      state,
      { payload }: PayloadAction<Nullable<IPlannerDayScope>>
    ) {
      state.scope.day = payload;
    },
    setPlannerWeekScope(
      state,
      { payload }: PayloadAction<Nullable<IPlannerScope>>
    ) {
      state.scope.week = payload;
    },
    setPlannerMonthScope(
      state,
      { payload }: PayloadAction<Nullable<IPlannerScope>>
    ) {
      state.scope.month = payload;
    },
    setPlannerYearScope(
      state,
      { payload }: PayloadAction<Nullable<IPlannerScope>>
    ) {
      state.scope.year = payload;
    },
    setPlannerListScope(
      state,
      { payload }: PayloadAction<Nullable<IPlannerScope>>
    ) {
      state.scope.list = payload;
    },
    setPlannerFiltersState(
      state,
      {
        payload,
      }: PayloadAction<
        Omit<
          PlannerSliceStateType['filters'],
          'utcOffset' | 'findOnlyInSelectedGroups'
        >
      >
    ) {
      const prevState = { ...state.filters };

      state.filters = {
        ...prevState,
        ...payload,
      };
    },
  },
});

export const plannerReducer = plannerSlice.reducer;
export const {} = plannerSlice.actions;
