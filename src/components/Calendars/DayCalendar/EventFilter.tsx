import React, {FC} from 'react'
import {CalendarPriorityKeys} from '../types'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {SelectPriorityInput} from '../../Input/SelectInput/CalendarSelectInputs/SelectPriorityInput'
import {TextInput} from '../../Input/TextInput/TextInput'
import {DatePicker} from '../DatePicker/DatePicker'
import {DayTaskListFilters} from "./TaskList/DayTaskList";
import dayjs from "dayjs";
import {disabledColor} from "../../../common/constants";
import {SwitchCalendarModeTab} from "../Calendar.styled";

interface EventFilterProps extends FormHandle {
	currentDay: Date,
}

interface FormHandle {
	values: DayTaskListFilters,
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

type OnFocusEventHandlers = (fieldName: keyof DayTaskListFilters, e: React.FocusEvent<HTMLInputElement>) => void

export type FilterTaskStatuses = 'in_work' | 'completed' | 'archive'

interface DayTaskListTabObject {
	title: string,
	key: FilterTaskStatuses,
}

const dayTaskListTabsArray: Array<DayTaskListTabObject> = [
	{title: 'В работе', key: 'in_work'},
	{title: 'Выполнено', key: 'completed'},
	{title: 'Архив событий', key: 'archive'}
]


export const EventFilter: FC<EventFilterProps> = ({
																										currentDay,
																										values,
																										onChangeHandlers,
																										onFocusHandlers
																									}) => {
	return (
		<FlexBlock
			width={'100%'}
			gap={12}
			position={'relative'}
			direction={'column'}
		>
			<FlexBlock direction={'row'} gap={6}>
				<FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
					<DatePicker
						currentDate={values.start || dayjs().startOf('date').toDate()}
						onChange={onChangeHandlers.start}
						onFocus={(e) => onFocusHandlers && onFocusHandlers('start', e)}
						label={'Начинается не раньше, чем:'}
					/>
				</FlexBlock>
				<FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
					<DatePicker
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
					/>
				</FlexBlock>
				<FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
					<TextInput
						value={values.title || ''}
						onChange={(e) => onChangeHandlers.title(e.target.value)}
						onFocus={(e) => onFocusHandlers && onFocusHandlers('title', e)}
						label={'Название события'}
					/>
				</FlexBlock>
			</FlexBlock>
			<FlexBlock borderBottom={`1px solid ${disabledColor}`} justify={'flex-start'} align={'flex-end'}>
				{dayTaskListTabsArray.map((item) => (
					<SwitchCalendarModeTab
						key={item.key}
						onClick={() => onChangeHandlers.taskStatus(item.key)}
						isSelected={item.key === values.taskStatus}
					>
						{item.title}
					</SwitchCalendarModeTab>
				))}
			</FlexBlock>
		</FlexBlock>
	)
}
