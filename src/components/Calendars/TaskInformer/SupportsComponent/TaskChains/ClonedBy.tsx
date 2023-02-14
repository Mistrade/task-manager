import {UUID} from "../../../types";
import {FC} from "react";
import {useGetTaskInfoQuery} from "../../../../../store/api/taskApi/taskApi";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {borderRadiusSize, currentColor, defaultColor, disabledColor} from "../../../../../common/constants";
import {Link} from "react-router-dom";
import {useCalendar} from "../../../../../hooks/useCalendar";
import {useAppSelector} from "../../../../../store/hooks/hooks";
import {LinkStyled} from "../../../../Buttons/Link.styled";
import {TaskInformerUpdateFn, ToggleEventPriority, ToggleEventStatus} from "../ToggleTaskInformerButtons";
import {TaskChainItem} from "./TaskChainItem";
import {ThreeDots} from "react-loader-spinner";
import {Loader} from "../../../../Loaders/Loader";
import {TaskChainTitle} from "./TaskChainTitle";
import {TaskChainItemsWrapper} from "./TaskChainItemsWrapper";
import {useBoolean} from "../../../../../hooks/useBoolean";


export interface TaskClonedByProps {
	fromTaskId: UUID,
	updateFn: TaskInformerUpdateFn,
	title: string,
	suffix: string
}

export const TaskClonedBy: FC<TaskClonedByProps> = ({fromTaskId, updateFn, title, suffix}) => {
	const {data: taskInfo, isFetching, isError} = useGetTaskInfoQuery(fromTaskId)
	const {state, toggleState} = useBoolean(true)
	
	if (taskInfo?.data) {
		return (
			<TaskChainTitle
				title={title}
				isWrap={state}
				onWrapTitle={toggleState}
				content={
					<TaskChainItemsWrapper wrapState={state}>
						<TaskChainItem taskChainItem={taskInfo.data} suffix={suffix} updateFn={updateFn}/>
					</TaskChainItemsWrapper>
				}
			/>
		)
	}
	
	return <></>
}