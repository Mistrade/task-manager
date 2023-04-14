import { sessionApi } from '@api/session-api';
import { UserModel } from '@api/session-api/session-api.types';
import { createSelector } from '@reduxjs/toolkit';
import { CreateSelectorReturnType, RootState } from '@src/store';

export const baseSelectUserInfo = sessionApi.endpoints.confirmSession.select;

export const selectUserInfo: CreateSelectorReturnType<UserModel | null> =
  createSelector(
    (state: RootState) => state,
    (state: RootState) =>
      baseSelectUserInfo()(state).data?.data || (null as UserModel | null)
  );
