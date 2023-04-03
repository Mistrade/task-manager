import { EventFiltersProps } from '../../../../hooks/useEventFilters';
import React from 'react';
import { SwitcherBadges } from '../../../../components/Switcher/Switcher';

export interface IFindEventFilterProps extends FormHandle {
  statusBadges?: SwitcherBadges<EventFilterTaskStatuses> | null;
  isLoading?: boolean;
}

export interface FormHandle {
  values: EventFiltersProps;
  onChangeHandlers: EventFilterOnChangeHandle;
  onFocusHandlers?: OnFocusEventHandlers;
}

export interface EventFilterOnChangeHandle {
  priority: (value: EventFiltersProps['priority']) => void;
  title: (value: EventFiltersProps['title']) => void;
  taskStatus: (value: EventFiltersProps['status']) => void;
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
