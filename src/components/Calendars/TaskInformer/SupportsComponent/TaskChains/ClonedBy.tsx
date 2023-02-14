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


export interface TaskClonedByProps {
	fromTaskId: UUID,
	updateFn: TaskInformerUpdateFn,
	title: string
}

export const TaskClonedBy: FC<TaskClonedByProps> = ({fromTaskId, updateFn, title}) => {
	const {data, isFetching, isError} = useGetTaskInfoQuery(fromTaskId)
	const calendar = useCalendar()
	const {statuses} = useAppSelector(state => state.calendar)
	
	if (data?.data) {
		return (
			<FlexBlock width={'100%'} direction={'column'} gap={6}>
				<FlexBlock fSize={16} color={currentColor} pl={4} fWeight={'normal'}>
					{title}
				</FlexBlock>
				<FlexBlock
					direction={'row'}
					align={'center'}
					wrap={'nowrap'}
					width={'100%'}
					justify={'flex-start'}
					p={'6px'}
					border={`1px solid ${disabledColor}`}
					borderRadius={borderRadiusSize.sm}
					gap={12}
				>
					<FlexBlock gap={6}>
						<ToggleEventStatus
							value={data.data.status}
							onChange={(field, value) => updateFn(field, value, data.data?.id)}
							renderText={false}
						/>
						<ToggleEventPriority
							value={data.data.priority}
							onChange={(field, value) => updateFn(field, value, data.data?.id)}
							renderText={false}
						/>
					</FlexBlock>
					<LinkStyled
						style={{cursor: "pointer", color: defaultColor, fontSize: 16}}
						target={'_blank'}
						to={`/calendar/${calendar.current.layout}/${statuses}/${data?.data?.id}`}
					>
						{data?.data?.title}
					</LinkStyled>
				</FlexBlock>
			</FlexBlock>
		)
	}
	
	return <></>
}