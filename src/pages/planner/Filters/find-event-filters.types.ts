import { EventFiltersProps } from '@hooks/useEventFilters';
import React from 'react';

export interface FormHandle {
  values: EventFiltersProps;
  onChangeHandlers: EventFilterOnChangeHandle;
  onFocusHandlers?: OnFocusEventHandlers;
}

export interface EventFilterOnChangeHandle {
  start: (value: EventFiltersProps['start']) => void;
  end: (value: EventFiltersProps['end']) => void;
  priority: (value: EventFiltersProps['priority']) => void;
  title: (value: EventFiltersProps['title']) => void;
  taskStatus: (value: EventFiltersProps['taskStatus']) => void;
}

export type OnFocusEventHandlers = (
  fieldName: keyof EventFiltersProps,
  e: React.FocusEvent<HTMLInputElement>
) => void;
export type EventFilterTaskStatuses =
  | 'in_work'
  | 'completed'
  | 'archive'
  | 'created'
  | 'all';

export interface StatusesTabsObject {
  title: string;
  type: EventFilterTaskStatuses;
}
