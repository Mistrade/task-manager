import {EventHistoryQueryResult} from "../../../../../../store/api/planning-api/types/event-history.types";

export interface BaseEventHistoryFieldProps<ValueType = EventHistoryQueryResult> {
	value: ValueType
}