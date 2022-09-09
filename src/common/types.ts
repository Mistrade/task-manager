import {ReactNode} from "react";
import {
	CalendarCurrentDay,
	CalendarCurrentMonth,
	CalendarCurrentWeek,
	CalendarCurrentYear
} from "../components/Calendars/types";

export type DocumentErrorTypes = 'ERR_FORBIDDEN' | 'SYSTEM_ERROR' | 'BAD_REQUEST' | 'ERR_NOT_VALID_RESPONSE'
export type ErrorImagesType = { [key in DocumentErrorTypes]: ReactNode }

export interface InitialCurrentCalendarModeType {
	day: CalendarCurrentDay,
	week: CalendarCurrentWeek,
	month: CalendarCurrentMonth,
	year: CalendarCurrentYear
}