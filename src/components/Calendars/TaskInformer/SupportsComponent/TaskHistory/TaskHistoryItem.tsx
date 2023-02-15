import {FC, ReactNode} from "react";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {CalendarUserIndicator} from "../../../Users/UserIndicator";
import {UserModelResponse} from "../../../../../store/api/taskApi/types";
import dayjs from "dayjs";
import {
	borderRadiusSize,
	currentColor,
	darkColor,
	DATE_HOURS_MINUTES_SECONDS_FORMAT,
	DATE_RENDER_FORMAT_WITH_SEC,
	disabledColor
} from "../../../../../common/constants";
import {css} from "styled-components";

export interface TaskHistoryItemProps {
	user: UserModelResponse,
	date: Date,
	description: string,
	children: ReactNode
}

export const getTaskHistoryItemHumanizeDate = (date: Date): string => {
	const d = dayjs(date)
	
	const formattedHours = d.format(DATE_HOURS_MINUTES_SECONDS_FORMAT)
	
	if (d.isToday()) {
		return `Сегодня, ${formattedHours}`
	}
	
	if (d.isYesterday()) {
		return `Вчера, ${formattedHours}`
	}
	
	return `${d.format(DATE_RENDER_FORMAT_WITH_SEC)}`
}

export const TaskHistoryItem: FC<TaskHistoryItemProps> = ({user, date, description, children}) => {
	
	return (
		<FlexBlock
			width={'100%'}
			direction={'column'}
			position={'relative'}
			gap={6}
		>
			<FlexBlock
				style={{color: currentColor}}
				fSize={18}
				position={'sticky'}
				pb={4}
				additionalCss={css`
          left: 0;
          top: 0;
          z-index: 1;
				`}
				bgColor={'#fff'}
			>
				{getTaskHistoryItemHumanizeDate(date)}
			</FlexBlock>
			<FlexBlock pl={24} width={'100%'}>
				<FlexBlock
					p={6}
					border={`1px solid ${disabledColor}`}
					direction={'row'}
					gap={12}
					align={'flex-start'}
					width={'100%'}
					borderRadius={borderRadiusSize.sm}
				>
					<FlexBlock minWidth={170} maxWidth={200}>
						<CalendarUserIndicator name={user.name} surname={user.surname} id={user._id}/>
					</FlexBlock>
					<FlexBlock direction={'column'} gap={12} width={'100%'}>
						<FlexBlock fSize={16} style={{color: darkColor}} fWeight={'bold'}>
							{description}
						</FlexBlock>
						<FlexBlock width={'100%'}>
							{children}
						</FlexBlock>
					</FlexBlock>
				</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}