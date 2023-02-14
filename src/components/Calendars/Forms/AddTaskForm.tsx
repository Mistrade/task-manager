import {FC, useEffect, useMemo} from 'react'
import {CalendarTaskItem} from '../types'
import {useFormik} from 'formik'
import dayjs from 'dayjs'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {TextInput} from '../../Input/TextInput/TextInput'
import {SelectPriorityInput} from '../../Input/SelectInput/CalendarSelectInputs/SelectPriorityInput'
import {SelectBooleanInput} from '../../Input/SelectInput/SelectBooleanInput'
import {
	borderRadiusSize,
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
import {Button, StyledButton, WhiteButton} from '../../Buttons/Buttons.styled'
import {SelectLinks} from '../../Input/SelectInput/CalendarSelectInputs/SelectLinks'
import {Tooltip} from '../../Tooltip/Tooltip'
import {MyServerResponse, useAddTaskMutation, useGetCalendarsQuery} from "../../../store/api/taskApi/taskApi";
import {TextAreaInput} from "../../Input/TextAreaInput/TextAreaInput";
import {CalendarNameItem} from "../CalendarList/CalendarNameListItem";
import {SelectItemContainer} from "../../Input/SelectInput/SelectItemContainer";
import {ObjectId} from "../../../store/api/taskApi/types";
import {toast} from "react-toastify";
import {Informer} from "../../Inform/Informer";
import {LinkStyled} from '../../Buttons/Link.styled'
import {EmptyButtonStyled} from '../../Buttons/EmptyButton.styled'

interface AddTaskFormProps {
	onComplete?: (data: CalendarTaskItem, taskId?: ObjectId) => void,
	date: Date | null,
	onCancel?: (data: CalendarTaskItem) => void,
	initialValues?: CalendarTaskItem
}

export const LinkValidationSchema = yup
	.object({
		key: yup.string(),
		value: yup.string().url('Ссылка должна быть корректным url-адресом').required()
	})
	.nullable()
	.notRequired()

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
	link: LinkValidationSchema,
	priority: yup.string().oneOf(Object.keys(PRIORITY_TITLES)).required('Пожалуйста, выберите приоритет события'),
	status: yup.string().oneOf(Object.keys(TASK_STATUSES)).required('Пожалуйста, укажите статус события'),
	calendar: yup.string()
		.required('Это поле обязательно для заполнения')
		.min(10, 'Выберите элемент из выпадающего списка')
		.max(30, 'Выберите элемент из выпадающего списка')
	
})

