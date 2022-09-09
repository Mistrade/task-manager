import React, {FC} from "react";
import {IconProps} from "../Icons";
import {FlexBlockProps} from "../../LayoutComponents/FlexBlock";
import {CloseEyeIcon} from "./CloseEyeIcon";
import {OpenEyeIcon} from "./OpenEyeIcon";
import {Tooltip} from "../../Tooltip/Tooltip";

interface PasswordIconProps extends IconProps, FlexBlockProps {
	isOpen?: boolean,
	withTooltip?: boolean,
	tooltipMessage?: {
		open: string,
		close: string
	}
}

export const PasswordIcon: FC<PasswordIconProps> = ({
																											isOpen = false,
																											withTooltip = false,
																											tooltipMessage = {
																												open: 'Нажмите, чтобы скрыть пароль',
																												close: 'Нажмите, чтобы показать пароль'
																											},
																											...props
																										}) => {
	if (isOpen) {
		return withTooltip
			? (
				<Tooltip
					placement={'top'}
					text={tooltipMessage.open || 'Нажмите, чтобы скрыть пароль'}
				>
					<OpenEyeIcon {...props} />
				</Tooltip>
			)
			: <OpenEyeIcon {...props}/>
	}
	
	return withTooltip
		? (
			<Tooltip
				placement={'top'}
				text={tooltipMessage.close || 'Нажмите, чтобы показать пароль'}
			>
				<CloseEyeIcon {...props} />
			</Tooltip>
		)
		: <CloseEyeIcon{...props} />
}