import styled, {css} from "styled-components";
import {
	borderRadiusSize, darkColor,
	DATE_HOURS_FORMAT,
	defaultColor,
	hoverColor, lightHoverColor,
	orangeColor, PRIORITY_TITLES
} from "../../../../../../common/constants";
import React, {FC, useMemo, useState} from "react";
import {TaskTileItemProps} from "../../../../planner.types";
import {FlexBlock} from "../../../../../../components/LayoutComponents/FlexBlock";
import {GroupLogo} from "../../../../Groups/GroupList.styled";
import {PriorityCalendarIcon} from "../../../../../../components/Icons/CalendarIcons/PriorityCalendarIcon";
import dayjs from "dayjs";
import {CalendarCellStyledComponentProps} from "../Cell";
import {DateHelper, HumanizeDateValueOptions} from "../../../../../../common/calendarSupport/dateHelper";
import {Tooltip} from "../../../../../../components/Tooltip/Tooltip";
import {Badge} from "../../../../../../components/Badge/Badge";
import {convertEventStatus} from "../../../../../../common/functions";
import {CalendarUserIndicator} from "../../../../Users/UserIndicator";
import {EventIcon} from "../../../../../../components/Icons/EventIcon";
import {EventShortHoverCard} from "../../../../../../components/HoverCard/EventShortHoverCard";

interface EventContainerProps extends CalendarCellStyledComponentProps {
	withFill?: boolean
}

interface EventTextProps {
	isCompleted?: boolean,
	fs?: string
}

const EventContainer = styled('div')<EventContainerProps>`
  & {
    gap: 4px;
    background-color: ${props => props.withFill ? hoverColor : ''};
    width: 100%;
    padding: 5px 7px;
    text-align: center;
    border-radius: ${borderRadiusSize.sm};
    margin-top: 4px;
    opacity: ${props => props.disabled ? .2 : 1};
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
    flex-direction: column;
  }
`

const EllipsisMixin = css`
  display: block;
  line-height: 1;
  width: 100%;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`

export const EventText = styled('span')<EventTextProps>`
  & {
    ${EllipsisMixin};
    font-size: ${props => props.fs || '14px'};
    text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
    text-decoration-color: ${props => props.isCompleted ? orangeColor : '#000'};
    text-decoration-thickness: 2px;
    font-weight: 500;
  }
`

const EventTimeValue = styled('span')`
  & {
    ${EllipsisMixin};
    font-size: 12px;
    color: ${defaultColor};
  }
`

export const CalendarCellEventItem: FC<TaskTileItemProps> = ({taskInfo, onSelect, date}) => {
	const [isHover, setIsHover] = useState(false)
	
	const condition = useMemo(() => {
		return !date.meta.isDisabled
	}, [date, taskInfo])
	
	const timeValue = useMemo(() => {
		const start = dayjs(taskInfo.time)
		const end = dayjs(taskInfo.timeEnd)
		
		if (start.isSame(end, 'date')) {
			const shortStart = start.format(DATE_HOURS_FORMAT)
			const shortEnd = end.format(DATE_HOURS_FORMAT)
			return `${shortStart} - ${shortEnd}`
		}
		
		const options: HumanizeDateValueOptions = {
			withTime: false,
			yearPattern: "short"
		}
		
		const humanizeStart = DateHelper.getHumanizeDateValue(start.toDate(), options)
		const humanizeEnd = DateHelper.getHumanizeDateValue(end.toDate(), options)
		
		return `${humanizeStart} - ${humanizeEnd}`
	}, [taskInfo])
	
	return (
		<Tooltip
			animation={'shift-away'}
			content={<EventShortHoverCard event={taskInfo}/>}
			theme={'light'}
			placement={'left'}
			offset={[0, 15]}
			delay={[500, 0]}
			interactive={true}
			interactiveBorder={4}
		>
			<EventContainer
				onMouseEnter={() => condition && setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				withFill={isHover}
				disabled={date.meta.isDisabled}
				isCurrent={date.meta.isCurrent}
				onClick={(event) => condition && onSelect && onSelect(taskInfo._id)}
			>
				<FlexBlock direction={'column'} gap={4} width={'100%'}>
					<FlexBlock direction={'row'} gap={4} align={'center'}>
						<GroupLogo
							color={taskInfo.group?.color || ""}
							size={16}
						/>
						<FlexBlock width={'calc(100% - 16px)'}>
							<EventText isCompleted={taskInfo.status === 'completed'}>
								{taskInfo.title}
							</EventText>
						</FlexBlock>
					</FlexBlock>
					<FlexBlock direction={'row'} gap={4} align={'center'}>
						<PriorityCalendarIcon
							priorityKey={taskInfo.priority}
							size={16}
						/>
						<FlexBlock width={'calc(100% - 16px)'}>
							<EventTimeValue>
								{timeValue}
							</EventTimeValue>
						</FlexBlock>
					</FlexBlock>
				</FlexBlock>
			</EventContainer>
		</Tooltip>
	
	)
}