export const AddTaskForm: FC<AddTaskFormProps> = ({date, onComplete, onCancel, initialValues}) => {
	const {data: calendarsList} = useGetCalendarsQuery({exclude: ['Invite']})
	const [addTask, {isLoading, status}] = useAddTaskMutation()
	const formik = useFormik<CalendarTaskItem>({
		async onSubmit(values) {
			await addTask(values)
				.unwrap()
				.then((response) => {
					onComplete && onComplete(values, response?.data?.taskId)
				})
				.catch((response: MyServerResponse<null>) => {
					if (response.info) {
						toast(response.info?.message, {
							type: response.info.type
						})
					}
				})
		},
		validationSchema: addTaskValidationSchema,
		initialValues: initialValues || {
			title: '',
			linkedFrom: '',
			parentId: '',
			type: 'event',
			createdAt: '',
			description: '',
			status: 'created',
			members: [],
			time: date || dayjs().toDate(),
			timeEnd: dayjs(date || dayjs()).add(1, 'hour').toDate() || dayjs().add(1, 'hour').toDate(),
			priority: 'medium',
			link: null,
			calendar: ''
		}
	})
	
	const calendarItem = useMemo(() => {
		return calendarsList?.data?.find((item) => item._id === formik.values.calendar)
	}, [formik.values.calendar])
	
	useEffect(() => {
		console.log(formik.errors)
	}, [formik.errors])
	
	return (
		<form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
			<FlexBlock direction={'column'} p={'12px 20px 0px 20px'}>
				<FlexBlock mb={12} gap={12} width={'100%'}>
					<TextInput
						inputId={'task__title'}
						tooltip={
							<Tooltip
								text={'Название отображается на доске заданий'}
								size={14}
							/>
						}
						onChange={(e) => formik.setFieldValue('title', e.target.value)}
						onFocus={(e) => !formik.touched.title && formik.setFieldTouched('title', true)}
						errorMessage={formik.errors.title}
						isDirty={formik.touched.title}
						value={formik.values.title || ''}
						label={'Укажите название'}
						placeholder={'Позвонить заказчику'}
					/>
				</FlexBlock>
				{formik.values.parentId && (
					<Informer>
						<FlexBlock
							fSize={15}
							direction={'row'}
							justify={'space-between'}
							wrap={'nowrap'}
							gap={12}
							align={'center'}
							width={'100%'}
						>
							<span>
							Данное событие будет создано как дочернее для <LinkStyled
								target={'_blank'}
								style={{fontSize: 15}}
								to={`/calendar/day/all/${formik.values.parentId}`}>этого события</LinkStyled>
							</span>
							<WhiteButton
								type={'button'}
								onClick={() => formik.setFieldValue('parentId', undefined)}
							>
								Удалить связь
							</WhiteButton>
						</FlexBlock>
					</Informer>
				)}
				<FlexBlock mb={12} wrap={'nowrap'} width={'100%'}>
					<SelectLinks
						inputId={'select__link'}
						tooltip={
							<Tooltip
								text={'Укажите ссылку, по которой любой участник события может подключиться в режиме онлайн'}
								size={14}
							/>
						}
						label={'Укажите ссылку на встречу'}
						onChange={(value) => {
							formik.setFieldValue('link', value)
						}}
					/>
				</FlexBlock>
				<FlexBlock mb={12} wrap={'nowrap'} width={'100%'} gap={12}>
					<FlexBlock width={'calc(50% - 6px)'}>
						<SelectInput
							placeholder={'Выберите из выпадающего списка'}
							label={'Выберите календарь'}
							icon={calendarItem &&
                  <FlexBlock width={20} height={20} bgColor={calendarItem?.color} borderRadius={borderRadiusSize.xs}/>}
							iconPlacement={'right'}
							value={calendarItem?.title || ''}
							errorMessage={formik.errors.calendar}
							isDirty={formik.touched.calendar}
							data={calendarsList?.data || [] as Array<CalendarNameItem>}
							onFocus={() => formik.setFieldTouched('calendar', true, false)}
							renderData={(data, methods) => (
								<SelectListContainer>
									{!!data.length ? (
										<>
											{data.map((item) => (
												<SelectItemContainer
													key={item._id}
													onClick={() => {
														formik.setFieldValue('calendar', item._id)
														methods.focusOut()
													}}
												>
													<FlexBlock width={20} height={20} bgColor={item.color} borderRadius={borderRadiusSize.xs}/>
													{item.title}
												</SelectItemContainer>
											))}
										</>
									) : (
										<SelectItemContainer>
											Не удалось загрузить данные
										</SelectItemContainer>
									)}
								</SelectListContainer>
							)}
						/>
					</FlexBlock>
				</FlexBlock>
				<FlexBlock mb={12} gap={12}>
					<SelectPriorityInput
						inputId={'task__priority'}
						tooltip={
							<Tooltip
								text={'Приоритет события обозначает важность его выполнения'}
								size={14}
							/>
						}
						selected={formik.values.priority || 'medium'}
						onChange={(key) => formik.setFieldValue('priority' as keyof CalendarTaskItem, key as CalendarTaskItem['priority'])}
						onFocus={() => !formik.touched.priority && formik.setFieldTouched('priority', true)}
					/>
					<SelectBooleanInput
						label={'Укажите статус'}
						inputId={'select_status'}
						data={Object.values(TASK_STATUSES)}
						selected={TASK_STATUSES[formik.values.status || 'created']}
						onChange={(data) => formik.setFieldValue('status', data.key)}
						onFocus={() => !formik.touched.status && formik.setFieldTouched('status', true)}
					/>
				</FlexBlock>
				<FlexBlock mb={12} gap={12} direction={'row'}>
					<SelectInput
						inputId={'start__date'}
						onFocus={() => !formik.touched.time && formik.setFieldTouched('time', true)}
						data={[]}
						renderData={() => (
							<SelectListContainer maxHeight={500} width={'200%'}>
								<DatePickerPaper
									currentDate={formik.values.time || new Date()}
									onChange={(date) => {
										formik.setFieldValue('time', date)
										formik.setFieldValue('timeEnd', dayjs(date).add(1, 'hour').toDate())
									}}
								/>
							</SelectListContainer>
						)}
						value={getHumanizeDateValue(formik.values.time || date || new Date())}
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
									currentDate={formik.values.timeEnd}
									onChange={(date) => {
										formik.setFieldValue('timeEnd', date)
									}}
								/>
							</SelectListContainer>
						)}
						value={getHumanizeDateValue(formik.values.timeEnd || date || new Date())}
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
							{title: '3 часа', actionKey: '180'},
							{title: '6 часов', actionKey: (6 * 60).toString()},
						]}
					/>
				</FlexBlock>
				{formik.values.time.getDate() !== formik.values.timeEnd.getDate() && (
					<Informer>
						Это событие будет создано в карточках нескольких дней, так как оно начинается и
						завершается в разные дни.
						<br/>
						Так происходит потому что мы стараемся показывать актуальную информацию на каждый день.
					</Informer>
				)}
				<FlexBlock mb={12} direction={'row'}>
					<TextAreaInput
						value={formik.values.description}
						onChange={(value) => formik.setFieldValue('description', value)}
						onFocus={() => formik.setFieldTouched('description', true)}
						errorMessage={formik.errors.description}
						isDirty={formik.touched.description}
						inputId={'task__description'}
						label={'Добавьте описание к событию'}
						placeholder={'Произвольный текст, на заметку...'}
					/>
				</FlexBlock>
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
