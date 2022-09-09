import {FC, useCallback, useMemo} from 'react'
import {CalendarHeaderProps, CalendarMode} from '../types'
import {ShortChangeCurrentPattern} from '../../../common/commonTypes'
import {changeCurrentModeHandler, getCalendarTitle} from '../../../common/functions'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {CalendarTitle} from '../Calendar.styled'
import {CalendarModeSwitchers} from './CalendarModeSwitchers'
import {CalendarTodaySwitchers} from './CalendarTodaySwitchers'
import {useNavigate} from "react-router-dom";
import {useCalendar} from "../../../hooks/useCalendar";
import {useParams} from "react-router";
import {CalendarHeaderContainer} from "./CalendarHeader.styled";


export const CalendarHeader: FC<CalendarHeaderProps> = ({
																													renderWeekPattern
																												}) => {
	const {layout} = useParams<{ layout?: CalendarMode['layout'] }>()
	const {current, onChangeCurrent} = useCalendar()
	
	const title: string = useMemo(() => {
		return getCalendarTitle(current)
	}, [current])
	
	const navigate = useNavigate()
	
	const onChangeCurrentHandler = useCallback((pattern: ShortChangeCurrentPattern = 'today') => {
		onChangeCurrent && onChangeCurrent(changeCurrentModeHandler(current, pattern), current.layout)
	}, [current, onChangeCurrent])
	
	const onChangeCurrentLayoutHandler = useCallback((newLayout: CalendarMode["layout"]) => {
		navigate(`/calendar/${newLayout}`, {replace: true})
		onChangeCurrent && onChangeCurrent(new Date(), newLayout)
	}, [])
	
	
	return (
		<CalendarHeaderContainer>
			<FlexBlock width={'100%'} justify={'space-between'}>
				<CalendarTitle onClick={() => onChangeCurrentHandler('today')}>
					{title}
				</CalendarTitle>
				<CalendarTodaySwitchers
					onChange={onChangeCurrentHandler}
				/>
			</FlexBlock>
			<FlexBlock justify={'flex-start'}>
				
				<CalendarModeSwitchers
					layout={layout}
					onChange={onChangeCurrentLayoutHandler}
				/>
			</FlexBlock>
		
		</CalendarHeaderContainer>
	)
}
