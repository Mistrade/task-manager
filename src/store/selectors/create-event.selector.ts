import { createSelector } from '@reduxjs/toolkit';

import { PlannerReducerState } from '../reducers/planner-reducer';
import { RootPlannerSelector } from './calendarItems';


export const CreateEventSelector = createSelector(
  RootPlannerSelector,
  (state: PlannerReducerState) => ({
    initialState: state.createEventInitialState,
    prevUrl: state.createEventPrevUrl,
  })
);