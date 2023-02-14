import {createSelector} from "@reduxjs/toolkit";
import {CreateSelectorReturnType, RootState} from "../index";
import {CalendarModeForState} from "../reducers/calendar";
import {CalendarMode} from "../../components/Calendars/types";

// export const useCalendarItemSelector = createSelector(
// 	(state: RootState) => state.calendar.data,
// 	(state: CalendarStateData ): CalendarStateData => {
// 		const {day, week, month, year} = state
// 		return {
// 			day: {
// 				current: {
// 					date: dayjs(day.current.date).toDate(),
// 					layout: 'day'
// 				},
// 				settingPanel: {
// 					monthItem: day.settingPanel.monthItem
// 				}
// 			}
// 		}
// 	}
// )

const rootCalendarSelector: CreateSelectorReturnType<RootState['calendar']['current']> = createSelector(
	(state: RootState) => state,
	(state) => state.calendar.current
)

export const CalendarCurrentSelector: CreateSelectorReturnType<CalendarMode> = createSelector(
	rootCalendarSelector,
	(state: CalendarModeForState): CalendarMode => {
		const {layout} = state
		
		switch (layout) {
			case "day":
				return {
					layout: "day",
					date: new Date(state.date)
				}
			case "week":
				return {
					layout: 'week',
					aroundDate: new Date(state.aroundDate)
				}
			case "list":
				return {
					layout: 'list',
					fromDate: new Date(state.fromDate),
					toDate: new Date(state.toDate)
				}
			default:
				return state
		}
	}
)