import {CalendarMode} from "./types";
import {FC, useEffect} from "react";
import {FilterTaskStatuses, URLTaskStatuses} from "./DayCalendar/EventFilter";
import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store/hooks/hooks";
import {useNavigate} from "react-router-dom";
import {changeTaskStatuses} from "../../store/reducers/calendar";
import {Calendar} from "./Сalendar";


export const CalendarStatusProxy: FC<{ layout: CalendarMode["layout"] }> = ({layout}) => {
	const {taskStatus} = useParams<{ taskStatus: FilterTaskStatuses }>()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isCorrectTaskStatus = (status: FilterTaskStatuses | undefined) => {
		return status && URLTaskStatuses[status]
	}
	const {statuses} = useAppSelector(state => state.calendar)
	
	useEffect(() => {
		if (!taskStatus || !isCorrectTaskStatus(taskStatus)) {
			navigate(`/calendar/${layout}/${statuses}`, {replace: true})
		} else {
			dispatch(changeTaskStatuses(taskStatus))
		}
	}, [])
	
	
	if (taskStatus && isCorrectTaskStatus(taskStatus)) {
		return (
			<Calendar
				layout={layout}
				taskStatus={taskStatus}
			/>
		)
	}
	
	return <>Неверный taskStatus</>
}