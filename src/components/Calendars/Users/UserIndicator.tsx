import {FC, useState} from "react";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {currentColor} from "../../../common/constants";
import {EmptyButtonStyled} from "../../Buttons/EmptyButton.styled";

interface CalendarUserIndicator {
	name: string,
	surname: string,
	id: string,
	onClick?: (id: string) => void
}

export const CalendarUserIndicator: FC<CalendarUserIndicator> = ({name, surname, id, onClick}) => {
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		<EmptyButtonStyled
			onClick={(e) => {
				e.stopPropagation()
				onClick && onClick(id)
			}}
			style={{padding: '6px 4px', width: '100%'}}
		>
			<FlexBlock direction={'row'} gap={8} width={'100%'} align={'center'}>
				<FlexBlock
					borderRadius={'50%'}
					border={`2px solid ${currentColor}`}
					align={'center'}
					justify={'center'}
					fSize={18}
					width={45}
					height={45}
					bgColor={'transparent'}
				>
					{name.substring(0, 1).toUpperCase()}{surname.substring(0, 1).toUpperCase()}
				</FlexBlock>
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