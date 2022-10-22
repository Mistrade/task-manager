import {CalendarPriorityKeys, EventItem, EventLinkItem, TaskStatusesType} from "../../types";
import {FC, useState} from "react";
import {ToggleButtonContainer} from "./ToggleButtonContainer";
import {DropDownButton} from "../../../Buttons/DropDownButton";
import {currentColor, PRIORITY_LIST, PRIORITY_TITLES, TASK_STATUSES} from "../../../../common/constants";
import {EmptyButtonStyled} from "../../../Buttons/EmptyButton.styled";
import {EventIcon} from "../../../Icons/EventIcon";
import {convertEventStatus} from "../../../../common/functions";
import {ArrowIndicator} from "../../Cell";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {CalendarNameItem} from "../../CalendarList/CalendarNameListItem";
import {useGetCalendarsQuery} from "../../../../store/api/taskApi/taskApi";
import {CalendarIdentifier} from "../../CalendarList/CalendarList.styled";
import {LoaderIcon} from "../../../Icons/Icons";

export type TaskInformerUpdateFn = (field: keyof EventItem, data: string | EventLinkItem) => Promise<void>

export interface ToggleEventButtonProps<T> {
	value: T,
	onChange?: TaskInformerUpdateFn,
	elementId?: string,
	stopPropagation?: boolean,
	renderText?: boolean
}

export const ToggleEventCalendar: FC<ToggleEventButtonProps<CalendarNameItem>> = ({
																																										value,
																																										elementId,
																																										stopPropagation,
																																										renderText,
																																										onChange
																																									}) => {
	const {data: calendarsList, isLoading} = useGetCalendarsQuery({exclude: ['Invite']}, {
		refetchOnFocus: true,
		refetchOnReconnect: true
	})
	
	const [mutationLoading, setMutationLoading] = useState(false)
	
	return (
		<ToggleButtonContainer
			focusElementId={elementId || 'change__event_calendar'}
			button={
				<DropDownButton
					onChange={async (element, e) => {
						if (onChange && !mutationLoading && !isLoading && value._id !== element.id) {
							setMutationLoading(true)
							await onChange('calendar', element.id).finally(() => setMutationLoading(false))
						}
					}}
					data={
						calendarsList?.data?.map((item) => ({
							id: item._id,
							title: item.title,
							key: item.color,
							icon: <CalendarIdentifier color={item.color}/>
						})) || []}
					renderElement={({ref, onElementFocused, onElementBlur}) => (
						<EmptyButtonStyled ref={ref} onFocus={onElementFocused} onBlur={onElementBlur}>
							{mutationLoading ? (
								<LoaderIcon size={20} color={currentColor}/>
							) : (
								<CalendarIdentifier color={value.color}/>
							)}
						</EmptyButtonStyled>
					)}
					selectedId={value._id}
				/>
			}
			text={renderText && value.title}
		/>
	)
}

export const ToggleEventStatus: FC<ToggleEventButtonProps<TaskStatusesType>> = ({value, onChange}) => {
	return (
		<ToggleButtonContainer
			focusElementId={'change__status'}
			button={<DropDownButton
				onChange={async (element) => {
					if (onChange) {
						await onChange('status', element.id)
					}
				}}
				data={Object.values(TASK_STATUSES).map((item) => ({
					id: item.key,
					title: item.title,
					icon: item.icon
				}))}
				renderElement={({ref, onElementFocused, onElementBlur}) => (
					<EmptyButtonStyled ref={ref} onFocus={onElementFocused} onBlur={onElementBlur}>
						<EventIcon status={value}/>
					</EmptyButtonStyled>
				)}
				selectedId={value}
			/>}
			text={convertEventStatus(value)}
		/>
	)
}

export const ToggleEventPriority: FC<ToggleEventButtonProps<CalendarPriorityKeys>> = ({
																																												value,
																																												onChange,
																																												elementId,
																																												stopPropagation,
																																												renderText = true
																																											}) => {
	return (
		<ToggleButtonContainer
			button={<DropDownButton
				stopPropagation={stopPropagation}
				onChange={async (element, e) => {
					if (onChange) {
						await onChange('priority', element.id)
					}
				}}
				data={PRIORITY_LIST.map(item => ({
					id: item.type,
					title: item.title,
					icon: <ArrowIndicator priorityKey={item.type} isCompleted={false}/>
				}))}
				renderElement={({ref, onElementFocused, onElementBlur}) => (
					<EmptyButtonStyled
						id={elementId || 'change__priority'}
						ref={ref}
						onFocus={onElementFocused}
						onBlur={onElementBlur}
						onClick={(e) => stopPropagation && e.stopPropagation()}
					>
						<ArrowIndicator
							priorityKey={value}
						/>
					</EmptyButtonStyled>
				)}
				selectedId={value}
			/>}
			text={
				renderText && (
					<FlexBlock fSize={16}>
						{PRIORITY_TITLES[value] + ' приоритет'}
					</FlexBlock>
				)
			}
			focusElementId={elementId || 'change__priority'}
		/>
	)
}