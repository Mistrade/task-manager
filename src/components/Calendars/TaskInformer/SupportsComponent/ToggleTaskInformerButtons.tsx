import {CalendarPriorityKeys, EventItem, EventLinkItem, TaskStatusesType} from "../../types";
import {FC} from "react";
import {ToggleButtonContainer} from "./ToggleButtonContainer";
import {DropDownButton} from "../../../Buttons/DropDownButton";
import {PRIORITY_LIST, PRIORITY_TITLES, TASK_STATUSES} from "../../../../common/constants";
import {EmptyButtonStyled} from "../../../Buttons/EmptyButton.styled";
import {EventIcon} from "../../../Icons/EventIcon";
import {convertEventStatus} from "../../../../common/functions";
import {ArrowIndicator} from "../../Cell";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";

export type TaskInformerUpdateFn = (field: keyof EventItem, data: string | EventLinkItem) => Promise<void>

export interface ToggleEventButtonProps<T> {
	value: T,
	onChange?: TaskInformerUpdateFn,
	elementId?: string,
	stopPropagation?: boolean,
	renderText?: boolean
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
					<EmptyButtonStyled id={'change__status'} ref={ref} onFocus={onElementFocused} onBlur={onElementBlur}>
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