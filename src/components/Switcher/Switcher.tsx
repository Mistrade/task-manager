import {disabledColor} from "../../common/constants";
import {SwitchCalendarModeTab} from "../Calendars/Calendar.styled";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import React from "react";
import {Badge} from "../Badge/Badge";

export interface SwitcherItem<KEY> {
	title: string,
	key: KEY
}

export type SwitcherBadges<KEY extends string = string> = {
	[key in KEY]?: number
}

export interface SwitcherProps<T extends string = string> {
	switchersList: Array<SwitcherItem<T>>,
	onClick: (item: SwitcherItem<T>) => void,
	selected: T,
	badges?: SwitcherBadges<T>
}

export function Switcher<T extends string = string>(props: SwitcherProps<T>) {
	return (
		<FlexBlock borderBottom={`1px solid ${disabledColor}`} justify={'flex-start'} align={'flex-end'}>
			{props.switchersList.map((item) => (
				<SwitchCalendarModeTab
					key={item.key}
					onClick={() => props.onClick(item)}
					isSelected={item.key === props.selected}
				>
					<span>
					{item.title}
					</span>
					{(props.badges && props.badges[item.key] && props.badges[item.key] > 0) ? (
						<Badge
							style={{marginLeft: 4}}>{props.badges[item.key]}</Badge>
					) : <></>}
				</SwitchCalendarModeTab>
			))}
		</FlexBlock>
	)
}