import {FlexBlock} from "../LayoutComponents/FlexBlock";
import {CalendarUserIndicator} from "../../pages/Planner/Users/UserIndicator";
import {Badge} from "../Badge/Badge";
import {DateHelper, HumanizeDateValueOptions} from "../../common/calendarSupport/dateHelper";
import {EventIcon} from "../Icons/EventIcon";
import {convertEventStatus} from "../../common/functions";
import {PriorityCalendarIcon} from "../Icons/CalendarIcons/PriorityCalendarIcon";
import {darkColor, PRIORITY_TITLES} from "../../common/constants";
import {GroupLogo} from "../../pages/Planner/Groups/GroupList.styled";
import React, {FC, useMemo} from "react";
import {ShortEventInfoModel} from "../../store/api/planning-api/types/event-info.types";
import {JoinToEventButton} from "../Buttons/Buttons.styled";
import {UrlIcon} from "../Icons/SocialNetworkIcons";
import {UserAvatar} from "../../pages/Planner/Users/UserAvatar";

export interface EventShortHoverCardProps {
	event: ShortEventInfoModel
}

export const EventShortHoverCard: FC<EventShortHoverCardProps> = ({event}) => {
	const time = useMemo(() => {
		const options: HumanizeDateValueOptions = {
			withTime: true,
			withYear: false,
			yearPattern: "short",
			monthPattern: "full"
		}
		const start = DateHelper.getHumanizeDateValue(event.time, options)
		const end = DateHelper.getHumanizeDateValue(event.timeEnd, options)
		
		return [
			'c ',
			<span style={{fontSize: 14, color: "#000"}}>{start}</span>,
			'\n',
			'по ',
			<span style={{fontSize: 14, color: "#000"}}>{end}</span>,
		]
	}, [])
	return (
		<FlexBlock direction={'column'} p={4} width={'100%'} gap={8}>
			<FlexBlock width={'100%'} gap={6} align={'center'}>
				<FlexBlock shrink={0}>
					<UserAvatar
						user={{name: event.userId.name, surname: event.userId.surname}}
					/>
				</FlexBlock>
				<FlexBlock fSize={15} style={{color: "#000"}}>
					{event.title}
				</FlexBlock>
			</FlexBlock>
			<Badge style={{padding: 6, whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: '16px'}}>
				{time}
			</Badge>
			<FlexBlock gap={4} align={'center'}>
				<EventIcon status={event.status} size={16}/>
				{convertEventStatus(event.status)}
			</FlexBlock>
			<FlexBlock gap={4} align={'center'}>
				<PriorityCalendarIcon priorityKey={event.priority} size={16}/>
				{PRIORITY_TITLES[event.priority] + ' приоритет'}
			</FlexBlock>
			<FlexBlock gap={4} align={'center'}>
				<GroupLogo
					color={event.group?.color || ""}
					size={16}
				/>
				{event.group?.title || ''}
			</FlexBlock>
			{event.link && (
				<FlexBlock width={'100%'} justify={'center'} mt={12}>
					<JoinToEventButton
						href={event.link.value}
						target={'_blank'}
						rel={'noreferrer'}
					>
						<FlexBlock gap={6} align={'center'}>
							<UrlIcon name={event.link.key || 'default'} size={16}/>
							Подключиться по ссылке
						</FlexBlock>
					</JoinToEventButton>
				</FlexBlock>
			)}
		</FlexBlock>
	)
}