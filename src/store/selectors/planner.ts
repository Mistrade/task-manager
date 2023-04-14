import { IPlannerReducer } from '@planner-reducer/types';
import { ServicesNames } from '@redux/reducers/global';
import { createSelector } from '@reduxjs/toolkit';
import { PLANNER_LAYOUTS } from '@src/common/constants';
import { CreateSelectorReturnType, RootState } from '@src/store';

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
  (state: IPlannerReducer) => state.status
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
  (state: IPlannerReducer) =>
    `/${ServicesNames.PLANNER}/${state.layout}/${state.status}`
);

export const plannerSelectEventInfoTabName = createSelector(
  rootSelector,
  (state: IPlannerReducer) => state.eventInfo.tabName
);
