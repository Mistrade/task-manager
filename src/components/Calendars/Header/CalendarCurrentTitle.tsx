import { FlexBlock } from "../../LayoutComponents/FlexBlock"
import {borderRadiusSize, currentColor, disabledColor} from "../../../common/constants";
import {CalendarHeaderAddButton, CalendarHeaderAddButtonProps} from "./CalendarHeaderAddButton";
import React, {FC} from "react";
import {CalendarTodaySwitchers} from "./CalendarTodaySwitchers";
import {css} from "styled-components";
import { CalendarTitle } from "../Calendar.styled";
import {CalendarTodaySwitchersProps} from "../types";

export interface CalendarCurrentTitleProps extends CalendarTodaySwitchersProps, CalendarHeaderAddButtonProps {
	title: string,
}

export const CalendarCurrentTitle: FC<CalendarCurrentTitleProps> = ({title, current, statuses, onAddTask, onChangeSwitcherState}) => {
	return (
		<FlexBlock
			additionalCss={css`z-index: 10`}
			direction={'column'}
			gap={4}
			border={`1px solid ${disabledColor}`}
			width={'100%'}
			borderRadius={borderRadiusSize.sm}
			pt={6}
			pb={6}
		>
			<FlexBlock justify={'center'} width={'100%'} p={`3px 12px`}>
				<CalendarHeaderAddButton
					current={current}
					statuses={statuses}
					onAddTask={onAddTask}
				/>
			</FlexBlock>
			<FlexBlock justify={'center'} width={'100%'} p={`3px 12px`} fSize={20}>
				<CalendarTitle>
					{title}
				</CalendarTitle>
			</FlexBlock>
			<FlexBlock justify={'center'} width={'100%'} p={`3px 12px`}>
				<CalendarTodaySwitchers
					onChangeSwitcherState={onChangeSwitcherState}
				/>
			</FlexBlock>
		</FlexBlock>
	)
}