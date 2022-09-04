import {FlexBlock} from "../../LayoutComponents/FlexBlock"
import {CalendarNameCheckbox} from "./CalendarList.styled"
import {FC} from "react";

export interface CalendarNameItem {
	id: string,
	title: string,
	color: string
}

interface CalendarNameListItemProps {
	onChange?: (checked: boolean) => void,
	item: CalendarNameItem,
	isChecked: boolean
}

export const CalendarNameListItem: FC<CalendarNameListItemProps> = ({onChange, isChecked, item}) => {
	return (
		<li>
			<FlexBlock width={'100%'}>
				<CalendarNameCheckbox
					type={'checkbox'}
					id={item.id}
					color={item.color}
					checked={isChecked}
					onChange={(e) => onChange && onChange(e.target.checked)}
				/>
				<label htmlFor={item.id}>{item.title}</label>
			</FlexBlock>
		</li>
	)
}