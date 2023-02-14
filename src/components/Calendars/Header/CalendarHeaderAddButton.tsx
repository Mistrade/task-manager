import {SelectListContainer} from "../../Input/SelectInput/SelectListContainer";
import {SelectItemContainer} from "../../Input/SelectInput/SelectItemContainer";
import {EmptyButtonStyled} from "../../Buttons/EmptyButton.styled";
import {FC, RefObject, useMemo} from "react";
import {PlusIcon} from "../../Icons/Icons";
import {DropDown} from "../../Dropdown/DropDown";
import {useSearchNavigate} from "../../../hooks/useSearchNavigate";
import {CalendarMode} from "../types";
import {FilterTaskStatuses} from "../Modes/DayCalendar/EventFilter";

export interface CalendarHeaderAddButtonProps {
	current: CalendarMode,
	statuses: FilterTaskStatuses,
	onAddTask?: () => void,
}

export const CalendarHeaderAddButton: FC<CalendarHeaderAddButtonProps> = ({current, statuses, onAddTask}) => {
	const navigate = useSearchNavigate()
	
	const items = useMemo(() => {
		return [
			{
				title: 'Добавить событие',
				onClick() {
					onAddTask && onAddTask()
				}
			},
			{
				title: 'Создать новый календарь',
				onClick() {
					navigate(`/calendar/${current.layout}/${statuses}/calendar`)
				}
			}
		]
		
	}, [current.layout, statuses])
	
	return (
		<DropDown
			dropDownChildren={(methods) => (
				<SelectListContainer>
					{items.map((item) => (
						<SelectItemContainer
							onClick={() => {
								item.onClick()
								methods.focusOut()
							}}
						>
							{item.title}
						</SelectItemContainer>
					))}
				</SelectListContainer>
			)}
			renderElement={({ref, onElementFocused, onElementBlur}) => (
				<EmptyButtonStyled
					style={{padding: '2px'}}
					ref={ref as RefObject<HTMLButtonElement>}
					onFocus={onElementFocused}
					onBlur={onElementBlur}
				>
					<PlusIcon size={30}/>
				</EmptyButtonStyled>
			)}
		/>
	)
}