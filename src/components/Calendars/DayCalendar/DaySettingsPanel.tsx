import {FC, useCallback, useMemo} from 'react'
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
import {GetTaskSchemeRequest, useGetTaskSchemeQuery} from "../../../store/api/taskApi";
import {getTaskSchemeScope} from "../../../common/calendarSupport/scopes";


export const DaySettingsPanel: FC<DaySettingsPanelProps> = ({
																															dateItem,
																															date,
																															onSelectDate,
																															taskStorage,
																															onAddTask,
																														}) => {
	
	const datesForScheme: GetTaskSchemeRequest = useMemo(() => {
		const {month, year} = dateItem.settingPanel.monthCurrent
		const d = dayjs().set('year', year).set('month', month).toDate()
		return getTaskSchemeScope(d, 'month', false)
	}, [dateItem.settingPanel.monthCurrent])
	
	const {
		data: taskScheme,
		isLoading: isLoadingTaskScheme,
		isFetching: isFetchingTaskScheme,
		refetch: refetchTaskScheme,
		isError
	} = useGetTaskSchemeQuery(datesForScheme, {refetchOnMountOrArgChange: true})
	
	const buttonClickHandler = useCallback(() => {
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
	}, [date])
	
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
				<Button onClick={buttonClickHandler}>
					Добавить событие
				</Button>
			</FlexBlock>
			<FlexBlock minHeight={200}>
				<SmallMonthCalendar
					includesTasks={taskScheme}
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
			</FlexBlock>
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
