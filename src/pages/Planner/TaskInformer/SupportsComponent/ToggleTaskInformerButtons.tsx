import {CalendarPriorityKeys, EventItem, EventLinkItem, TaskStatusesType, UUID} from "../../planner.types";
import {FC, useMemo, useState} from "react";
import {ToggleButtonContainer} from "./ToggleButtonContainer";
import {DropDownButton} from "../../../../components/Buttons/DropDownButton";
import {currentColor, PRIORITY_LIST, PRIORITY_TITLES, TASK_STATUSES} from "../../../../common/constants";
import {EmptyButtonStyled} from "../../../../components/Buttons/EmptyButton.styled";
import {EventIcon} from "../../../../components/Icons/EventIcon";
import {Delay} from "../../../../common/functions";
import {FlexBlock} from "../../../../components/LayoutComponents/FlexBlock";
import {useGetGroupsListQuery} from "../../../../store/api/planning-api";
import {GroupLogo} from "../../Groups/GroupList.styled";
import {IconProps, LoaderIcon} from "../../../../components/Icons/Icons";
import {PriorityCalendarIcon} from "../../../../components/Icons/CalendarIcons/PriorityCalendarIcon";
import {GroupModelResponse} from "../../../../store/api/planning-api/types/groups.types";

export type EventInfoUpdateFn = (field: keyof EventItem, data: string | EventLinkItem | boolean | null, taskId?: UUID) => Promise<void>

export interface ToggleEventButtonProps<T> {
	value: T | null,
	onChange?: EventInfoUpdateFn,
	elementId?: string,
	stopPropagation?: boolean,
	renderText?: boolean,
	iconProps?: Partial<IconProps>
}

export const ToggleEventCalendar: FC<ToggleEventButtonProps<GroupModelResponse>> = ({
																																											value,
																																											elementId,
																																											stopPropagation,
																																											renderText = true,
																																											onChange,
																																											iconProps
																																										}) => {
	const {data: calendarsList, isLoading} = useGetGroupsListQuery({exclude: ['Invite']}, {
		refetchOnFocus: true,
		refetchOnReconnect: true
	})
	
	const [mutationLoading, setMutationLoading] = useState(false)
	const randomId = useMemo(() => `change__event_calendar${Date.now() * Math.random()}`, [])
	return (
		<ToggleButtonContainer
			focusElementId={elementId || randomId}
			button={
				<DropDownButton
					stopPropagation={stopPropagation}
					onChange={async (element, e) => {
						if (onChange && !mutationLoading && !isLoading && value?._id !== element.id) {
							setMutationLoading(true)
							await onChange('group', element.id)
								.finally(async () => {
									await Delay(500)
									setMutationLoading(false)
								})
						}
					}}
					data={
						calendarsList?.data?.map((item) => ({
							id: item._id,
							title: item.title,
							key: item.color,
							icon: <GroupLogo color={item.color}/>
						})) || []}
					renderElement={
						<EmptyButtonStyled
							id={elementId || randomId}
							onClick={(e) => stopPropagation && e.stopPropagation()}
						>
							<FlexBlock gap={6} align={'center'}>
								{mutationLoading ? (
									<LoaderIcon size={20} {...iconProps} color={currentColor}/>
								) : (
									<GroupLogo color={value?.color || currentColor} {...iconProps}/>
								)}
								{renderText && (value?.title || "Выберите группу событий")}
							</FlexBlock>
						</EmptyButtonStyled>
					}
					selectedId={value?._id}
				/>
			}
		/>
	)
}

export const ToggleEventStatus: FC<ToggleEventButtonProps<TaskStatusesType>> = ({
																																									value,
																																									onChange,
																																									elementId,
																																									stopPropagation,
																																									renderText = true,
																																									iconProps
																																								}) => {
	const randomId = useMemo(() => `change__status_${Date.now() * Math.random()}`, [])
	return (
		<ToggleButtonContainer
			focusElementId={elementId || randomId}
			button={<DropDownButton
				stopPropagation={stopPropagation}
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
				renderElement={
					<EmptyButtonStyled
						id={elementId || randomId}
						onClick={(e) => stopPropagation && e.stopPropagation()}
					>
						<FlexBlock gap={6} align={'center'}>
							<EventIcon  {...iconProps} status={value || "all"}/>
							{renderText && value && TASK_STATUSES[value].title || ''}
						</FlexBlock>
					</EmptyButtonStyled>
				}
				selectedId={value || ""}
			/>
			}
		/>
	)
}

export const ToggleEventPriority: FC<ToggleEventButtonProps<CalendarPriorityKeys>> = ({
																																												value,
																																												onChange,
																																												elementId,
																																												stopPropagation,
																																												renderText = true,
																																												iconProps
																																											}) => {
	const randomId = useMemo(() => `change__priority_${Date.now() * Math.random()}`, [])
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
					icon: <PriorityCalendarIcon priorityKey={item.type} isCompleted={false}/>
				}))}
				renderElement={
					<EmptyButtonStyled
						id={elementId || randomId}
						onClick={(e) => stopPropagation && e.stopPropagation()}
					>
						<FlexBlock gap={6} align={'center'}>
							<PriorityCalendarIcon
								{...iconProps}
								priorityKey={value || "not_selected"}
							/>
							{renderText && value && (
								<FlexBlock fSize={16}>
									{PRIORITY_TITLES[value] + ' приоритет'}
								</FlexBlock>
							)}
						</FlexBlock>
					</EmptyButtonStyled>
				}
				selectedId={value || ""}
			/>}
			focusElementId={elementId || randomId}
		/>
	)
}