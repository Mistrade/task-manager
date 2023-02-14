import {createSelector} from "@reduxjs/toolkit";
import {CreateSelectorReturnType, RootState} from "../index";
import {CalendarModeForState} from "../reducers/calendar";
import {CalendarMode} from "../../components/Calendars/types";
import {currentFromStoreToDefault} from "./utils";

const rootCalendarSelector: CreateSelectorReturnType<RootState['calendar']> = createSelector(
	(state: RootState) => state,
	(state) => state.calendar
)

const rootCalendarCurrentSelector: CreateSelectorReturnType<RootState['calendar']['current']> = createSelector(
	rootCalendarSelector,
	(state) => state.current
)

export const CalendarCurrentSelector: CreateSelectorReturnType<CalendarMode> = createSelector(
	rootCalendarCurrentSelector,
	(state: CalendarModeForState): CalendarMode => currentFromStoreToDefault(state)
)

const CalendarStatusesSelector: CreateSelectorReturnType<RootState['calendar']['statuses']> = createSelector(
	rootCalendarSelector,
	(state) => state.statuses
)

const CalendarStatusesAndCurrentSelector: CreateSelectorReturnType<{ current: CalendarMode, statuses: RootState['calendar']['statuses']  }> = createSelector(
	rootCalendarSelector,
	(state) => {
		return {
			current: currentFromStoreToDefault(state.current),
			statuses: state.statuses
		}
	}
)

export const CalendarSelectors = {
	current: CalendarCurrentSelector,
	statuses: CalendarStatusesSelector,
	dataForURL: CalendarStatusesAndCurrentSelector
}
