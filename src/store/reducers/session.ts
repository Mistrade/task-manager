import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  AuthorizationUser,
  CheckUserSession,
  RegistrationNextAction,
  RegistrationUser,
} from '../thunk/session';

interface SessionReducerState {
  isLoading: boolean;
  registrationNextAction?: RegistrationNextAction;
  isAuth: boolean;
}

const initialState: SessionReducerState = {
  isLoading: false,
  isAuth: false,
};

const Session = createSlice({
  name: 'session',
  initialState,
  reducers: {
    clearRegistrationNextAction(
      state,
      data: PayloadAction<SessionReducerState['registrationNextAction']>
    ) {
      state.registrationNextAction = data.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(isAnyOf(RegistrationUser.pending), (state, action) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addMatcher(isAnyOf(RegistrationUser.fulfilled), (state, action) => {
        state.isLoading = false;
        state.registrationNextAction = action.payload;
      })
      .addMatcher(isAnyOf(RegistrationUser.rejected), (state, action) => {
        state.isLoading = false;
        state.registrationNextAction = 'try_again';
      })
      .addMatcher(isAnyOf(AuthorizationUser.fulfilled), (state, data) => {
        state.isAuth = data.payload;
      })
      .addMatcher(isAnyOf(CheckUserSession.fulfilled), (state, action) => {
        state.isAuth = action.payload;
      }),
});

export const SessionReducer = Session.reducer;
export const { clearRegistrationNextAction } = Session.actions;