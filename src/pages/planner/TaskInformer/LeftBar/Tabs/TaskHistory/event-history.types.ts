import { EventHistoryQueryResult } from '@api/planning-api/types/event-history.types';

export interface BaseEventHistoryFieldProps<
  ValueType = EventHistoryQueryResult
> {
  value: ValueType;
}
