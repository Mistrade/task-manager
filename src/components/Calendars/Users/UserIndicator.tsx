import {FC, useState} from "react";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {currentColor, defaultColor, hoverColor} from "../../../common/constants";
import {EmptyButtonStyled} from "../../Buttons/EmptyButton.styled";
import {useSearchNavigate} from "../../../hooks/useSearchNavigate";
import {Modal} from "../../Modal/Modal";

interface CalendarUserIndicator {
	name: string,
	surname: string,
	id: string
}

export const CalendarUserIndicator: FC<CalendarUserIndicator> = ({name, surname}) => {
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		<EmptyButtonStyled
			onClick={(e) => {
				e.stopPropagation()
			}}
			style={{padding: '4px 2px'}}
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
			<Modal isView={isOpen}/>
		</EmptyButtonStyled>
	)
}