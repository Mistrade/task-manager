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


export interface TaskClonedByProps {
	fromTaskId: UUID,
	updateFn: TaskInformerUpdateFn,
	title: string,
	suffix: string
}

export const TaskClonedBy: FC<TaskClonedByProps> = ({fromTaskId, updateFn, title, suffix}) => {
	const {data, isFetching, isError} = useGetTaskInfoQuery(fromTaskId)
	
	if (data?.data || isFetching) {
		return (
			<FlexBlock width={'100%'} direction={'column'} gap={6}>
				<FlexBlock fSize={16} color={currentColor} pl={4} fWeight={'normal'}>
					{title}
				</FlexBlock>
				{!data?.data ? (
					<Loader isActive={isFetching} />
				) : (
					<TaskChainItem taskChainItem={data.data} suffix={suffix} updateFn={updateFn}/>
				)}
			</FlexBlock>
		)
	}
	
	return <></>
}