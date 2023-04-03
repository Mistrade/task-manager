import { createSelector } from '@reduxjs/toolkit';
import { RootPlannerSelector } from './calendarItems';
import { PlannerReducerState } from '../reducers/planner-reducer';

export const CreateEventSelector = createSelector(
  RootPlannerSelector,
  (state: PlannerReducerState) => ({
    initialState: state.createEventInitialState,
    prevUrl: state.createEventPrevUrl,
  })
);
