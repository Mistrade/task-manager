import {CalendarMode} from "./types";
import {FC, useEffect} from "react";
import {FilterTaskStatuses, URLTaskStatuses} from "./DayCalendar/EventFilter";
import {useLocation, useParams} from "react-router";
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
	const location = useLocation()
	
	useEffect(() => {
		if (!taskStatus || !isCorrectTaskStatus(taskStatus)) {
			navigate(`/calendar/${layout}/${statuses}`, {replace: true})
		} else {
			dispatch(changeTaskStatuses(taskStatus))
		}
	}, [])
	
	useEffect(() => {
		console.log(taskStatus, statuses)
	}, [taskStatus, statuses])
	
	useEffect(()=>{
		console.log(location)
	}, [location])
	
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