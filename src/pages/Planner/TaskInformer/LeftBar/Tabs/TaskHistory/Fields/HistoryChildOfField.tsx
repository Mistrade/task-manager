import {FC} from "react";
import {BaseEventHistoryFieldProps} from "../event-history.types";
import {ReplyContent} from "../Essences/EventEssence/event-essence.styled";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";
import {EventEssence} from "../Essences/EventEssence/EventEssence";

interface ChildOfListProps {
	list: BaseEventHistoryFieldProps['value']['eventSnapshot']['insertChildOfEvents']
}

const ChildOfList: FC<ChildOfListProps> = ({list}) => {
	if (list && !!list.length) {
		return (
			<FlexBlock gap={6} direction={'column'} pb={4} width={'100%'}>
				{list.map((item) => (
					<EventEssence
						status={item?.status || null}
						priority={item?.priority || null}
						title={item?.title || 'Заголовок отсутствует'}
						createdAt={item?.createdAt}
						eventId={item?.originalEventId}
					/>
				))}
			</FlexBlock>
		)
	}
	
	return (
		<ReplyContent>Данные не найдены</ReplyContent>
	)
}

export const HistoryChildOfField: FC<BaseEventHistoryFieldProps> = ({value}) => {
	
	if (value.fieldName === 'insertChildOfEvents' && !value.eventSnapshot.insertChildOfEvents) {
		return <ReplyContent>Данные не найдены</ReplyContent>
	}
	
	if (
		value.fieldName === 'removeChildOfEvents'
		&& (!value.eventSnapshot.removeChildOfEvents || value.eventSnapshot.removeChildOfEvents.length === 0)
	) {
		return <ReplyContent>Данные не найдены</ReplyContent>
	}
	
	return (
		<ChildOfList
			list={
				value.fieldName === 'insertChildOfEvents'
					? value.eventSnapshot.insertChildOfEvents
					: value.fieldName === 'removeChildOfEvents'
						? value.eventSnapshot.removeChildOfEvents
						: []
			}
		/>
	)
}