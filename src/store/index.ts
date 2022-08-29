import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {eventReducer} from './reducers/events'
import {SessionReducer} from "./reducers/session";

const rootReducer = combineReducers( {
  events: eventReducer,
  session: SessionReducer
} )

export const store = configureStore( {
  reducer: rootReducer
} )

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
