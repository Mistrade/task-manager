import { ReactNode } from 'react';
import {
  PlannerDateMode,
  PlannerMonthMode,
  PlannerWeekMode,
  PlannerYearMode,
} from '@pages/planner/planner.types';

export type DocumentErrorTypes =
  | 'ERR_FORBIDDEN'
  | 'SYSTEM_ERROR'
  | 'BAD_REQUEST'
  | 'ERR_NOT_VALID_RESPONSE';
export type ErrorImagesType = { [key in DocumentErrorTypes]: ReactNode };

export interface InitialCurrentCalendarModeType {
  day: PlannerDateMode;
  week: PlannerWeekMode;
  month: PlannerMonthMode;
  year: PlannerYearMode;
}
