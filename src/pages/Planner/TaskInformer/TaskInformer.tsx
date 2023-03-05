import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {MainEventInformerProps, EventInformerProps} from '../planner.types'
import dayjs from 'dayjs'
import {FlexBlock} from '../../../components/LayoutComponents/FlexBlock'
import {useUpdateTaskMutation} from "../../../store/api/planning-api";
import {toast} from "react-toastify";
import {
	EventInfoUpdateFn,
	ToggleEventCalendar,
	ToggleEventPriority, ToggleEventStatus
} from "./SupportsComponent/ToggleTaskInformerButtons";
import {TaskInformerRightBar} from "./RightBar/TaskInformerRightBar";
import {TaskInformerLeftBar} from "./LeftBar/TaskInformerLeftBar";
import {TaskInfoNotFound} from "./SupportsComponent/TaskInfoNotFound";
import {DateListGenerator} from "../../../common/calendarSupport/generators";
import {MyServerResponse} from "../../../store/api/rtk-api.types";
import {borderRadiusSize, disabledColor, pageHeaderColor, TASK_STATUSES} from "../../../common/constants";
import {TaskInformerTitle} from "./SupportsComponent/TaskInformerTitle";
import {TaskInformerLinkButton} from "./SupportsComponent/TaskInformerLinkButton";
import {
	isCorrectTaskInformerSwitcherName,
	TaskInformerSwitchers,
	TaskInformerSwitchersKeys
} from "./SupportsComponent/TaskInformerSwitchers";
import {useParams} from "react-router";
import {useAppSelector} from "../../../store/hooks/hooks";
import {CalendarSelectors} from "../../../store/selectors/calendarItems";
import {useSearchNavigate} from "../../../hooks/useSearchNavigate";
import {SelectItemContainer} from '../../../components/Input/SelectInput/SelectItemContainer';
import {SelectListContainer} from "../../../components/Input/SelectInput/SelectListContainer";
import {DropDown} from "../../../components/Input/Dropdown/DropDown";
import {TaskInformerMoreActions} from "./SupportsComponent/TaskInformerMoreActions";
import {css} from "styled-components";

const TaskInformerMain: FC<MainEventInformerProps> = ({eventInfo, onCloneEvent, onOpenClonedEvent, onClose}) => {
	const {planner, statuses} = useAppSelector(CalendarSelectors.dataForURL)
	const navigate = useSearchNavigate()
	const {tabName} = useParams<{ tabName?: TaskInformerSwitchersKeys }>()
	const [switcher, setSwitcher] = useState<TaskInformerSwitchersKeys>(tabName && isCorrectTaskInformerSwitcherName(tabName) ? tabName : 'about')
	
	
	useEffect(() => {
		const path = `/planner/${planner.layout}/${statuses}/${eventInfo._id}`
		if (!tabName || !isCorrectTaskInformerSwitcherName(tabName)) {
			return navigate(path + '/about', {replace: true})
		}
		
		if (tabName !== switcher) {
			return navigate(path + '/' + switcher, {replace: true})
		}
	}, [tabName, switcher])
	
	
	const options = useMemo(() => {
		const start = dayjs(eventInfo.time)
		const monthItem = new DateListGenerator({useOtherDays: true}).getMonthItem(start.toDate())
		
		return {
			monthItem,
			currentDate: start.toDate(),
		}
	}, [eventInfo.time])
	
	const [updateTask, {data}] = useUpdateTaskMutation()
	
	const updateTaskHandler: EventInfoUpdateFn = useCallback(async (field, data, taskId) => {
		return await updateTask({
			id: taskId || eventInfo._id,
			field,
			data
		})
			.unwrap()
			.then(r => {
				if (r.info) {
					toast(r.info.message, {
						type: r.info.type
					})
				}
			})
			.catch((r: { data?: MyServerResponse<null>, status: number }) => {
				if (r.data?.info) {
					toast(r.data?.info?.message, {
						type: r.data.info.type
					})
				}
			})
	}, [eventInfo._id])
	
	return (
		<FlexBlock
			direction={'column'}
			width={'100%'}
			height={'100%'}
		>
			<FlexBlock
				pt={24}
				mb={12}
				pl={20}
				pr={20}
				gap={8}
				bgColor={pageHeaderColor}
				borderRadius={`${borderRadiusSize.xl} ${borderRadiusSize.xl} 0px 0px`}
				direction={'column'}
				width={'100%'}
				additionalCss={css`
				`}
			>
				<FlexBlock direction={'row'} justify={'flex-start'} gap={12} mb={12}>
					<TaskInformerTitle
						title={eventInfo.title}
						onChange={async (value) => await updateTaskHandler('title', value)}
						isLiked={eventInfo.isLiked}
						onChangeLiked={async (value) => await updateTaskHandler('isLiked', value)}
					/>
				</FlexBlock>
				<FlexBlock justify={'flex-start'} gap={8} direction={'row'} additionalCss={css`z-index: 1`}>
					<TaskInformerMoreActions
						onClose={onClose}
						onCloneEvent={onCloneEvent}
						onOpenClonedEvent={onOpenClonedEvent}
						taskItem={eventInfo}
					/>
					<FlexBlock maxWidth={600} width={'100%'}>
						<TaskInformerLinkButton
							link={eventInfo.link}
							updateFn={updateTaskHandler}
						/>
					</FlexBlock>
				</FlexBlock>
				<FlexBlock
					gap={12}
					p={`4px 8px`}
					border={`1px solid ${disabledColor}`}
					align={'center'}
					borderRadius={borderRadiusSize.sm}
				>
					<ToggleEventCalendar
						elementId={`set_event_group_${eventInfo._id}`}
						value={eventInfo.group}
						onChange={updateTaskHandler}
					/>
					<ToggleEventPriority
						elementId={`set_event_priority_${eventInfo._id}`}
						value={eventInfo.priority}
						onChange={updateTaskHandler}
					/>
					<ToggleEventStatus
						elementId={`set_event_status_${eventInfo._id}`}
						value={eventInfo.status}
						onChange={updateTaskHandler}
					/>
				</FlexBlock>
				<TaskInformerSwitchers
					badges={{
						members: (eventInfo.invites.length || 0) + 1,
						history: 0,
						chains: 0,
						comments: 0
					}}
					selected={switcher}
					onChange={(value) => setSwitcher(value.key)}
				/>
			</FlexBlock>
			<FlexBlock direction={'row'} width={'100%'} height={'100%'} gap={12} pl={20} pb={12} pr={20} overflow={'hidden'}
								 additionalCss={css`z-index: 0`}>
				<TaskInformerLeftBar
					switcher={switcher}
					eventInfo={eventInfo}
					updateFn={updateTaskHandler}
				/>
				<TaskInformerRightBar
					eventInfo={eventInfo}
					monthItem={options.monthItem}
					updateFn={updateTaskHandler}
				/>
			</FlexBlock>
		</FlexBlock>
	)
}

export const TaskInformer: FC<EventInformerProps> = ({
																											 eventInfo,
																											 onCloneEvent,
																											 onOpenClonedEvent,
																											 eventErrorInfo,
																											 onClose
																										 }) => {
	return !eventInfo
		? <TaskInfoNotFound message={eventErrorInfo}/>
		: <TaskInformerMain
			eventInfo={eventInfo}
			onOpenClonedEvent={onOpenClonedEvent}
			onClose={onClose}
			onCloneEvent={onCloneEvent}
		/>
}
