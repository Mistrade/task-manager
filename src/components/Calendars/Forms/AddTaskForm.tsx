import {FC, useEffect} from 'react'
import {CalendarItem, CalendarTaskItem} from '../types'
import {useFormik} from 'formik'
import dayjs from 'dayjs'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {TextInput} from '../../Input/TextInput'
import {SelectPriorityInput} from '../../Input/SelectInput/CalendarSelectInputs/SelectPriorityInput'
import {SelectBooleanInput} from '../../Input/SelectInput/SelectBooleanInput'
import {
	currentColor,
	defaultColor,
	getHumanizeDateValue,
	hoverColor,
	PRIORITY_TITLES,
	TASK_STATUSES
} from '../../../common/constants'
import {SelectInput} from '../../Input/SelectInput/SelectInput'
import {DatePickerPaper} from '../DatePicker/DatePickerPaper'
import {SelectListContainer} from '../../Input/SelectInput/SelectListContainer'
import * as yup from 'yup'
import {CompleteIcon, CreatedIcon} from '../../Icons/Icons'
import {Button, StyledButton} from '../../Buttons/Buttons.styled'
import {SelectLinks} from '../../Input/SelectInput/CalendarSelectInputs/SelectLinks'
import {Tooltip} from '../../Tooltip/Tooltip'
import {useAddTaskMutation} from "../../../store/api";

interface AddTaskFormProps {
	onComplete?: (data: CalendarTaskItem) => void,
	date: CalendarItem | null,
	onCancel?: (data: CalendarTaskItem) => void
}


const addTaskValidationSchema = yup.object({
	title: yup.string()
		.min(3, 'Заголовок не может быть короче 3 символов')
		.max(100, 'Постарайтесь более коротко изложить суть события')
		.required('Заголовок обязателен для заполнения'),
	time: yup.date().required('Время начала события обязательно для заполнения'),
	timeEnd: yup.date()
		.min(
			yup.ref('time'),
			'Время завершения должно быть позже начала события'
		)
		.required('Время завершения события обязательно для заполнения'),
	link: yup
		.object({
			key: yup.string(),
			value: yup.string().url('Ссылка должна быть корректным url-адресом').required()
		})
		.nullable()
		.notRequired(),
	priority: yup.string().oneOf(Object.keys(PRIORITY_TITLES)).required('Пожалуйста, выберите приоритет события'),
	status: yup.string().oneOf(Object.keys(TASK_STATUSES)).required('Пожалуйста, укажите статус события')
})

