import {IconProps} from "../Icons/Icons";
import {FlexBlockProps} from "../LayoutComponents/FlexBlock";
import {FC} from "react";
import {currentColor} from "../../common/constants";
import {EmptyButtonStyled} from "./EmptyButton.styled";
import {AnswerIcon} from "../Icons/CalendarIcons/AnswerIcon";

export interface AnswerOnMessageButtonProps extends Omit<IconProps, 'onClick'> {
	iconContainerProps?: FlexBlockProps,
	onClick?: () => void
}

export const AnswerOnMessageButton: FC<AnswerOnMessageButtonProps> = ({
																																				iconContainerProps,
																																				onClick,
																																				size = 16,
																																				color = currentColor
																																			}) => {
	return (
		<EmptyButtonStyled
			onClick={onClick}
		>
			<AnswerIcon
				{...iconContainerProps}
				size={size}
				color={color}
			/>
		</EmptyButtonStyled>
	)
}