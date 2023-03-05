import {PlannerMode} from "../planner.types";
import {FC, useEffect} from "react";
import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/hooks";
import {changeEventStatuses} from "../../../store/reducers/planner-reducer";
import {PlannerPage} from "../Planner";
import {useSearchNavigate} from "../../../hooks/useSearchNavigate";
import {EventFilterTaskStatuses} from "../RenderModes/FindEventFilter/find-event-filters.types";
import {URLTaskStatuses} from "../../../common/constants";


export const CalendarStatusProxy: FC<{ layout: PlannerMode["layout"] }> = ({layout}) => {
	const {taskStatus} = useParams<{ taskStatus: EventFilterTaskStatuses }>()
	const dispatch = useAppDispatch()
	const navigate = useSearchNavigate()
	
	const isCorrectTaskStatus = (status: EventFilterTaskStatuses | undefined) => {
		return status && URLTaskStatuses[status]
	}
	const {statuses} = useAppSelector((state) => state.planner)
	
	useEffect(() => {
		if (!taskStatus || !isCorrectTaskStatus(taskStatus)) {
			navigate(`/planner/${layout}/${statuses}`, {replace: true})
		} else {
			dispatch(changeEventStatuses(taskStatus))
		}
	}, [])
	
	if (taskStatus && isCorrectTaskStatus(taskStatus)) {
		return (
			<PlannerPage
				layout={layout}
				taskStatus={taskStatus}
			/>
		)
	}
	
	return <>Неверный taskStatus</>
}