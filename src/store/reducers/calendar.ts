import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
	CalendarCurrentDay,
	CalendarCurrentMonth,
	CalendarCurrentWeek, CalendarCurrentYear,
	CalendarMode
} from "../../components/Calendars/types";

interface CalendarState {
	current: {
		day: CalendarCurrentDay | null,
		week: CalendarCurrentWeek | null,
		month: CalendarCurrentMonth | null,
		year: CalendarCurrentYear | null,
	}
}

const initialState: CalendarState = {
	current: {
		day: null,
		week: null,
		month: null,
		year: null,
	}
}

const CalendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		changeCalendarCurrent(state, data: PayloadAction<CalendarMode>){
			switch(data.payload.layout){
				case 'year':
					 state.current.year = data.payload;
					 break;
				case "month":
					state.current.month = data.payload
					break;
				case "week":
					state.current.week = data.payload
					break;
				case "day":
					state.current.day = data.payload
			}
		}
	},
})

export const CalendarReducer = CalendarSlice.reducer
export const {
	changeCalendarCurrent
} = CalendarSlice.actions