import {FlexBlock} from "../../LayoutComponents/FlexBlock"
import {CalendarNameCheckbox} from "./CalendarList.styled"
import {FC, useState} from "react";
import {LoaderIcon, TrashIcon} from "../../Icons/Icons";
import {defaultColor} from "../../../common/constants";
import {EmptyButtonStyled} from "../../Buttons/EmptyButton.styled";
import styled from "styled-components";

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
	isDisabled?: boolean,
	onDelete?: (item: CalendarNameItem) => void,
}

const Label = styled('label')`
	width: 100%;
  gap: 6px;
  overflow: hidden;
  white-space: break-spaces;
  word-wrap: unset;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const CalendarNameListItem: FC<CalendarNameListItemProps> = ({
																																			onChange,
																																			isChecked,
																																			item,
																																			isDisabled,
																																			isLoading,
																																			onDelete
																																		}) => {
	const [isHover, setIsHover] = useState(false)
	
	return (
		<li onMouseEnter={() => onDelete && setIsHover(true)} onMouseLeave={() => onDelete && setIsHover(false)}>
			<FlexBlock width={'100%'} gap={2} justify={'space-between'}>
				<FlexBlock shrink={1} grow={0} gap={6}>
					{isLoading ? (
						<LoaderIcon size={18} color={item.color}/>
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
					<Label htmlFor={item._id}>{item.title}</Label>
				</FlexBlock>
				{isHover && item.deletable && onDelete && (
					<FlexBlock shrink={0} grow={0}>
						<EmptyButtonStyled style={{padding: 2}} onClick={() => onDelete(item)}>
							<TrashIcon size={14} color={defaultColor}/>
						</EmptyButtonStyled>
					</FlexBlock>
				)}
			</FlexBlock>
		</li>
	)
}