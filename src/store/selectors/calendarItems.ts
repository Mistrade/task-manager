import { createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { CreateEventDataObject, PlannerMode } from '@planner/planner.types';

import { CreateSelectorReturnType, RootState } from '../index';
import {
  CalendarModeForState,
  CreateEventInitialState,
} from '../reducers/planner-reducer';
import { currentFromStoreToDefault } from './utils';

export const RootPlannerSelector: CreateSelectorReturnType<
  RootState['planner']
> = createSelector(
  (state: RootState) => state,
  (state) => state.planner
);

const rootCalendarCurrentSelector: CreateSelectorReturnType<
  RootState['planner']['planner']
> = createSelector(RootPlannerSelector, (state) => state.planner);

export const CalendarCurrentSelector: CreateSelectorReturnType<PlannerMode> =
  createSelector(
    rootCalendarCurrentSelector,
    (state: CalendarModeForState): PlannerMode =>
      currentFromStoreToDefault(state)
  );

const CalendarStatusesSelector: CreateSelectorReturnType<
  RootState['planner']['statuses']
> = createSelector(RootPlannerSelector, (state) => state.statuses);

const CalendarStatusesAndCurrentSelector: CreateSelectorReturnType<{
  planner: PlannerMode;
  statuses: RootState['planner']['statuses'];
}> = createSelector(RootPlannerSelector, (state) => {
  return {
    planner: currentFromStoreToDefault(state.planner),
    statuses: state.statuses,
  };
});

export const createEventInitialStateSelector: CreateSelectorReturnType<CreateEventDataObject> =
  createSelector(RootPlannerSelector, (state): CreateEventDataObject => {
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
      members: initialState?.members || {},
      link: initialState?.link || null,
      group: initialState?.group || '',
      parentId: initialState?.parentId,
      linkedFrom: initialState?.linkedFrom,
      attachCheckList: initialState?.attachCheckList || false,
      checkList: {
        title: initialState?.checkList?.title || 'Чек-лист',
        data: initialState?.checkList?.data || [],
      },
    };
  });

export const CalendarSelectors = {
  current: CalendarCurrentSelector,
  statuses: CalendarStatusesSelector,
  dataForURL: CalendarStatusesAndCurrentSelector,
};
