import React, {FC} from 'react'
import {CalendarPriorityKeys} from '../types'
import {FormikErrors} from 'formik'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {SelectPriorityInput} from '../../Input/SelectInput/CalendarSelectInputs/SelectPriorityInput'
import {TextInput} from '../../Input/TextInput'
import {DatePicker} from '../DatePicker/DatePicker'
import {DayTaskListFilters} from "./DayTaskList";

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
	title: (value: string) => void
}

type OnFocusEventHandlers = (fieldName: keyof DayTaskListFilters, e: React.FocusEvent<HTMLInputElement>) => void

export const EventFilter: FC<EventFilterProps> = ({
																										currentDay,
																										values,
																										onChangeHandlers,
																										onFocusHandlers
																									}) => {
	return (
		<FlexBlock
			width={'100%'}
			gap={6}
		>
			<FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
				<DatePicker
					currentDate={currentDay}
					value={values.start}
					onChange={onChangeHandlers.start}
					onFocus={(e) => onFocusHandlers && onFocusHandlers('start', e)}
					label={'Начинается не раньше, чем:'}
				/>
			</FlexBlock>
			<FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
				<DatePicker
					currentDate={currentDay}
					value={values.end}
					onChange={onChangeHandlers.end}
					onFocus={(e) => onFocusHandlers && onFocusHandlers('end', e)}
					label={'Заканчивается не позже, чем:'}
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
	)
}
