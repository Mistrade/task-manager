import {
  PlannerDateMode,
  PlannerListMode,
  PlannerMonthMode,
  PlannerWeekMode,
  PlannerYearMode,
} from '../pages/Planner/planner.types';

export type ShortChangeCurrentPattern = '--' | '-' | 'today' | '+' | '++';
export type ChangeMonthCurrentFn = (
  current: PlannerMonthMode,
  pattern?: ShortChangeCurrentPattern
) => Date;
export type ChangeWeekCurrentFn = (
  current: PlannerWeekMode,
  pattern?: ShortChangeCurrentPattern
) => Date;
export type ChangeYearCurrentFn = (
  current: PlannerYearMode,
  pattern?: ShortChangeCurrentPattern
) => Date;
export type ChangeDayCurrentFn = (
  current: PlannerDateMode,
  pattern?: ShortChangeCurrentPattern
) => Date;
export type ChangeListCurrentFn = (
  current: PlannerListMode,
  pattern?: ShortChangeCurrentPattern
) => PlannerListMode;
