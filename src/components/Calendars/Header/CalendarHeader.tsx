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


export const CalendarHeader: FC<CalendarHeaderProps> = ({
																													current,
																													onChangeCurrent,
																													renderWeekPattern
																												}) => {
	const title: string = useMemo(() => {
		return getCalendarTitle(current)
	}, [current])
	const navigate = useNavigate()
	const onChangeCurrentHandler = useCallback((pattern: ShortChangeCurrentPattern = 'today') => {
		onChangeCurrent && onChangeCurrent(changeCurrentModeHandler(current, pattern), current.layout)
	}, [current, onChangeCurrent])
	
	// const onChangeCurrentLayoutHandler = useCallback( ( newLayout: CalendarMode['layout'] ) => {
	//   onChangeCurrent && onChangeCurrent( new Date(), newLayout )
	// }, [current, onChangeCurrent] )
	
	const onChangeCurrentLayoutHandler = useCallback((newLayout: CalendarMode["layout"]) => {
		navigate(`/calendar/${newLayout}`, {replace: true})
		onChangeCurrent && onChangeCurrent(new Date(), newLayout)
	}, [])
	
	
	return (
		<FlexBlock
			className={'Calendar__header'}
			direction={'column'}
			width={'100%'}
			maxHeight={120}
			minHeight={70}
			pb={8}
			pt={8}
			bgColor={'#fff'}
		>
			<FlexBlock
				width={'100%'}
				justify={'space-between'}
				align={'center'}
				mb={8}
			>
				<FlexBlock flex={'0 0 33.3%'} justify={'flex-start'} align={'center'}>
					<Tooltip
						text={'Текущий выбранный период дат, нажмите чтобы перейти к "Сегодня"'}
						placement={'top'}
					>
						<CalendarTitle onClick={() => onChangeCurrentHandler('today')}>
							{title}
						</CalendarTitle>
					</Tooltip>
				</FlexBlock>
				<FlexBlock flex={'1 1 33.3%'} maxWidth={400} justify={'center'} align={'center'}>
					<CalendarModeSwitchers
						current={current}
						onChange={onChangeCurrentLayoutHandler}
					/>
				</FlexBlock>
				<FlexBlock flex={'1 0 33.3%'} justify={'flex-end'} align={'center'}>
					<CalendarTodaySwitchers
						onChange={onChangeCurrentHandler}
					/>
				</FlexBlock>
			</FlexBlock>
			<CalendarHeaderWeekList renderWeekPattern={renderWeekPattern} current={current}/>
		</FlexBlock>
	)
}
