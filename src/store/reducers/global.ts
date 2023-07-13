import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SERVICES_NAMES } from '@src/common/constants/enums';

interface IGlobalReducer {
  serviceName: SERVICES_NAMES | null;
  disableModalClose: boolean;
}

const initialState: IGlobalReducer = {
  serviceName: null,
  disableModalClose: false,
};

const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setServiceName(state, data: PayloadAction<SERVICES_NAMES | null>) {
      state.serviceName = data.payload;
    },
    setDisableModalState(state, data: PayloadAction<boolean>) {
      state.disableModalClose = data.payload;
    },
  },
});

export const GlobalReducer = GlobalSlice.reducer;
export const { setServiceName, setDisableModalState } = GlobalSlice.actions;