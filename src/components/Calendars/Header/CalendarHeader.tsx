import {FC, RefObject, useCallback, useMemo} from 'react'
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
import {DropDownButton} from "../../Buttons/DropDownButton";
import {EmptyButtonStyled} from '../../Buttons/EmptyButton.styled'
import {BurgerIcon, PencilIcon, PlusIcon, WaitIcon} from "../../Icons/Icons";
import {DropDown} from "../../Dropdown/DropDown";
import {SelectListContainer} from "../../Input/SelectInput/SelectListContainer";
import {SelectItemContainer} from "../../Input/SelectInput/SelectItemContainer";
import {useAppSelector} from "../../../store/hooks/hooks";
import {EventIcon} from "../../Icons/EventIcon";
import {UrlIcon} from "../../Icons/SocialNetworkIcons";
import {currentColor, defaultColor} from "../../../common/constants";


export const CalendarHeader: FC<CalendarHeaderProps> = ({
																													renderWeekPattern
																												}) => {
	const {layout} = useParams<{ layout?: CalendarMode['layout'] }>()
	const {current, onChangeCurrent, onAddTask, addTaskDate} = useCalendar()
	const {statuses} = useAppSelector(state => state.calendar)
	
	const title: string = useMemo(() => {
		return getCalendarTitle(current)
	}, [current])
	
	const navigate = useNavigate()
	
	const onChangeCurrentHandler = useCallback((pattern: ShortChangeCurrentPattern = 'today') => {
		onChangeCurrent && onChangeCurrent(changeCurrentModeHandler(current, pattern), current.layout)
	}, [current, onChangeCurrent])
	
	const onChangeCurrentLayoutHandler = useCallback((newLayout: CalendarMode["layout"]) => {
		navigate(`/calendar/${newLayout}/${statuses}`, {replace: true})
		onChangeCurrent && onChangeCurrent(new Date(), newLayout)
	}, [statuses])
	
	const addTaskHandler = useCallback(() => {
		if (current.layout !== 'day') {
			return onAddTask(new Date())
		}
		
		return onAddTask(current.date)
	}, [current, addTaskDate])
	
	return (
		<CalendarHeaderContainer>
			<FlexBlock width={'100%'} justify={'space-between'}>
				<FlexBlock justify={'flex-start'} align={'center'} gap={12}>
					<CalendarTitle>
						{title}
					</CalendarTitle>
					<DropDown
						//TODO Вынести DropDown с элементами управления в отдельный компонент
						dropDownChildren={(methods) => (
							<SelectListContainer>
								<SelectItemContainer onClick={() => {
									addTaskHandler()
									methods.focusOut()
								}}>
									Добавить событие
								</SelectItemContainer>
								<SelectItemContainer
									onClick={() => navigate(`/calendar/${current.layout}/${statuses}/calendar`)}
								>
									Создать новый календарь
								</SelectItemContainer>
							</SelectListContainer>
						)}
						renderElement={({ref, onElementFocused, onElementBlur}) => (
							<EmptyButtonStyled
								style={{padding: '2px'}}
								ref={ref as RefObject<HTMLButtonElement>}
								onFocus={onElementFocused}
								onBlur={onElementBlur}
							>
								<PlusIcon size={30}/>
							</EmptyButtonStyled>
						)}
					/>
				</FlexBlock>
				<FlexBlock justify={'flex-end'} gap={6}>
					<EmptyButtonStyled>
						<FlexBlock justify={'flex-start'} gap={4} align={'center'}>
							<WaitIcon size={15} color={defaultColor}/>
							<FlexBlock>
								Поиск событий (Dev)
							</FlexBlock>
						</FlexBlock>
					</EmptyButtonStyled>
					<EmptyButtonStyled>
						<FlexBlock justify={'flex-start'} gap={4} align={'center'}>
							<WaitIcon size={15} color={defaultColor}/>
							<FlexBlock>
								Массовое редактирование (Dev)
							</FlexBlock>
						</FlexBlock>
					</EmptyButtonStyled>
					<EmptyButtonStyled>
						<FlexBlock justify={'flex-start'} gap={4} align={'center'}>
							<WaitIcon size={15} color={defaultColor}/>
							<FlexBlock>
								Настройки (Dev)
							</FlexBlock>
						</FlexBlock>
					</EmptyButtonStyled>
				</FlexBlock>
			
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
