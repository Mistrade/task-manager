import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TaskStorageType} from '../../components/Calendars/types'
import {getFromLocalStorage} from '../../common/localStorage'
import {LS_KEYS} from '../../common/constants'

export interface EventsStateProps {
	all: TaskStorageType
}

const initialState: EventsStateProps = {
	all: getFromLocalStorage<TaskStorageType>(LS_KEYS['EVENTS']) || {}
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
