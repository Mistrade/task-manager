import {currentColor, disabledColor, hoverColor} from "../../common/constants";
import {SwitchCalendarModeTab} from "../Calendars/Calendar.styled";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import React from "react";
import {Badge} from "../Badge/Badge";
import {ColorRing, InfinitySpin, ProgressBar, ThreeDots} from "react-loader-spinner";

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
	badges?: SwitcherBadges<T>,
	isLoading?: boolean
}

export function Switcher<T extends string = string>(props: SwitcherProps<T>) {
	return (
		<FlexBlock borderBottom={`1px solid ${disabledColor}`} height={'45px'} justify={'space-between'} align={'flex-end'}>
			<FlexBlock>
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
			<FlexBlock>
				{props.isLoading && (
					<ColorRing
						visible={true}
						height="45"
						width="45"
						ariaLabel="blocks-loading"
						wrapperStyle={{}}
						wrapperClass="blocks-wrapper"
						colors={[currentColor, currentColor, currentColor, currentColor, currentColor]}
					/>
				)}
			</FlexBlock>
		</FlexBlock>
	)
}