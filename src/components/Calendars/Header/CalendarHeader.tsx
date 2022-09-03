import {FC, useCallback, useMemo} from 'react'
import {CalendarHeaderProps, CalendarMode} from '../types'
import {ShortChangeCurrentPattern} from '../../../common/commonTypes'
import {changeCurrentModeHandler, getCalendarTitle} from '../../../common/functions'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {CalendarTitle} from '../Calendar.styled'
import {CalendarModeSwitchers} from './CalendarModeSwitchers'
import {CalendarTodaySwitchers} from './CalendarTodaySwitchers'
import {CalendarHeaderWeekList} from './CalendarHeaderWeekList'
import {Tooltip} from '../../Tooltip/Tooltip'
import {useNavigate} from "react-router-dom";
import {disabledColor} from "../../../common/constants";
import {css} from "styled-components";
import {useCalendar} from "../../../hooks/useCalendar";
import {useParams} from "react-router";


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
		<FlexBlock
			className={'Calendar__header'}
			direction={'column'}
			width={'100%'}
			height={'fit-content'}
			maxHeight={200}
			flex={'1 0 auto'}
		>
			<FlexBlock
				width={'100%'}
				justify={'space-between'}
				align={'center'}
				mb={current.layout === 'day' || current.layout === 'year' ? 0 : 12}
			>
				<FlexBlock flex={'0 0 33.3%'} justify={'flex-start'} align={'center'}>
					<CalendarTitle onClick={() => onChangeCurrentHandler('today')}>
						{title}
					</CalendarTitle>
				</FlexBlock>
				<FlexBlock flex={'1 1 auto'} justify={'center'} align={'center'}>
					<CalendarModeSwitchers
						layout={layout}
						onChange={onChangeCurrentLayoutHandler}
					/>
					{/*<FlexBlock flex={'1 0 33.3%'} justify={'flex-end'} align={'center'}>*/}
					<CalendarTodaySwitchers
						onChange={onChangeCurrentHandler}
					/>
					{/*</FlexBlock>*/}
				</FlexBlock>
			</FlexBlock>
			<CalendarHeaderWeekList renderWeekPattern={renderWeekPattern} current={current}/>
		</FlexBlock>
	)
}
