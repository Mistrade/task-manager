import {FC} from 'react'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {disabledColor} from '../../../common/constants'
import {SmallMonthCalendar} from '../DatePicker/SmallMonthCalendar'
import {DaySettingsPanelProps} from '../types'
import {css} from 'styled-components'
import {Button} from '../../Buttons/Buttons.styled'
import {SmallCalendarMonthTitle} from '../DatePicker/SmallCalendarMonthTitle'
import dayjs from 'dayjs'
import {dateToCalendarItem} from '../../../common/calendarSupport/generators'
import {Tooltip} from '../../Tooltip/Tooltip'


export const DaySettingsPanel: FC<DaySettingsPanelProps> = ({
																															dateItem,
																															date,
																															onSelectDate,
																															taskStorage,
																															onAddTask
																														}) => {
	
	return (
		<FlexBlock
			borderRadius={4}
			direction={'column'}
			grow={0}
			pr={24}
			pt={24}
			align={'flex-end'}
			borderRight={`1px solid ${disabledColor}`}
			position={'relative'}
		>
			<FlexBlock
				width={'100%'}
				pb={24}
				justify={'flex-end'}
				bgColor={'#fff'}
				position={'sticky'}
				additionalCss={css`
          top: 0;
          left: 0;
          z-index: 1;
				`}
			>
				<Button onClick={() => {
					if (onAddTask && date) {
						const d = dayjs(date.value).isBefore(new Date(), 'date')
						if (d) {
							const newD = dayjs()
							
							const context = {
								month: newD.month(),
								year: newD.year()
							}
							
							const r = dateToCalendarItem(newD.toDate(), context)
							return onAddTask(r)
						}
						
						onAddTask && date && onAddTask(date)
					}
				}}>
					Добавить событие
				</Button>
			</FlexBlock>
			<SmallMonthCalendar
				monthItem={dateItem.settingPanel.monthItem}
				cellSize={25}
				title={
					<SmallCalendarMonthTitle
						monthItem={dateItem.settingPanel.monthItem}
					/>
				}
				taskStorage={taskStorage}
				currentDate={date?.value}
				onSelectDate={onSelectDate}
				current={dateItem.settingPanel.monthCurrent}
			/>
			<FlexBlock textAlign={'right'} mt={24} justify={'flex-end'} align={'flex-end'} width={'100%'}>
				<Tooltip
					text={`Рассчитано на основе текущего часового пояса: UTC${dayjs().utcOffset() >= 0 ? `+${dayjs().utcOffset() / 60}` : `-${dayjs().utcOffset() / 60}`}`}
					placement={'right'}
					children={`Часовой пояс:\n${dayjs.tz.guess()}`}
				/>
			
			</FlexBlock>
		</FlexBlock>
	)
}
