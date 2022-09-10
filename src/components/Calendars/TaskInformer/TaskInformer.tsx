import {FC, useCallback, useMemo} from 'react'
import {CalendarCurrentMonth, TaskInformerMainProps, TaskInformerProps} from '../types'
import dayjs from 'dayjs'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {getMonthDays} from '../../../common/calendarSupport/getters'
import {ServerResponse, useUpdateTaskMutation} from "../../../store/api/taskApi/taskApi";
import {toast} from "react-toastify";
import {TaskInformerUpdateFn} from "./SupportsComponent/ToggleTaskInformerButtons";
import {TaskInformerRightBar} from "./RightBar/TaskInformerRightBar";
import {TaskInformerLeftBar} from "./LeftBar/TaskInformerLeftBar";
import {TaskInfoNotFound} from "./SupportsComponent/TaskInfoNotFound";

const TaskInformerMain: FC<TaskInformerMainProps> = ({taskItem}) => {
	const options = useMemo(() => {
		const start = dayjs(taskItem.time)
		const current: CalendarCurrentMonth = {
			layout: 'month',
			month: start.month(),
			year: start.year()
		}
		return {
			monthItem: getMonthDays(current, {useOtherDays: true}),
			currentDate: start.toDate(),
		}
	}, [taskItem.time])
	
	const [updateTask, {data}] = useUpdateTaskMutation()
	
	const updateTaskHandler: TaskInformerUpdateFn = useCallback(async (field, data) => {
		return await updateTask({
			id: taskItem.id,
			field,
			data
		})
			.unwrap()
			.then(r => {
				console.log(r)
				if (r.info) {
					toast(r.info.message, {
						type: r.info.type
					})
				}
			})
			.catch((r: { data?: ServerResponse<null>, status: number }) => {
				if (r.data?.info) {
					toast(r.data?.info?.message, {
						type: r.data.info.type
					})
				}
			})
	}, [taskItem.id])
	
	return (
		<FlexBlock
			direction={'column'}
			minWidth={900}
			width={'70vw'}
			p={'12px 20px'}
			gap={20}
		>
			<FlexBlock direction={'row'} width={'100%'} gap={12}>
				<TaskInformerLeftBar taskItem={taskItem} updateFn={updateTaskHandler}/>
				<TaskInformerRightBar taskItem={taskItem} monthItem={options.monthItem} updateFn={updateTaskHandler}/>
			</FlexBlock>
		</FlexBlock>
	)
}

export const TaskInformer: FC<TaskInformerProps> = ({taskItem}) => {
	return !taskItem ? <TaskInfoNotFound/> : <TaskInformerMain taskItem={taskItem}/>
}
