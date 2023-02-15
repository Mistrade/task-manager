import {FC, useCallback, useMemo} from 'react'
import {TaskInformerMainProps, TaskInformerProps} from '../types'
import dayjs from 'dayjs'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {MyServerResponse, useUpdateTaskMutation} from "../../../store/api/taskApi/taskApi";
import {toast} from "react-toastify";
import {TaskInformerUpdateFn} from "./SupportsComponent/ToggleTaskInformerButtons";
import {TaskInformerRightBar} from "./RightBar/TaskInformerRightBar";
import {TaskInformerLeftBar} from "./LeftBar/TaskInformerLeftBar";
import {TaskInfoNotFound} from "./SupportsComponent/TaskInfoNotFound";
import {DateListGenerator} from "../../../common/calendarSupport/generators";

const TaskInformerMain: FC<TaskInformerMainProps> = ({taskItem, openClonedTask}) => {
	const options = useMemo(() => {
		const start = dayjs(taskItem.time)
		const monthItem = new DateListGenerator({useOtherDays: true}).getMonthItem(start.toDate())
		
		return {
			monthItem,
			currentDate: start.toDate(),
		}
	}, [taskItem.time])
	
	const [updateTask, {data}] = useUpdateTaskMutation()
	
	const updateTaskHandler: TaskInformerUpdateFn = useCallback(async (field, data, taskId) => {
		return await updateTask({
			id: taskId || taskItem.id,
			field,
			data
		})
			.unwrap()
			.then(r => {
				if (r.info) {
					toast(r.info.message, {
						type: r.info.type
					})
				}
			})
			.catch((r: { data?: MyServerResponse<null>, status: number }) => {
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
			minWidth={'70vw'}
			maxWidth={'85vw'}
			p={'12px 20px'}
			height={'100vh'}
			gap={20}
		>
			<FlexBlock direction={'row'} width={'100%'} height={'100%'} gap={12}>
				<TaskInformerLeftBar taskItem={taskItem} updateFn={updateTaskHandler}/>
				<TaskInformerRightBar
					taskItem={taskItem}
					monthItem={options.monthItem}
					updateFn={updateTaskHandler}
					openClonedTask={openClonedTask}
				/>
			</FlexBlock>
		</FlexBlock>
	)
}

export const TaskInformer: FC<TaskInformerProps> = ({taskItem, openClonedTask}) => {
	return !taskItem ? <TaskInfoNotFound/> : <TaskInformerMain taskItem={taskItem} openClonedTask={openClonedTask}/>
}
