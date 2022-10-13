import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
	CalendarCurrentDay,
	CalendarCurrentMonth,
	CalendarCurrentWeek,
	CalendarCurrentYear,
	CalendarMode,
	DateItem,
	MonthItem,
	WeekItem,
	YearItem
} from "../../components/Calendars/types";
import {FullResponseEventModel, UtcDate} from "../api/taskApi/types";
import {CalendarNameItem} from "../../components/Calendars/CalendarList/CalendarNameListItem";
import {FilterTaskStatuses} from "../../components/Calendars/DayCalendar/EventFilter";

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
	statuses: FilterTaskStatuses,
	addTaskDate: null | string,
	calendarRemoveCandidate: null | CalendarNameItem,
	clonedParentEvent: FullResponseEventModel | null,
}

const initialState: CalendarState = {
	current: {layout: 'day', date: new Date().toString()},
	statuses: 'in_work',
	addTaskDate: null,
	calendarRemoveCandidate: null,
	clonedParentEvent: null,
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
		},
		changeAddTaskDate(state, data: PayloadAction<UtcDate | null>) {
			state.addTaskDate = data.payload
		},
		changeCalendarRemoveCandidate(state, data: PayloadAction<CalendarState['calendarRemoveCandidate']>) {
			state.calendarRemoveCandidate = data.payload
		},
		setClonedParentEvent(state, data: PayloadAction<FullResponseEventModel | null>) {
			state.clonedParentEvent = data.payload
		},
		changeTaskStatuses(state, data: PayloadAction<FilterTaskStatuses>) {
			state.statuses = data.payload
		}
	},
})

export const CalendarReducer = CalendarSlice.reducer
export const {
	changeCalendarCurrent,
	changeAddTaskDate,
	changeCalendarRemoveCandidate,
	setClonedParentEvent,
	changeTaskStatuses
} = CalendarSlice.actions