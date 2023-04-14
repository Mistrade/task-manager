import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ServicesNames {
  'PLANNER' = 'planner',
  'FRIENDS' = 'friends',
}

interface IGlobalReducer {
  serviceName: ServicesNames | null;
}

const initialState: IGlobalReducer = {
  serviceName: null,
};

const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setServiceName(state, data: PayloadAction<ServicesNames | null>) {
      state.serviceName = data.payload;
    },
  },
});

export const GlobalReducer = GlobalSlice.reducer;
export const { setServiceName } = GlobalSlice.actions;
