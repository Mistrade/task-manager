import {FC, useState} from "react";
import {FlexBlock} from "../../../components/LayoutComponents/FlexBlock";
import {currentColor} from "../../../common/constants";
import {EmptyButtonStyled} from "../../../components/Buttons/EmptyButton.styled";
import {UserAvatar} from "./UserAvatar";

interface CalendarUserIndicator {
	name: string,
	surname: string,
	id?: string,
	onClick?: (id: string) => void
}

export const CalendarUserIndicator: FC<CalendarUserIndicator> = ({name, surname, id, onClick}) => {
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		<EmptyButtonStyled
			onClick={(e) => {
				e.stopPropagation()
				onClick && id && onClick(id)
			}}
			style={{padding: '6px 4px', width: '100%'}}
		>
			<FlexBlock direction={'row'} gap={8} width={'100%'} align={'center'}>
				<UserAvatar
					user={{name, surname}}
				/>
				<FlexBlock direction={'column'}>
					<FlexBlock>
						{name}
					</FlexBlock>
					<FlexBlock>
						{surname}
					</FlexBlock>
				</FlexBlock>
			</FlexBlock>
		</EmptyButtonStyled>
	)
}