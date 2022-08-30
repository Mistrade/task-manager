import {createSelector} from "@reduxjs/toolkit";
import {CreateSelectorReturnType, RootState} from "../index";
import {CalendarModeForState, CalendarStateData} from "../reducers/calendar";
import dayjs from "dayjs";
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

export const useCalendarCurrentSelector: CreateSelectorReturnType<CalendarMode> = createSelector(
	(state: RootState) => state.calendar.current,
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
			default:
				return state
		}
	}
)