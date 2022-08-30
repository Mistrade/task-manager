import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
	CalendarCurrentDay,
	CalendarCurrentMonth,
	CalendarCurrentWeek, CalendarCurrentYear, CalendarDisabledOptions,
	CalendarMode, DateItem, MonthItem, WeekItem, YearItem
} from "../../components/Calendars/types";
import {
	defaultDateItem,
	defaultMonthItem,
	defaultWeekItem,
	defaultYearItem,
	initialCurrentMap
} from "../../common/constants";
import {Nullable} from "../../types";

export interface CalendarStateData {
	day: DateItem,
	week: WeekItem,
	month: MonthItem,
	year: YearItem,
}


type CalendarDateCurrentForState = Omit<CalendarCurrentDay, 'date'> & { date: string }
type CalendarWeekCurrentForState = Omit<CalendarCurrentWeek, 'aroundDate'> & { aroundDate: string }

export type CalendarModeForState =
	CalendarCurrentYear
	| CalendarCurrentMonth
	| CalendarWeekCurrentForState
	| CalendarDateCurrentForState

interface CalendarState {
	current: CalendarModeForState,
}

const initialState: CalendarState = {
	current: {layout: 'day', date: new Date().toString()},
}

interface ChangeCalendarCurrentPayload {
	value: CalendarMode,
	disabledOptions?: CalendarDisabledOptions
}

const CalendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		changeCalendarCurrent(state, data: PayloadAction<{ layout: CalendarMode['layout'], date: string }>) {
			const {layout, date: payloadDate} = data.payload
			
			
			const date = new Date(payloadDate)
			
			switch (layout) {
				case 'month':
					state.current = {
						layout,
						month: date.getMonth(),
						year: date.getFullYear()
					}
					break;
				case 'week':
					state.current = {
						layout,
						aroundDate: date.toString()
					}
					break;
				case 'day':
					state.current = {
						layout,
						date: date.toString()
					}
					break;
				case 'year':
					state.current = {
						layout: 'year',
						year: date.getFullYear()
					}
					break;
			}
		}
	},
})

export const CalendarReducer = CalendarSlice.reducer
export const {
	changeCalendarCurrent
} = CalendarSlice.actions