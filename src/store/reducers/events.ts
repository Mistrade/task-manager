import {createSlice, isAnyOf, PayloadAction} from '@reduxjs/toolkit'
import {TaskStorage} from '../../components/Calendars/types'
import {getFromLocalStorage} from '../../common/localStorage'
import {LS_KEYS} from '../../common/constants'
import {addEvent} from '../thunk/events'

export interface EventsStateProps {
  all: TaskStorage
}

const initialState: EventsStateProps = {
  all: getFromLocalStorage<TaskStorage>( LS_KEYS[ 'EVENTS' ] ) || {}
}

const eventSlice = createSlice( {
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder.addMatcher(
      isAnyOf( addEvent.fulfilled ),
      ( state, action: PayloadAction<TaskStorage> ) => {
        state.all = action.payload
      }
    )
  }
} )

export const eventReducer = eventSlice.reducer
export const {} = eventSlice.actions
