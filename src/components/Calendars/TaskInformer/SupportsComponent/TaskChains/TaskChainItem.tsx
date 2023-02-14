import {borderRadiusSize, darkColor, defaultColor, disabledColor} from "../../../../../common/constants";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {TaskInformerUpdateFn, ToggleEventPriority, ToggleEventStatus} from "../ToggleTaskInformerButtons";
import {LinkStyled} from "../../../../Buttons/Link.styled";
import {FC} from "react";
import {FullResponseEventModel} from "../../../../../store/api/taskApi/types";
import {useAppSelector} from "../../../../../store/hooks/hooks";
import {CalendarSelectors} from "../../../../../store/selectors/calendarItems";

export interface TaskChainItemProps {
	taskChainItem: FullResponseEventModel,
	taskItem?: FullResponseEventModel,
	updateFn: TaskInformerUpdateFn,
	suffix: string
}

export const TaskChainItem: FC<TaskChainItemProps> = ({taskChainItem, taskItem, updateFn, suffix}) => {
	const {statuses,current} = useAppSelector(CalendarSelectors.dataForURL)
	
	return (
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
					elementId={`status_${suffix}_${taskChainItem.id}`}
					value={taskChainItem.status}
					onChange={(field, value) => updateFn(field, value, taskChainItem.id)}
					renderText={false}
				/>
				<ToggleEventPriority
					value={taskChainItem.priority}
					elementId={`priority_${suffix}_${taskChainItem.id}`}
					onChange={(field, value) => updateFn(field, value, taskChainItem.id)}
					renderText={false}
				/>
			</FlexBlock>
			<LinkStyled
				style={{cursor: "pointer", color: darkColor, fontSize: 16}}
				target={'_blank'}
				to={`/calendar/${current.layout}/${statuses}/${taskChainItem.id}`}
			>
				{taskChainItem.title}
			</LinkStyled>
		</FlexBlock>
	)
}