import {UsageTaskItemBaseProps} from "../../types";
import {TaskInformerUpdateFn} from "./ToggleTaskInformerButtons";
import {FC} from "react";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {DatePicker} from "../../DatePicker/DatePicker";
import dayjs from "dayjs";
import {TaskInformerDescription} from "./TaskInformerDescription";
import {useSearchNavigate} from "../../../../hooks/useSearchNavigate";

interface TaskInformerAboutTabProps extends UsageTaskItemBaseProps {
	updateFn: TaskInformerUpdateFn
}

export const TaskInformerAboutTab: FC<TaskInformerAboutTabProps> = ({taskItem, updateFn}) => {
	const navigate = useSearchNavigate()
	return (
		<FlexBlock direction={'column'} gap={12}>
			<FlexBlock direction={'row'} gap={12}>
				<DatePicker
					label={'Дата начала'}
					currentDate={dayjs(taskItem.time).toDate()}
					onChange={async (date) => {
						await updateFn('time', dayjs(date).toString())
					}}
					useForceUpdateValue={true}
				/>
				<DatePicker
					label={'Дата завершения'}
					currentDate={dayjs(taskItem.timeEnd).toDate()}
					onChange={async (date) => {
						await updateFn('timeEnd', dayjs(date).toString())
					}}
					useForceUpdateValue={true}
				/>
			</FlexBlock>
			<TaskInformerDescription taskItem={taskItem} updateFn={updateFn}/>
		</FlexBlock>
	)
}