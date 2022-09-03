import {FC, useEffect} from "react";
import {useParams} from "react-router";
import {CalendarMode} from "./types";
import {useAppDispatch} from "../../store/hooks/hooks";
import {changeCalendarCurrent} from "../../store/reducers/calendar";
import {useNavigate} from "react-router-dom";
import {Calendar} from "./Сalendar";

export const CalendarMain: FC = () => {
	const {layout, taskId} = useParams<{ layout: CalendarMode["layout"], taskId: string }>()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	
	useEffect(() => {
		if (!layout) {
			navigate('/calendar/day', {replace: true})
		} else {
			dispatch(changeCalendarCurrent({layout, date: new Date().toString()}))
		}
	}, [])
	
	const isCorrectLayout = (l: CalendarMode["layout"] | undefined) => {
		switch (l) {
			case 'year':
				return true
			case 'month':
				return true
			case 'week':
				return true
			case 'day':
				return true
			default:
				return false
		}
	}
	
	if (isCorrectLayout(layout) && layout) {
		return (
			<Calendar
				taskId={taskId}
				layout={layout}
			/>
		)
	}
	
	return <>Неверный layout</>
}