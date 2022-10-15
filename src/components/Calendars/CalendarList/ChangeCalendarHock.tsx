import {useParams} from "react-router";
import {ChangeCalendarModal, ChangeCalendarModalDefaultProps} from "../CalendarModals/CreateCalendar";
import {FC} from "react";
import {ChangeCalendarRequestMiddleware} from "./ChangeCalendarRequestMiddleware";

export interface ChangeCalendarHockProps extends ChangeCalendarModalDefaultProps {

}

export const ChangeCalendarHock: FC<ChangeCalendarHockProps> = ({onClose}) => {
	const {calendarId} = useParams<{ calendarId?: string }>()
	
	
	if (calendarId) {
		return (
			<ChangeCalendarRequestMiddleware
				onClose={onClose}
				calendarId={calendarId}
			/>
		)
	}
	
	return (
		<ChangeCalendarModal
			onClose={onClose}
		/>
	)
}