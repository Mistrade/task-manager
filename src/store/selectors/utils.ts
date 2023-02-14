import {CalendarMode} from "../../components/Calendars/types";
import {CalendarModeForState} from "../reducers/calendar";

export const currentFromStoreToDefault = (current: CalendarModeForState): CalendarMode => {
	const {layout} = current
	
	switch (layout) {
		case "day":
			return {
				layout: "day",
				date: new Date(current.date)
			}
		case "week":
			return {
				layout: 'week',
				aroundDate: new Date(current.aroundDate)
			}
		case "list":
			return {
				layout: 'list',
				fromDate: new Date(current.fromDate),
				toDate: new Date(current.toDate)
			}
		default:
			return current
	}
}