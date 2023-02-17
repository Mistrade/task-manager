import {FC} from "react";
import {EventHistoryResponseItem} from "../../../../../../store/api/taskApi/taskApi";
import {convertEventStatus} from "../../../../../../common/functions";
import {TaskChainBadge, TaskChainItem} from "../../TaskChains/TaskChainItem";
import {currentColor, DATE_RENDER_FORMAT, PRIORITY_TITLES} from "../../../../../../common/constants";
import {FlexBlock} from "../../../../../LayoutComponents/FlexBlock";
import {EventIcon} from "../../../../../Icons/EventIcon";
import {FullResponseEventModel} from "../../../../../../store/api/taskApi/types";
import {TaskChainItemsWrapper} from "../../TaskChains/TaskChainItemsWrapper";
import dayjs from "dayjs";
import {TaskInformerDescriptionText} from "../../TaskInformerDescription";
import {CalendarItemLabel} from "../../../../CalendarList/CalendarNameListItem";
import {CalendarNameCheckbox} from "../../../../CalendarList/CalendarList.styled";
import {JoinToEventButton} from "../../../../../Buttons/Buttons.styled";
import {PriorityCalendarIcon} from "../../../../../Icons/CalendarIcons/PriorityCalendarIcon";

export interface TaskHistoryFieldControllerProps {
	historyItem: EventHistoryResponseItem,
}

export const TaskHistoryFieldController: FC<TaskHistoryFieldControllerProps> = ({historyItem}) => {
	const {date, fieldName, snapshotDescription, eventSnapshot, eventId, changeUserId} = historyItem
	
	if (fieldName === 'status') {
		return (
			<TaskChainBadge>
				<FlexBlock gap={6} align={'center'} fSize={16}>
					<EventIcon status={eventSnapshot.status} size={20}/>
					{convertEventStatus(eventSnapshot.status)}
				</FlexBlock>
			</TaskChainBadge>
		)
	}
	
	if (fieldName === 'priority') {
		return (
			<TaskChainBadge>
				<FlexBlock gap={6} align={'center'} fSize={16}>
					<PriorityCalendarIcon priorityKey={eventSnapshot.priority} size={20}/>
					{PRIORITY_TITLES[eventSnapshot.priority]}
				</FlexBlock>
			</TaskChainBadge>
		)
	}
	
	if (fieldName === 'childOf') {
		const arr = eventSnapshot.childOf as unknown as Array<FullResponseEventModel>
		const item = arr.find((arrItem) => {
			return dayjs(date).isSame(arrItem.createdAt, 'second')
		}) as unknown as FullResponseEventModel
		
		if (item) {
			return (
				<TaskChainItemsWrapper wrapState={true}>
					<TaskChainItem
						withMarginLeft={false}
						taskChainItem={item}
					/>
				</TaskChainItemsWrapper>
			)
		}
		
		return <>Не удалось загрузить событие, возможно оно было удалено</>
	}
	
	if (fieldName === 'createdAt') {
		return (
			<FlexBlock width={'100%'} gap={6} align={'center'}>
				<TaskChainItem
					taskChainItem={eventSnapshot}
					withMarginLeft={false}
				/>
			</FlexBlock>
		)
	}
	
	if (fieldName === 'title') {
		return (
			<FlexBlock fSize={16} style={{color: currentColor}}>
				{eventSnapshot.title}
			</FlexBlock>
		)
	}
	
	if (fieldName === 'time' || fieldName === 'timeEnd') {
		return (
			<TaskChainBadge>
				<FlexBlock fSize={16}>
					{dayjs(eventSnapshot[fieldName]).format(DATE_RENDER_FORMAT)}
				</FlexBlock>
			</TaskChainBadge>
		)
	}
	
	if (fieldName === 'description') {
		return <TaskInformerDescriptionText description={eventSnapshot.description}/>
	}
	
	if (fieldName === 'calendar') {
		const d = date.toString()
		return (
			<TaskChainBadge>
				<FlexBlock gap={6}>
					<CalendarNameCheckbox
						type={'checkbox'}
						id={`history_label_${d}_${eventSnapshot.calendar._id}`}
						color={eventSnapshot.calendar.color}
						checked={true}
						// disabled={true}
					/>
					<CalendarItemLabel>{eventSnapshot.calendar.title}</CalendarItemLabel>
				</FlexBlock>
			</TaskChainBadge>
		)
	}
	
	if (fieldName === 'link') {
		if (eventSnapshot.link) {
			return (
				<JoinToEventButton
					href={eventSnapshot.link.value}
					target={'_blank'}
					rel={''}
				>
					Подключиться по ссылке
				</JoinToEventButton>
			)
		}
		
		return <>Ссылка была удалена</>
	}
	
	return <></>
}