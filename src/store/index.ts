import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { eventReducer } from './reducers/events'

const rootReducer = combineReducers( {
  events: eventReducer
} )

export const store = configureStore( {
  reducer: rootReducer
} )

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
