import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

const globalSelector = createSelector(
  (state: RootState) => state.global,
  (state) => state
);

export const isDisableModalStateSelector = createSelector(
  globalSelector,
  (state) => state.disableModalClose
);