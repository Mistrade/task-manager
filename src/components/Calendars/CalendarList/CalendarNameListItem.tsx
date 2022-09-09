import {FlexBlock} from "../../LayoutComponents/FlexBlock"
import {CalendarNameCheckbox} from "./CalendarList.styled"
import {FC} from "react";
import {LoaderIcon} from "../../Icons/Icons";

export interface CalendarNameItem {
	_id: string,
	title: string,
	color: string,
	isSelected: boolean,
	deletable: boolean,
	editable: boolean
}

interface CalendarNameListItemProps {
	onChange?: (checked: boolean) => void,
	item: CalendarNameItem,
	isChecked: boolean,
	isLoading?: boolean,
	isDisabled?: boolean
}

export const CalendarNameListItem: FC<CalendarNameListItemProps> = ({
																																			onChange,
																																			isChecked,
																																			item,
																																			isDisabled,
																																			isLoading
																																		}) => {
	return (
		<li>
			<FlexBlock width={'100%'} gap={6}>
				{isLoading ? (
					<LoaderIcon size={22} color={item.color}/>
				) : (
					<CalendarNameCheckbox
						type={'checkbox'}
						id={item._id}
						color={item.color}
						disabled={isDisabled}
						checked={isChecked}
						onChange={(e) => onChange && onChange(e.target.checked)}
					/>
				)}
				<label htmlFor={item._id} style={{display: 'flex', gap: 6}}>{item.title}</label>
			</FlexBlock>
		</li>
	)
}