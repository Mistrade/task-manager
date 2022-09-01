import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {eventReducer} from './reducers/events'
import {SessionReducer} from "./reducers/session";
import {CalendarReducer} from "./reducers/calendar";
import {taskApi} from "./api";

const rootReducer = combineReducers({
	events: eventReducer,
	session: SessionReducer,
	calendar: CalendarReducer,
	[taskApi.reducerPath]: taskApi.reducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export type CreateSelectorReturnType<R> = (state: RootState) => R
