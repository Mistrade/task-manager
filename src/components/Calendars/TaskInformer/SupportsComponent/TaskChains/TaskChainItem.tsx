import {borderRadiusSize, darkColor, disabledColor, hoverColor} from "../../../../../common/constants";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {TaskInformerUpdateFn} from "../ToggleTaskInformerButtons";
import {LinkStyled} from "../../../../Buttons/Link.styled";
import {FC} from "react";
import {FullResponseEventModel} from "../../../../../store/api/taskApi/types";
import {useAppSelector} from "../../../../../store/hooks/hooks";
import {CalendarSelectors} from "../../../../../store/selectors/calendarItems";
import {Badge} from "../../../../Badge/Badge";
import styled from "styled-components";
import {convertEventStatus} from "../../../../../common/functions";
import {PriorityCalendarIcon} from "../../../../Icons/CalendarIcons/PriorityCalendarIcon";
import {EventSnapshot} from "../../../../../store/api/taskApi/taskApi";

export interface TaskChainItemProps {
	taskChainItem: EventSnapshot,
	taskItem?: FullResponseEventModel,
	updateFn?: TaskInformerUpdateFn,
	suffix?: string,
	withMarginLeft?: boolean
}

export const TaskChainBadge = styled(Badge)`
  font-size: 15px;
  color: ${darkColor};
  background-color: ${hoverColor};
  padding: 3px 6px;
`

export const TaskChainItem: FC<TaskChainItemProps> = ({
																												taskChainItem,
																												taskItem,
																												updateFn,
																												suffix,
																												withMarginLeft = true
																											}) => {
	const {statuses, current} = useAppSelector(CalendarSelectors.dataForURL)
	
	return (
		<FlexBlock
			direction={'row'}
			align={'center'}
			wrap={'nowrap'}
			width={'calc(100% - 12px)'}
			justify={'flex-start'}
			p={'6px'}
			border={`1px solid ${disabledColor}`}
			borderRadius={borderRadiusSize.sm}
			gap={12}
			ml={withMarginLeft ? 12 : undefined}
		>
			<FlexBlock gap={6}>
				{/*<EventIcon status={taskChainItem.status} size={20}/>*/}
				<TaskChainBadge>
					{convertEventStatus(taskChainItem.status)}
				</TaskChainBadge>
				<PriorityCalendarIcon priorityKey={taskChainItem.priority} size={20}/>
				{taskChainItem.childOf.length > 0 && (
					<TaskChainBadge>
						{taskChainItem.childOf.length}
					</TaskChainBadge>
				)}
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