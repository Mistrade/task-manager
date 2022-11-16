import React, {FC} from "react";
import {IconProps} from "../Icons";
import {FlexBlock, FlexBlockProps} from "../../LayoutComponents/FlexBlock";
import {currentColor} from "../../../common/constants";

export const LogoutIcon: FC<IconProps & FlexBlockProps> = ({
																														 size = 24,
																														 color = currentColor,
																														 ...props
																													 }) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} preserveAspectRatio="xMidYMid meet"
					 viewBox="0 0 24 24">
				<path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							d="m19 12l-4-4m4 4l-4 4m4-4H9m5 9a9 9 0 1 1 0-18"/>
			</svg>
		</FlexBlock>
	)
}
