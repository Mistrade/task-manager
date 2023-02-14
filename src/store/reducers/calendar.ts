import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
	CalendarCurrentDay,
	CalendarCurrentFavorites,
	CalendarCurrentList,
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
import {FilterTaskStatuses} from "../../components/Calendars/Modes/DayCalendar/EventFilter";

export interface CalendarStateData {
	day: DateItem,
	week: WeekItem,
	month: MonthItem,
	year: YearItem,
}


type CalendarDateCurrentForState = Omit<CalendarCurrentDay, 'date'> & { date: string }
type CalendarWeekCurrentForState = Omit<CalendarCurrentWeek, 'aroundDate'> & { aroundDate: string }
type CalendarListCurrentForState =
	Omit<CalendarCurrentList, 'toDate' | 'fromDate'>
	& { fromDate: string, toDate: string }

export type CalendarModeForState =
	CalendarCurrentYear
	| CalendarCurrentMonth
	| CalendarWeekCurrentForState
	| CalendarDateCurrentForState
	| CalendarListCurrentForState
	| CalendarCurrentFavorites

interface CalendarState {
	current: CalendarModeForState,
	statuses: FilterTaskStatuses,
	addTaskDate: null | string,
	calendarRemoveCandidate: null | CalendarNameItem,
	clonedParentEvent: Partial<FullResponseEventModel> | null,
}

const initialState: CalendarState = {
	current: {layout: 'day', date: new Date().toString()},
	statuses: 'all',
	addTaskDate: null,
	calendarRemoveCandidate: null,
	clonedParentEvent: null,
}

const CalendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		changeCalendarCurrent(state, data: PayloadAction<{ layout: CalendarMode['layout'], date: string | CalendarListCurrentForState }>) {
			const {layout, date: payloadDate} = data.payload
			
			if (typeof payloadDate !== 'string' && 'fromDate' in payloadDate) {
				state.current = payloadDate
			} else {
				
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
					case "favorites":
						state.current = {
							layout: 'favorites',
						}
				}
			}
		},
		changeAddTaskDate(state, data: PayloadAction<UtcDate | null>) {
			state.addTaskDate = data.payload
		},
		changeCalendarRemoveCandidate(state, data: PayloadAction<CalendarState['calendarRemoveCandidate']>) {
			state.calendarRemoveCandidate = data.payload
		},
		setClonedParentEvent(state, data: PayloadAction<Partial<FullResponseEventModel> | null>) {
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