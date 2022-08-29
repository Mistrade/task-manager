import {createAsyncThunk} from '@reduxjs/toolkit'
import {CalendarTaskItem, EventItem, TaskSetResult, TaskStorage} from '../../components/Calendars/types'
import {RootState} from '../index'
import {setTask} from '../../common/functions'
import dayjs from 'dayjs'
import {LS_KEYS} from '../../common/constants'

export const addEvent = createAsyncThunk<TaskStorage, { event: CalendarTaskItem, onComplete?: () => void }, { state: RootState }>( 'addEvent', ( args, thunkApi ) => {
  const { event } = args
  const { rejectWithValue, dispatch, fulfillWithValue, getState } = thunkApi
  
  const { events: eventsState } = getState()
  const eventItem: EventItem = {
    ...event,
    createdAt: dayjs().utc().format(),
    time: dayjs( event.time ).utc().format(),
    timeEnd: dayjs( event.timeEnd ).utc().format()
  }
  const taskStorage: TaskSetResult = setTask( eventsState.all || {}, eventItem )

  console.log( taskStorage )
  if( taskStorage.status ) {
    if( localStorage.getItem( LS_KEYS[ 'EVENTS' ] ) ) {
      localStorage.removeItem( LS_KEYS[ 'EVENTS' ] )
    }
    localStorage.setItem( LS_KEYS[ 'EVENTS' ], JSON.stringify( taskStorage.storage ) )
    args.onComplete && args.onComplete()
    return taskStorage.storage
  }

  return eventsState.all

} )
