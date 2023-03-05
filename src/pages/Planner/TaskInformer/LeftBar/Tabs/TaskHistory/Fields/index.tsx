import {FC} from "react";
import {convertEventStatus} from "../../../../../../../common/functions";
import {TaskChainItem} from "../../Chains/View/TaskChainItem";
import {currentColor, darkColor, DATE_RENDER_FORMAT, PRIORITY_TITLES} from "../../../../../../../common/constants";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";
import {EventIcon} from "../../../../../../../components/Icons/EventIcon";
import dayjs from "dayjs";
import {TaskInformerDescriptionText} from "../../../../SupportsComponent/TaskInformerDescription";
import {CalendarItemLabel, GroupItemCheckbox} from "../../../../../Groups/GroupList.styled";
import {JoinToEventButton} from "../../../../../../../components/Buttons/Buttons.styled";
import {PriorityCalendarIcon} from "../../../../../../../components/Icons/CalendarIcons/PriorityCalendarIcon";
import {TrashIcon} from "../../../../../../../components/Icons/Icons";
import {EventHistoryQueryResult} from "../../../../../../../store/api/planning-api/types/event-history.types";
import {TaskChainBadge} from "../../Chains/EventChains.styled";

export interface TaskHistoryFieldControllerProps {
	historyItem: EventHistoryQueryResult,
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
	
	// if (fieldName === 'parentId') {
	// 	return (
	// 		<TaskChainItemsWrapper wrapState={true}>
	// 			{eventSnapshot.parentId ? (
	// 				<TaskChainItem
	// 					withMarginLeft={false}
	// 					taskChainItem={{
	// 						_id: eventSnapshot.parentId._id,
	// 						title: eventSnapshot.parentId.title,
	// 						status: eventSnapshot.parentId.status,
	// 						priority: eventSnapshot.parentId.priority
	// 					}}
	// 				/>
	// 			) : (
	// 				<>Родительское событие не найдено</>
	// 			)}
	// 		</TaskChainItemsWrapper>
	// 	)
	// }
	
	// if (fieldName === 'childOf') {
	// 	const arr = eventSnapshot.childOf
	// 	const items = arr.filter((arrItem) => {
	// 		return dayjs(date).isSame(arrItem.createdAt, 'minute')
	// 	})
	//
	// 	if (items) {
	// 		return (
	// 			<TaskChainItemsWrapper wrapState={true}>
	// 				{items.map(({event}) => (
	// 					<TaskChainItem
	// 						withMarginLeft={false}
	// 						taskChainItem={{
	// 							childOf: event.childOf,
	// 							id: event.id,
	// 							title: event.title,
	// 							status: event.status,
	// 							priority: event.priority
	// 						}}
	// 					/>
	// 				))}
	// 			</TaskChainItemsWrapper>
	// 		)
	// 	}
	//
	// 	return <>Не удалось загрузить событие, возможно оно было удалено</>
	// }
	
	if (fieldName === 'createdAt') {
		return (
			<FlexBlock width={'100%'} gap={6} align={'center'}>
				<TaskChainItem
					chainItem={{
						_id: eventSnapshot._id,
						title: eventSnapshot.title,
						status: eventSnapshot.status,
						priority: eventSnapshot.priority
					}}
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
		return <TaskInformerDescriptionText description={eventSnapshot.description || "Описание отсутствует"}/>
	}
	
	if (fieldName === 'group') {
		
		const d = date.toString()
		return (
			<TaskChainBadge>
				<FlexBlock gap={6}>
					{eventSnapshot.group
						? (
							<>
								<GroupItemCheckbox
									type={'checkbox'}
									id={`history_label_${d}_${eventSnapshot.group._id}`}
									color={eventSnapshot.group.color}
									checked={true}
									// disabled={true}
								/>
								<CalendarItemLabel>{eventSnapshot.group.title}</CalendarItemLabel>
							</>
						) : (
							<>
								<TrashIcon size={16} color={darkColor}/>
								<CalendarItemLabel>Календарь удален</CalendarItemLabel>
							</>
						)}
				
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