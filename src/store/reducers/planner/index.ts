import {
  dateToPlannerDate,
  getInitialPlannerDate,
  getPlannerMetaData,
  isEqualPlannerDate,
  plannerDateToDate,
  setLayoutConfig,
} from '@planner-reducer/utils';
import {
  IPlannerDate,
  IPlannerReducer,
  SetCreateEventInitialStatePayload,
  TSetPlannerDatePayload,
} from '@redux/reducers/planner/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { PlannerObserver } from '@src/common/calendarSupport/observer';
import { ShortChangeCurrentPattern } from '@src/common/commonTypes';
import {
  DEFAULT_PLANNER_LAYOUT,
  DEFAULT_PLANNER_STATUS,
} from '@src/common/constants/defaultConstants';
import {
  EVENT_INFORMER_TAB_NAMES,
  PLANNER_LAYOUTS,
} from '@src/common/constants/enums';
import { CHANGE_DATE_OF_PATTERN_SIGNATURE } from '@src/common/constants/signatures';

import { EventFilterTaskStatuses } from '@pages/planner/Filters/find-event-filters.types';

import { CalendarPriorityKeys } from '@planner/types';

import { ObjectId } from '@api/rtk-api.types';

import { getSearchParams } from '../../../common/functions';

const plannerSlice = createSlice({
  name: 'planner',
  initialState: (): IPlannerReducer => {
    const observer = new PlannerObserver();

    const search = getSearchParams();

    console.log(search);

    const today = dayjs();

    const initialDate: IPlannerDate = getInitialPlannerDate();

    const { status, layout, eventInfoId } = getPlannerMetaData(
      window.location.pathname
    );

    const todayDate = dayjs().toDate();
    const todayMonthItem = observer.getMonthItem(todayDate);
    const initialMonthItem = observer.getMonthItem(
      plannerDateToDate(initialDate)
    );
    const initialWeekItem = observer.getWeekItem(
      plannerDateToDate(initialDate)
    );
    const initialYearItem = observer.getYearItem(
      plannerDateToDate(initialDate)
    );
    const currentLayout = layout || DEFAULT_PLANNER_LAYOUT;
    const currentStatus = status || DEFAULT_PLANNER_STATUS;
    return {
      date: {
        day: initialDate,
        week: initialDate,
        month: initialDate,
        year: initialDate,
        list: initialDate,
        favorites: initialDate,
      },
      selectedEventGroup: null,
      createEventInitialState: null,
      createEventPrevUrl: null,
      layout: currentLayout,
      eventFilter: {
        lastResetTS: Date.now(),
        taskStatus: currentStatus,
        title: '',
        priority: null,
      },
      eventInfo: {
        _id: eventInfoId || null,
        tabName: EVENT_INFORMER_TAB_NAMES.ABOUT,
      },
      config: {
        layouts: {
          month: initialMonthItem,
          week: initialWeekItem,
          year: initialYearItem,
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
    setCreateEventInitialState(
      state,
      { payload }: SetCreateEventInitialStatePayload
    ) {
      console.log('set initial state: ', payload);

      state.createEventInitialState = payload.data;
      state.createEventPrevUrl = payload.prevUrl;

      console.log('set initialState is successfully');
    },
    clearCreateInitialState(state) {
      state.createEventInitialState = null;
      state.createEventPrevUrl = null;
    },
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
      const prev = state.eventFilter.taskStatus;

      const isEqual = prev === payload;

      if (!isEqual) {
        state.eventFilter.taskStatus = payload;
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
    changeEventFilterTitle(state, { payload }: PayloadAction<string>) {
      state.eventFilter.title = payload;
    },
    changeEventFilterPriority(
      state,
      { payload }: PayloadAction<CalendarPriorityKeys | null>
    ) {
      state.eventFilter.priority = payload;
    },
    resetEventFiltersState(state) {
      state.eventFilter = {
        lastResetTS: Date.now(),
        taskStatus: DEFAULT_PLANNER_STATUS,
        title: '',
        priority: null,
      };
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
  changeEventFilterTitle,
  changeEventFilterPriority,
  resetEventFiltersState,
  setCreateEventInitialState,
  clearCreateInitialState,
} = plannerSlice.actions;

export default plannerReducer;
