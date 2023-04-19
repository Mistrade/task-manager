import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SERVICES_NAMES } from '@src/common/constants/enums';


interface IGlobalReducer {
  serviceName: SERVICES_NAMES | null;
}

const initialState: IGlobalReducer = {
  serviceName: null,
};

const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setServiceName(state, data: PayloadAction<SERVICES_NAMES | null>) {
      state.serviceName = data.payload;
    },
  },
});

export const GlobalReducer = GlobalSlice.reducer;
export const { setServiceName } = GlobalSlice.actions;