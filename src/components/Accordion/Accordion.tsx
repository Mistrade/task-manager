import {FC, ReactNode, useState} from "react";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import {Arrow, IconProps} from "../Icons/Icons";
import {EmptyButtonStyled} from "../Buttons/EmptyButton.styled";
import {currentColor} from "../../common/constants";

export interface AccordionProps {
	title: ReactNode,
	children: ReactNode,
	initialState?: boolean,
	iconProps?: IconProps,
	zIndex?: number
}

export const Accordion: FC<AccordionProps> = ({title, zIndex, iconProps, children, initialState = true}) => {
	const [isOpen, setIsOpen] = useState(initialState)
	
	return (
		<FlexBlock
			width={'100%'}
			direction={'column'}
		>
			<FlexBlock
				direction={'row'}
				justify={'space-between'}
				gap={6}
				pl={6}
				pr={6}
				position={'sticky'}
				align={'center'}
				style={{top: 0, left: 0, zIndex: 3 * (zIndex || 1)}}
				bgColor={'#fff'}
			>
				<FlexBlock direction={'row'} gap={6} align={'center'} justify={'flex-end'}>
					<EmptyButtonStyled
						onClick={() => setIsOpen(prev => !prev)}
						style={{
							padding: 4,
							transition: `transform .3s ease-in`,
							transform: `rotate(${isOpen ? '90deg' : '0deg'})`
						}}
					>
						<Arrow color={currentColor} {...iconProps} />
					</EmptyButtonStyled>
				</FlexBlock>
				<FlexBlock direction={'row'} width={'100%'}>
					{title}
				</FlexBlock>
			</FlexBlock>
			<FlexBlock
				direction={'column'}
				width={'100%'}
				style={{height: isOpen ? "fit-content" : "0px", zIndex: 2 * (zIndex || 1)}}
				p={isOpen ? 6 : 0}
				overflow={isOpen ? 'unset' : 'hidden'}
			>
				{children}
			</FlexBlock>
		</FlexBlock>
	)
}