import {StarIcon} from "../Icons/Icons";
import {EmptyButtonStyled} from "./EmptyButton.styled";
import React, {FC} from "react";
import {orangeColor} from "../../common/constants";

export interface LikeButtonProps {
	isChecked: boolean,
	id: string,
	onChange?: (isChecked: boolean) => void
}

export const LikeButton: FC<LikeButtonProps> = ({isChecked, id, onChange}) => {
	return (
		<EmptyButtonStyled
			style={{padding: 0}}
			onClick={(e) => {
				e.stopPropagation()
				onChange && onChange(!isChecked)
			}}
		>
			<StarIcon
				size={20}
				color={isChecked ? orangeColor : '#000'}
				fillColor={isChecked ? orangeColor : 'none'}
			/>
		</EmptyButtonStyled>
	)
}