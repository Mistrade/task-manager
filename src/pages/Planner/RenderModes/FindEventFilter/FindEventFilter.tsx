import React, {FC} from 'react'
import {FlexBlock} from '../../../../components/LayoutComponents/FlexBlock'
import {SelectPriorityInput} from '../../../../components/Input/SelectInput/CalendarSelectInputs/SelectPriorityInput'
import {TextInput} from '../../../../components/Input/TextInput/TextInput'
import {TaskListEventFiltersContainer} from '../DayCalendar/TaskList/TaskList.styled'
import {Switcher} from "../../../../components/Switcher/Switcher";
import {useAppSelector} from "../../../../store/hooks/hooks";
import {IFindEventFilterProps} from "./find-event-filters.types";
import {defaultColor, TaskStatusesList} from "../../../../common/constants";
import {Tooltip} from "../../../../components/Tooltip/Tooltip";
import {EmptyButtonStyled} from '../../../../components/Buttons/EmptyButton.styled'
import {FiltersIcon, SettingsIcon} from "../../../../components/Icons/Icons";
import {Checkbox} from "../../../../components/Input/Checkbox/Checkbox";
import {Button} from '../../../../components/Buttons/Buttons.styled'


export const FindEventFilter: FC<IFindEventFilterProps> = ({
																														 values,
																														 onChangeHandlers,
																														 onFocusHandlers,
																														 statusBadges,
																														 isLoading
																													 }) => {
	const {statuses} = useAppSelector(state => state.planner)
	
	return (
		<TaskListEventFiltersContainer>
			<FlexBlock
				width={'100%'}
				gap={2}
				position={'relative'}
				direction={'column'}
			>
				<Switcher
					isLoading={isLoading}
					switchersList={TaskStatusesList}
					onClick={(item) => onChangeHandlers.taskStatus(item.type)}
					selected={statuses}
					badges={statusBadges}
				>
					<Tooltip
						theme={'light'}
						trigger={'click'}
						interactive={true}
						interactiveBorder={10}
						arrow={false}
						hideOnClick={true}
						placement={'bottom-end'}
						content={
							<FlexBlock width={280} height={300} justify={'center'} align={'center'}>
								<span style={{color: defaultColor, fontSize: 15}}>
									Раздел в разработке
								</span>
							</FlexBlock>
						}
					>
						<FlexBlock p={4}>
							<EmptyButtonStyled>
								<FlexBlock gap={6} align={'center'}>
									Настройки
									<SettingsIcon size={24}/>
								</FlexBlock>
							</EmptyButtonStyled>
						</FlexBlock>
					</Tooltip>
					<Tooltip
						maxWidth={300}
						content={
							<FlexBlock direction={'column'} gap={12} width={280} p={'12px 4px 6px 4px'}>
								<TextInput
									value={values.title || ''}
									onChange={(e) => onChangeHandlers.title(e.target.value)}
									onFocus={(e) => onFocusHandlers && onFocusHandlers('title', e)}
									label={'Название'}
									placeholder={'Найдем совпадения по названию'}
								/>
								<SelectPriorityInput
									useClearItem={true}
									selected={values.priority || null}
									onChange={onChangeHandlers.priority}
									onFocus={(e) => onFocusHandlers && onFocusHandlers('priority', e)}
									label={'Приоритет'}
									placeholder={'Приоритет сужает поиск'}
								/>
								<Checkbox
									type={'checkbox'}
									title={'(D) Скрыть события с участниками'}
									id={'events-with-members-filter'}
									iconProps={{
										size: 20
									}}
								/>
								<Checkbox
									type={'checkbox'}
									title={'(D) Только сквозные события'}
									id={'events-with-members-filter'}
									iconProps={{
										size: 20
									}}
								/>
								<FlexBlock width={'100%'} justify={'center'} align={'center'}>
									<Button type={'button'}>
										Очистить фильтры
									</Button>
								</FlexBlock>
							</FlexBlock>
						}
						trigger={'click'}
						hideOnClick={true}
						theme={'light'}
						interactiveBorder={10}
						interactive={true}
						arrow={false}
						placement={'bottom-end'}
					>
						<FlexBlock p={4}>
							<EmptyButtonStyled>
								<FlexBlock gap={6} align={'center'}>
									Фильтры
									<FiltersIcon size={24}/>
								</FlexBlock>
							</EmptyButtonStyled>
						</FlexBlock>
					</Tooltip>
				</Switcher>
			</FlexBlock>
		</TaskListEventFiltersContainer>
	)
}
