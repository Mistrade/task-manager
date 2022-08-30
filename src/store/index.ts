import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {eventReducer} from './reducers/events'
import {SessionReducer} from "./reducers/session";
import {CalendarReducer} from "./reducers/calendar";

const rootReducer = combineReducers( {
  events: eventReducer,
  session: SessionReducer,
  calendar: CalendarReducer
} )

export const store = configureStore( {
  reducer: rootReducer
} )

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export type CreateSelectorReturnType<R> = ( state: RootState ) => R
