import {FC, useCallback} from 'react'
import {CalendarHeaderProps, CalendarMode} from '../types'
import {ShortChangeCurrentPattern} from '../../../common/commonTypes'
import {changeCurrentModeHandler} from '../../../common/functions'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {CalendarModeSwitchers} from './CalendarModeSwitchers'
import {useCalendar} from "../../../hooks/useCalendar";
import {useParams} from "react-router";
import {CalendarHeaderContainer} from "./CalendarHeader.styled";
import {useAppSelector} from "../../../store/hooks/hooks";
import dayjs from "dayjs";
import {useSearchNavigate} from "../../../hooks/useSearchNavigate";


export const CalendarHeader: FC<CalendarHeaderProps> = ({
																													renderWeekPattern
																												}) => {
	const {layout} = useParams<{ layout?: CalendarMode['layout'] }>()
	const {current, onChangeCurrent, onAddTask, addTaskDate} = useCalendar()
	const {statuses} = useAppSelector(state => state.calendar)
	
	const navigate = useSearchNavigate()
	
	const onChangeCurrentHandler = useCallback((pattern: ShortChangeCurrentPattern = 'today') => {
		onChangeCurrent && onChangeCurrent(changeCurrentModeHandler(current, pattern), current.layout)
	}, [current, onChangeCurrent])
	
	const onChangeCurrentLayoutHandler = useCallback((newLayout: CalendarMode["layout"]) => {
		navigate(`/calendar/${newLayout}/${statuses}`, {replace: true})
		if (newLayout === 'list') {
			return onChangeCurrent && onChangeCurrent({
				layout: 'list',
				fromDate: dayjs().startOf('date').toDate(),
				toDate: dayjs().add(31, 'day').endOf('date').toDate()
			}, newLayout)
		}
		return onChangeCurrent && onChangeCurrent(new Date(), newLayout)
	}, [statuses])
	
	return (
		<CalendarHeaderContainer>
			<FlexBlock width={'100%'} justify={'space-between'}>
				<FlexBlock justify={'flex-start'} gap={6}>
					<FlexBlock justify={'flex-start'}>
						<CalendarModeSwitchers
							layout={layout}
							onChange={onChangeCurrentLayoutHandler}
						/>
					</FlexBlock>
				</FlexBlock>
				
			</FlexBlock>
			
		</CalendarHeaderContainer>
	)
}
