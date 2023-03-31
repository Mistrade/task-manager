import { createSelector } from '@reduxjs/toolkit';
import { sessionApi } from '../index';
import { MyServerResponse } from '../../rtk-api.types';
import { UserModel } from '../session-api.types';
import { RootState } from '../../../index';

export const userInfoSelector = createSelector(
  (state: RootState) => sessionApi.useConfirmSessionQuery().currentData,
  (state: MyServerResponse<UserModel> | undefined) => state?.data || null
);
