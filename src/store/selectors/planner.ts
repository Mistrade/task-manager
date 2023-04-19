import {
  CreateEventInitialState,
  IPlannerReducer,
} from '@planner-reducer/types';
import { createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import {
  DEFAULT_CHECKLIST_TITLE,
  DEFAULT_EVENT_PRIORITY,
  DEFAULT_EVENT_STATUS,
} from '@src/common/constants/defaultConstants';
import { PLANNER_LAYOUTS, SERVICES_NAMES } from '@src/common/constants/enums';
import { CreateSelectorReturnType, RootState } from '@src/store';

import { CreateEventDataObject } from '@planner/planner.types';

const rootSelector: CreateSelectorReturnType<IPlannerReducer> = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.plannerState
);

export const plannerSelectLayout = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.layout
);

export const plannerSelectDate = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.date[state.layout]
);

export const plannerSelectStatus = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.eventFilter.taskStatus
);

export const plannerSelectPanelConfig = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.config.optionsPanel
);

export const plannerSelectWeekConfig = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.config.layouts[PLANNER_LAYOUTS.WEEK]
);

export const plannerSelectScope = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.config.layouts[state.layout].scope
);

export const plannerSelectMonthConfig = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.config.layouts[PLANNER_LAYOUTS.MONTH]
);

export const plannerSelectYearConfig = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.config.layouts[PLANNER_LAYOUTS.YEAR]
);

export const plannerSelectedEventInfo = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.eventInfo?._id || null
);

export const plannerSelectCurrentMode = createSelector(
  rootSelector,
  (state: IPlannerReducer) => `/${SERVICES_NAMES.PLANNER}/${state.layout}`
);

export const plannerSelectEventInfoTabName = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.eventInfo.tabName
);

export const selectCreateEventModalIsOpen = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.createEventModal.isOpen
);

export const plannerSelectFilters = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.eventFilter
);

export const plannerSelectFormFilters = createSelector(
  plannerSelectFilters,
  (state) => ({
    title: state.title,
    priority: state.priority,
  })
);

export const plannerSelectEventFilterTitle = createSelector(
  plannerSelectFilters,
  (state) => state.title
);

export const plannerSelectEventFilterPriority = createSelector(
  plannerSelectFilters,
  (state) => state.priority
);

export const plannerSelectLastReset = createSelector(
  plannerSelectFilters,
  (state) => state.lastResetTS
);

export const plannerSelectPrevUrlOfCreateEventForm = createSelector(
  rootSelector,
  (state) => state.createEventPrevUrl
);

export const createEventInitialStateSelector: CreateSelectorReturnType<CreateEventDataObject> =
  createSelector(rootSelector, (state): CreateEventDataObject => {
    const initialState: CreateEventInitialState | null =
      state.createEventInitialState;

    return {
      description: initialState?.description || '',
      title: initialState?.title || '',
      priority: initialState?.priority || DEFAULT_EVENT_PRIORITY,
      time: initialState?.time
        ? dayjs(initialState.time).toDate()
        : dayjs().toDate(),
      timeEnd: initialState?.timeEnd
        ? dayjs(initialState.timeEnd).toDate()
        : dayjs().add(1, 'hour').toDate(),
      status: initialState?.status || DEFAULT_EVENT_STATUS,
      members: initialState?.members || {},
      link: initialState?.link || null,
      group: initialState?.group || '',
      parentId: initialState?.parentId,
      linkedFrom: initialState?.linkedFrom,
      attachCheckList: initialState?.attachCheckList || false,
      checkList: {
        title: initialState?.checkList?.title || DEFAULT_CHECKLIST_TITLE,
        data: initialState?.checkList?.data || [],
      },
    };
  });
