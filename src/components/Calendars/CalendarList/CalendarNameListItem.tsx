import {FlexBlock} from "../../LayoutComponents/FlexBlock"
import {CalendarNameCheckbox} from "./CalendarList.styled"
import {FC, useCallback, useState} from "react";
import {LoaderIcon, TrashIcon} from "../../Icons/Icons";
import {defaultColor} from "../../../common/constants";
import {EmptyButtonStyled} from "../../Buttons/EmptyButton.styled";
import styled from "styled-components";
import {useChangeSelectCalendarMutation} from "../../../store/api/taskApi/taskApi";

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
	isDisabled?: boolean,
	onDelete?: (item: CalendarNameItem) => void,
	onSuccessChangeSelect?: () => Promise<void>
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
																																			onDelete,
																																			onSuccessChangeSelect
																																		}) => {
	const [isHover, setIsHover] = useState(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [changeSelect] = useChangeSelectCalendarMutation()
	
	const changeHandler = async (isChecked: boolean) => {
		console.log(isChecked)
		setIsLoading(true)
		await changeSelect({
			id: item._id,
			state: isChecked
		})
			.unwrap()
			.catch(() => setIsLoading(false))
			.then(async () => {
					if (onSuccessChangeSelect) {
						await onSuccessChangeSelect()
							.finally(() => setIsLoading(false))
					} else {
						setIsLoading(false)
					}
				}
			)
	}
	
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
							onChange={(e) => changeHandler(e.target.checked)}
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