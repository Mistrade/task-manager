import {FC, ReactNode} from "react";
import {FlexBlock} from "../../../../../../components/LayoutComponents/FlexBlock";
import {CalendarUserIndicator} from "../../../../Users/UserIndicator";
import dayjs from "dayjs";
import {
	borderRadiusSize,
	currentColor,
	darkColor,
	DATE_HOURS_MINUTES_SECONDS_FORMAT,
	disabledColor
} from "../../../../../../common/constants";
import {css} from "styled-components";
import {DateHelper} from "../../../../../../common/calendarSupport/dateHelper";
import {UserModel} from "../../../../../../store/api/session-api/session-api.types";

export interface TaskHistoryItemProps {
	user: UserModel | null,
	date: Date,
	description: string,
	children: ReactNode
}

export const getDateDescription = (date: Date, withTime: boolean = true): string => {
	const d = dayjs(date)
	
	const formattedHours = d.format(DATE_HOURS_MINUTES_SECONDS_FORMAT)
	
	const diffMinutes = Math.abs(d.diff(dayjs(), 'minute'))
	
	if (diffMinutes < 2) {
		return `Менее 2 минут назад`
	}
	
	if (diffMinutes < 60) {
		if (diffMinutes <= 20 && diffMinutes >= 5) {
			return `${diffMinutes} минут назад`
		}
		
		const divisionRemainder = diffMinutes % 10
		
		
		if (divisionRemainder === 1) {
			return `${diffMinutes} минуту назад`
		}
		
		if (divisionRemainder >= 2 && divisionRemainder <= 4) {
			return `${diffMinutes} минуты назад`
		}
		
		return `${diffMinutes} минут назад`
	}
	
	if (d.isTomorrow()) {
		return `Завтра в ${formattedHours}`
	}
	
	if (d.isToday()) {
		return `Сегодня в ${formattedHours}`
	}
	
	if (d.isYesterday()) {
		return `Вчера в ${formattedHours}`
	}
	
	return DateHelper.getHumanizeDateValue(d.toDate(), {withTime, monthPattern: 'full'})
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
				{getDateDescription(date)}
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
						<CalendarUserIndicator name={user?.name || "Пользователь"} surname={user?.surname || "Не найден"}
																	 id={user?._id}/>
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