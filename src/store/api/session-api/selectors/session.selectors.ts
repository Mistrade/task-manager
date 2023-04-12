import { MyServerResponse } from '@api/rtk-api.types';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/store';
import { sessionApi } from '../index';
import { UserModel } from '../session-api.types';

export const userInfoSelector = createSelector(
  (state: RootState) => sessionApi.useConfirmSessionQuery().currentData,
  (state: MyServerResponse<UserModel> | undefined) => state?.data || null
);
