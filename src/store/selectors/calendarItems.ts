import {createSelector} from "@reduxjs/toolkit";
import {CreateSelectorReturnType, RootState} from "../index";
import {CalendarModeForState} from "../reducers/planner-reducer";
import {PlannerMode} from "../../pages/Planner/planner.types";
import {currentFromStoreToDefault} from "./utils";

const rootCalendarSelector: CreateSelectorReturnType<RootState['planner']> = createSelector(
	(state: RootState) => state,
	(state) => state.planner
)

const rootCalendarCurrentSelector: CreateSelectorReturnType<RootState['planner']['planner']> = createSelector(
	rootCalendarSelector,
	(state) => state.planner
)

export const CalendarCurrentSelector: CreateSelectorReturnType<PlannerMode> = createSelector(
	rootCalendarCurrentSelector,
	(state: CalendarModeForState): PlannerMode => currentFromStoreToDefault(state)
)

const CalendarStatusesSelector: CreateSelectorReturnType<RootState['planner']['statuses']> = createSelector(
	rootCalendarSelector,
	(state) => state.statuses
)

const CalendarStatusesAndCurrentSelector: CreateSelectorReturnType<{ planner: PlannerMode, statuses: RootState['planner']['statuses']  }> = createSelector(
	rootCalendarSelector,
	(state) => {
		return {
			planner: currentFromStoreToDefault(state.planner),
			statuses: state.statuses
		}
	}
)

export const CalendarSelectors = {
	current: CalendarCurrentSelector,
	statuses: CalendarStatusesSelector,
	dataForURL: CalendarStatusesAndCurrentSelector
}