export const AddTaskForm: FC<AddTaskFormProps> = ({date, onComplete, onCancel}) => {
	const [addTask, {isLoading, status}] = useAddTaskMutation()
	const formik = useFormik<CalendarTaskItem>({
		async onSubmit(values) {
			console.log('onSubmit')
			await addTask(values).unwrap()
			onComplete && onComplete(values)
		},
		validationSchema: addTaskValidationSchema,
		initialValues: {
			id: '',
			title: '',
			linkedFrom: '',
			type: 'event',
			createdAt: '',
			description: '',
			status: 'created',
			members: [],
			time: date?.value || dayjs().toDate(),
			timeEnd: dayjs(date?.value).add(1, 'hour').toDate() || dayjs().add(1, 'hour').toDate(),
			priority: 'medium',
			link: null
		}
	})
	
	return (
		<form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
			<FlexBlock direction={'column'} p={'12px 20px 0px 20px'}>
				<TextInput
					inputId={'task__title'}
					tooltip={
						<Tooltip
							text={'Название отображается на доске заданий'}
							size={20}
						/>
					}
					containerProps={{mb: 12}}
					onChange={(e) => formik.setFieldValue('title', e.target.value)}
					onFocus={(e) => !formik.touched.title && formik.setFieldTouched('title', true)}
					errorMessage={formik.errors.title}
					isDirty={formik.touched.title}
					value={formik.values.title || ''}
					label={'Укажите название'}
					placeholder={'Позвонить заказчику'}
				/>
				<FlexBlock mb={12} wrap={'nowrap'} width={'100%'}>
					<SelectLinks
						inputId={'select__link'}
						tooltip={
							<Tooltip
								text={'Укажите ссылку, по которой любой участник события может подключиться в режиме онлайн'}
								size={20}
							/>
						}
						label={'Укажите ссылку на встречу'}
						onChange={(value) => {
							formik.setFieldValue('link', value)
						}}
					/>
				</FlexBlock>
				<SelectPriorityInput
					inputId={'task__priority'}
					tooltip={
						<Tooltip
							text={'Приоритет события обозначает важность его выполнения'}
							size={20}
						/>
					}
					containerProps={{mb: 12}}
					selected={formik.values.priority || 'medium'}
					onChange={(key) => formik.setFieldValue('priority' as keyof CalendarTaskItem, key as CalendarTaskItem['priority'])}
					onFocus={() => !formik.touched.priority && formik.setFieldTouched('priority', true)}
				/>
				<SelectBooleanInput
					containerProps={{mb: 12}}
					label={'Укажите статус'}
					inputId={'select_status'}
					data={Object.values(TASK_STATUSES)}
					selected={TASK_STATUSES[formik.values.status || 'created']}
					onChange={(data) => formik.setFieldValue('status', data.key)}
					onFocus={() => !formik.touched.status && formik.setFieldTouched('status', true)}
				/>
				<FlexBlock mb={12} gap={12} direction={'row'}>
					<SelectInput
						inputId={'start__date'}
						onFocus={() => !formik.touched.time && formik.setFieldTouched('time', true)}
						data={[]}
						renderData={() => (
							<SelectListContainer maxHeight={500} width={'200%'}>
								<DatePickerPaper
									disabledOptions={{min: new Date(), includeMin: true}}
									currentDate={formik.values.time || new Date()}
									onChange={(date) => {
										formik.setFieldValue('time', date)
										formik.setFieldValue('timeEnd', dayjs(date).add(1, 'hour').toDate())
									}}
								/>
							</SelectListContainer>
						)}
						value={getHumanizeDateValue(formik.values.time || date?.value || new Date())}
						label={'Выберите время начала'}
						containerProps={{flex: '1 0 calc(50% - 6px)', maxWidth: '50%'}}
						isDirty={!!formik.touched.time}
						errorMessage={`${formik.errors.time || ''}`}
						actionHandler={(action) => {
							let d = dayjs()
							if (action.actionKey !== '0') {
								d = d.add(+action.actionKey, 'minute')
							}
							formik.setFieldValue('time', d.toDate())
							return formik.setFieldValue('timeEnd', d.add(1, 'hour').toDate())
						}}
						readOnly={true}
						icon={<CreatedIcon size={20}/>}
						iconPlacement={'left'}
						actions={[
							{title: 'сейчас', actionKey: '0'},
							{title: 'через час', actionKey: '60'},
							{title: 'через 3 часа', actionKey: '180'}
						]}
					/>
					<SelectInput
						inputId={'end__date'}
						iconPlacement={'left'}
						data={[]}
						onFocus={() => !formik.touched.timeEnd && formik.setFieldTouched('timeEnd', true)}
						readOnly={true}
						renderData={() => (
							<SelectListContainer maxHeight={500} width={'200%'}>
								<DatePickerPaper
									disabledOptions={{min: formik.values.time || new Date(), includeMin: true}}
									currentDate={formik.values.timeEnd || dayjs(date?.value).add(30, 'minute').toDate() || dayjs().add(30, 'minute').toDate()}
									onChange={(date) => formik.setFieldValue('timeEnd', date)}
								/>
							</SelectListContainer>
						)}
						value={getHumanizeDateValue(formik.values.timeEnd || date?.value || new Date())}
						label={'Выберите время завершения'}
						containerProps={{flex: '1 0 calc(50% - 6px)', maxWidth: '50%'}}
						isDirty={!!formik.touched.timeEnd}
						errorMessage={`${formik.errors.timeEnd || ''}`}
						icon={<CompleteIcon size={20}/>}
						actionHandler={(action) => {
							let d = dayjs(formik.values.time)
							if (action.actionKey === 'all-day') {
								d = d.set('hour', 23).set('minute', 55)
								return formik.setFieldValue('timeEnd', d.toDate())
							}
							formik.setFieldValue('timeEnd', d.add(+action.actionKey, 'minute').toDate())
						}}
						actions={[
							{title: '30 мин', actionKey: '30'},
							{title: 'час', actionKey: '60'},
							{title: '6 часов', actionKey: (6 * 60).toString()},
							{title: '12 часов', actionKey: (12 * 60).toString()},
							{title: '1 день', actionKey: (24 * 60).toString()},
							{title: '3 дня', actionKey: (1440 * 3).toString()},
							{title: 'неделя', actionKey: (1440 * 7).toString()},
							{title: 'весь день', actionKey: 'all-day'}
						]}
					/>
				</FlexBlock>
				{formik.values.time.getDate() !== formik.values.timeEnd.getDate() && (
					<FlexBlock
						mb={12}
						justify={'flex-start'}
						width={'100%'}
						maxWidth={'100%'}
						borderRadius={4}
						p={16}
						border={`1px solid ${currentColor}`}
						bgColor={hoverColor}
					>
						Это событие будет создано в карточках нескольких дней, так как оно начинается и
						завершается в разные дни.
						<br/>
						Так происходит потому что мы стараемся показывать актуальную информацию на каждый день.
					</FlexBlock>
				)}
			</FlexBlock>
			<FlexBlock
				width={'100%'}
				justify={'flex-end'}
				align={'center'}
				pl={20}
				pr={20}
				pt={12}
				pb={12}
				gap={12}
				borderTop={`1px solid ${defaultColor}`}
			>
				<Button type={'submit'}>
					Добавить
				</Button>
				<Tooltip text={'Изменения не будут сохранены'} placement={'top'}>
					<StyledButton
						onClick={() => onCancel && onCancel(formik.values)}
						fillColor={'#fff'}
						textColor={defaultColor}
					>
						Отменить
					</StyledButton>
				</Tooltip>
			</FlexBlock>
		</form>
	)
}
