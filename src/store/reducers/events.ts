import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {EventsStorage} from '../../pages/Planner/planner.types'
import {getFromLocalStorage} from '../../common/localStorage'
import {LS_KEYS} from '../../common/constants'

export interface EventsStateProps {
	all: EventsStorage
}

const initialState: EventsStateProps = {
	all: getFromLocalStorage<EventsStorage>(LS_KEYS['EVENTS']) || {}
}

const eventSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		setTaskId(state, data: PayloadAction<{ name: string, password: string }>) {
		
		}
	},
})

export const eventReducer = eventSlice.reducer
export const {} = eventSlice.actions
