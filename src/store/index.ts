import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {eventReducer} from './reducers/events'
import {SessionReducer} from "./reducers/session";
import {CalendarReducer} from "./reducers/calendar";
import {taskApi} from "./api/taskApi/taskApi";
import {sessionApi} from "./api/sessionApi";

const rootReducer = combineReducers({
	events: eventReducer,
	session: SessionReducer,
	calendar: CalendarReducer,
	[taskApi.reducerPath]: taskApi.reducer,
	[sessionApi.reducerPath]: sessionApi.reducer
})

export const createAppStore = (preloadedState?: RootState) => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware()
			.concat(taskApi.middleware, sessionApi.middleware),
		preloadedState
	})
}

export const store = createAppStore()

export type RootState = ReturnType<typeof rootReducer>
export type RootDispatch = typeof store.dispatch
export type CreateSelectorReturnType<R> = (state: RootState) => R
