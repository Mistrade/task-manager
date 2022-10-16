import React, {FC} from 'react'
import {CalendarPriorityKeys} from '../../types'
import {FlexBlock} from '../../../LayoutComponents/FlexBlock'
import {SelectPriorityInput} from '../../../Input/SelectInput/CalendarSelectInputs/SelectPriorityInput'
import {TextInput} from '../../../Input/TextInput/TextInput'
import {DatePicker} from '../../DatePicker/DatePicker'
import {EventFilters} from "./TaskList/DayTaskList";
import dayjs from "dayjs";
import {disabledColor} from "../../../../common/constants";
import {SwitchCalendarModeTab} from "../../Calendar.styled";
import {TaskListEventFiltersContainer} from './TaskList/TaskList.styled'
import {Switcher, SwitcherBadges} from "../../../Switcher/Switcher";
import {useAppSelector} from "../../../../store/hooks/hooks";
import {CalendarStatusProxy} from "../../CalendarStatusProxy";

interface EventFilterProps extends FormHandle {
	statusBadges?: SwitcherBadges<FilterTaskStatuses>
}

interface FormHandle {
	values: EventFilters,
	onChangeHandlers: EventFilterOnChangeHandle,
	onFocusHandlers?: OnFocusEventHandlers
}

export interface EventFilterOnChangeHandle {
	start: (date: Date) => void,
	end: (date: Date) => void
	priority: (priority: CalendarPriorityKeys | null) => void,
	title: (value: string) => void,
	taskStatus: (value: FilterTaskStatuses) => void
}

type OnFocusEventHandlers = (fieldName: keyof EventFilters, e: React.FocusEvent<HTMLInputElement>) => void

export type FilterTaskStatuses = 'in_work' | 'completed' | 'archive' | "created"

interface DayTaskListTabObject {
	title: string,
	key: FilterTaskStatuses,
}

export const URLTaskStatuses: { [key in FilterTaskStatuses]: FilterTaskStatuses } = {
	created: 'created',
	in_work: 'in_work',
	completed: 'completed',
	archive: 'archive'
}

export const dayTaskListTabsArray: Array<DayTaskListTabObject> = [
	{title: 'Запланировано', key: URLTaskStatuses.created},
	{title: 'В работе', key: URLTaskStatuses.in_work},
	{title: 'Выполнено', key: URLTaskStatuses.completed},
	{title: 'Архив событий', key: URLTaskStatuses.archive}
]


export const EventFilter: FC<EventFilterProps> = ({
																										values,
																										onChangeHandlers,
																										onFocusHandlers,
																										statusBadges
																									}) => {
	const {statuses} = useAppSelector(state => state.calendar)
	
	return (
		<TaskListEventFiltersContainer>
			<FlexBlock
				width={'100%'}
				gap={12}
				position={'relative'}
				direction={'column'}
			>
				<FlexBlock direction={'row'} gap={6}>
					<FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
						<DatePicker
							useForceUpdateValue={true}
							currentDate={values.start || dayjs().startOf('date').toDate()}
							onChange={onChangeHandlers.start}
							onFocus={(e) => onFocusHandlers && onFocusHandlers('start', e)}
							label={'Начинается не раньше, чем:'}
						/>
					</FlexBlock>
					<FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
						<DatePicker
							useForceUpdateValue={true}
							currentDate={values.end || dayjs().endOf('date').toDate()}
							onChange={onChangeHandlers.end}
							onFocus={(e) => onFocusHandlers && onFocusHandlers('end', e)}
							label={'Начинается не позже, чем:'}
						/>
					</FlexBlock>
					<FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
						<SelectPriorityInput
							useClearItem={true}
							selected={values.priority}
							onChange={onChangeHandlers.priority}
							onFocus={(e) => onFocusHandlers && onFocusHandlers('priority', e)}
							label={'Приоритет события'}
							placeholder={'Приоритет сужает поиск событий'}
						/>
					</FlexBlock>
					<FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
						<TextInput
							value={values.title || ''}
							onChange={(e) => onChangeHandlers.title(e.target.value)}
							onFocus={(e) => onFocusHandlers && onFocusHandlers('title', e)}
							label={'Название события'}
							placeholder={'Найдем совпадения по названию'}
						/>
					</FlexBlock>
				</FlexBlock>
				<Switcher
					switchersList={dayTaskListTabsArray}
					onClick={(item) => onChangeHandlers.taskStatus(item.key)}
					selected={statuses}
					badges={statusBadges}
				/>
			</FlexBlock>
		</TaskListEventFiltersContainer>
	)
}
