import React, {FC} from "react";
import {CalendarPriorityKeys} from "../../Calendars/types";
import {Arrow, BurgerIcon, CompleteIcon, DoubleArrow, IconProps, SadSmile} from "../Icons";
import {FlexBlockProps} from "../../LayoutComponents/FlexBlock";
import {currentColor, priorityColors} from "../../../common/constants";

interface PriorityCalendarIconProps extends IconProps, FlexBlockProps {
	priorityKey: CalendarPriorityKeys,
	isCompleted?: boolean
}

export const PriorityCalendarIcon: FC<PriorityCalendarIconProps> = ({
																																																																priorityKey,
																																																																isCompleted,
																																																																...props
																																																															}) => {
	
	if (isCompleted) {
		return <CompleteIcon size={20} {...props}/>
	}
	
	switch (priorityKey) {
		case 'veryHigh':
			return <DoubleArrow size={20} color={priorityColors.veryHigh} {...props} transform={'rotate(-90deg)'}/>
		case 'high':
			return <Arrow size={20} color={priorityColors.high}  {...props} transform={'rotate(-90deg)'}/>
		case 'medium':
			return <BurgerIcon size={20} {...props}/>
		case 'low':
			return <Arrow size={20} color={priorityColors.low}  {...props} transform={'rotate(90deg)'}/>
		case 'veryLow':
			return <DoubleArrow size={20} color={priorityColors.veryLow}  {...props} transform={'rotate(90deg)'}/>
		case 'not_selected':
			return <SadSmile size={20} color={currentColor} {...props}/>
	}
	
	return <></>
}