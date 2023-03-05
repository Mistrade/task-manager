import {FlexBlock} from "../../../components/LayoutComponents/FlexBlock"
import {CalendarItemLabel, GroupItemCheckbox} from "./GroupList.styled"
import {FC, useState} from "react";
import {LoaderIcon, PencilIcon, TrashIcon} from "../../../components/Icons/Icons";
import {defaultColor} from "../../../common/constants";
import {EmptyButtonStyled} from "../../../components/Buttons/EmptyButton.styled";
import {useChangeSelectGroupMutation} from "../../../store/api/planning-api";
import {GroupItemProps} from "./groups.types";

export const GroupItem: FC<GroupItemProps> = ({
																																			onChange,
																																			isChecked,
																																			item,
																																			isDisabled,
																																			onDelete,
																																			onSuccessChangeSelect,
																																			onEdit
																																		}) => {
	const [isHover, setIsHover] = useState(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [changeSelect] = useChangeSelectGroupMutation()
	
	const changeHandler = async (isChecked: boolean) => {
		setIsLoading(true)
		await changeSelect({
			groupId: item._id,
			state: isChecked
		})
			.unwrap()
			.catch(() => setIsLoading(false))
			.then(async () => {
					if (onSuccessChangeSelect) {
						await onSuccessChangeSelect()
							.then(() => setIsLoading(false))
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
						<GroupItemCheckbox
							type={'checkbox'}
							id={item._id}
							color={item.color}
							disabled={isDisabled}
							checked={isChecked}
							onChange={(e) => changeHandler(e.target.checked)}
						/>
					)}
					<CalendarItemLabel htmlFor={item._id}>{item.title}</CalendarItemLabel>
				</FlexBlock>
				{isHover && (
					<FlexBlock shrink={0} grow={0}>
						{item.editable && onEdit && (
							<EmptyButtonStyled style={{padding: 2}} onClick={() => onEdit(item._id)}>
								<PencilIcon size={14} color={defaultColor}/>
							</EmptyButtonStyled>
						)}
						{item.deletable && onDelete && (
							<EmptyButtonStyled style={{padding: 2}} onClick={() => onDelete(item)}>
								<TrashIcon size={14} color={defaultColor}/>
							</EmptyButtonStyled>
						)}
					</FlexBlock>
				)}
			</FlexBlock>
		</li>
	)
}