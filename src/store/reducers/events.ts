import { EventsStorage } from '@planner/planner.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LS_KEYS } from '@src/common/constants';
import { getFromLocalStorage } from '@src/common/localStorage';

export interface EventsStateProps {
  all: EventsStorage;
}

const initialState: EventsStateProps = {
  all: getFromLocalStorage<EventsStorage>(LS_KEYS['EVENTS']) || {},
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setTaskId(
      state,
      data: PayloadAction<{ name: string; password: string }>
    ) {},
  },
});

export const eventReducer = eventSlice.reducer;
export const {} = eventSlice.actions;
