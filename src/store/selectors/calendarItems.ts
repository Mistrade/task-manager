import { createSelector } from '@reduxjs/toolkit';
import { CreateSelectorReturnType, RootState } from '../index';
import {
  CalendarModeForState,
  CreateEventInitialState,
} from '../reducers/planner-reducer';
import {
  CreateEventDataObject,
  PlannerMode,
} from '../../pages/Planner/planner.types';
import { currentFromStoreToDefault } from './utils';
import dayjs from 'dayjs';

const rootCalendarSelector: CreateSelectorReturnType<RootState['planner']> =
  createSelector(
    (state: RootState) => state,
    (state) => state.planner
  );

const rootCalendarCurrentSelector: CreateSelectorReturnType<
  RootState['planner']['planner']
> = createSelector(rootCalendarSelector, (state) => state.planner);

export const CalendarCurrentSelector: CreateSelectorReturnType<PlannerMode> =
  createSelector(
    rootCalendarCurrentSelector,
    (state: CalendarModeForState): PlannerMode =>
      currentFromStoreToDefault(state)
  );

const CalendarStatusesSelector: CreateSelectorReturnType<
  RootState['planner']['statuses']
> = createSelector(rootCalendarSelector, (state) => state.statuses);

const CalendarStatusesAndCurrentSelector: CreateSelectorReturnType<{
  planner: PlannerMode;
  statuses: RootState['planner']['statuses'];
}> = createSelector(rootCalendarSelector, (state) => {
  return {
    planner: currentFromStoreToDefault(state.planner),
    statuses: state.statuses,
  };
});

export const createEventInitialStateSelector: CreateSelectorReturnType<CreateEventDataObject> =
  createSelector(rootCalendarSelector, (state) => {
    const initialState: CreateEventInitialState | null =
      state.createEventInitialState;

    return {
      description: initialState?.description || '',
      title: initialState?.title || '',
      priority: initialState?.priority || 'medium',
      time: initialState?.time
        ? dayjs(initialState.time).toDate()
        : dayjs().toDate(),
      timeEnd: initialState?.timeEnd
        ? dayjs(initialState.timeEnd).toDate()
        : dayjs().add(1, 'hour').toDate(),
      status: initialState?.status || 'created',
      members: initialState?.members || [],
      link: initialState?.link || null,
      group: initialState?.group || '',
    };
  });

export const CalendarSelectors = {
  current: CalendarCurrentSelector,
  statuses: CalendarStatusesSelector,
  dataForURL: CalendarStatusesAndCurrentSelector,
};
