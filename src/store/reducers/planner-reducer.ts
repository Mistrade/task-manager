import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
	PlannerDateMode,
	PlannerFavoritesMode,
	PlannerListMode,
	PlannerMonthMode,
	PlannerWeekMode,
	PlannerYearMode,
	PlannerMode,
	DateItem,
	MonthItem,
	WeekItem,
	YearItem
} from "../../pages/Planner/planner.types";
import {EventInfoModel} from "../api/planning-api/types/event-info.types";
import {ObjectId, UtcDate} from "../api/rtk-api.types";
import {EventFilterTaskStatuses} from "../../pages/Planner/RenderModes/FindEventFilter/find-event-filters.types";
import {GroupModelResponse} from "../api/planning-api/types/groups.types";

type PlannerDateReducerState = Omit<PlannerDateMode, 'date'> & { date: string }
type PlannerWeekReducerState = Omit<PlannerWeekMode, 'aroundDate'> & { aroundDate: string }
type PlannerListLayoutReducerState =
	Omit<PlannerListMode, 'toDate' | 'fromDate'>
	& { fromDate: string, toDate: string }

export type CalendarModeForState =
	PlannerYearMode
	| PlannerMonthMode
	| PlannerWeekReducerState
	| PlannerDateReducerState
	| PlannerListLayoutReducerState
	| PlannerFavoritesMode

export interface PlannerReducerState {
	planner: CalendarModeForState,
	statuses: EventFilterTaskStatuses,
	dateOfCreateEvent: null | string,
	groupRemoved: null | GroupModelResponse,
	clonedEventInfo: Partial<EventInfoModel> | null,
	selectedEvent: ObjectId | null
}

const initialState: PlannerReducerState = {
	planner: {layout: 'day', date: new Date().toString()},
	statuses: 'all',
	dateOfCreateEvent: null,
	groupRemoved: null,
	clonedEventInfo: null,
	selectedEvent: null,
}

const CalendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		changePlanner(state, data: PayloadAction<{ layout: PlannerMode['layout'], date: string | PlannerListLayoutReducerState }>) {
			const {layout, date: payloadDate} = data.payload
			
			if (typeof payloadDate !== 'string' && 'fromDate' in payloadDate) {
				state.planner = payloadDate
			} else {
				
				const date = new Date(payloadDate)
				
				switch (layout) {
					case 'month':
						state.planner = {
							layout,
							month: date.getMonth(),
							year: date.getFullYear()
						}
						break;
					case 'week':
						state.planner = {
							layout,
							aroundDate: date.toString()
						}
						break;
					case 'day':
						state.planner = {
							layout,
							date: date.toString()
						}
						break;
					case 'year':
						state.planner = {
							layout: 'year',
							year: date.getFullYear()
						}
						break;
					case "favorites":
						state.planner = {
							layout: 'favorites',
						}
				}
			}
		},
		changeDateOfCreateEvent(state, data: PayloadAction<UtcDate | null>) {
			state.dateOfCreateEvent = data.payload
		},
		changeGroupRemoved(state, data: PayloadAction<PlannerReducerState['groupRemoved']>) {
			state.groupRemoved = data.payload
		},
		setClonedParentEvent(state, data: PayloadAction<Partial<EventInfoModel> | null>) {
			state.clonedEventInfo = data.payload
		},
		changeEventStatuses(state, data: PayloadAction<EventFilterTaskStatuses>) {
			state.statuses = data.payload
		}
	},
})

export const CalendarReducer = CalendarSlice.reducer
export const {
	changePlanner,
	changeDateOfCreateEvent,
	changeGroupRemoved,
	setClonedParentEvent,
	changeEventStatuses
} = CalendarSlice.actions