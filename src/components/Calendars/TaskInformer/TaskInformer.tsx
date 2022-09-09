import {FC, memo, ReactNode, useCallback, useMemo, useState} from 'react'
import {
	CalendarCurrentMonth,
	CalendarPriorityKeys,
	EventItem,
	EventLinkItem,
	MonthItem,
	TaskInformerMainProps,
	TaskInformerProps,
	TaskMemberItemType,
	TaskMembersListType,
	TaskStatusesType,
	UsageTaskItemBaseProps
} from '../types'
import styled, {css} from 'styled-components'
import dayjs from 'dayjs'
import {
	currentColor,
	defaultColor,
	disabledColor,
	getHumanizeDateValue,
	PRIORITY_LIST,
	PRIORITY_TITLES,
	TASK_STATUSES
} from '../../../common/constants'
import {CancelIcon, CompleteIcon, Female, LoaderIcon, Male, PencilIcon, SadSmile} from '../../Icons/Icons'
import {convertEventStatus} from '../../../common/functions'
import {FlexBlock, FlexBlockProps} from '../../LayoutComponents/FlexBlock'
import {getMonthDays} from '../../../common/calendarSupport/getters'
import {SmallCalendarMonthTitle} from '../SmallMotnCalendar/SmallCalendarMonthTitle'
import {Heading} from '../../Text/Heading'
import {JoinToEventButton, WhiteButton} from '../../Buttons/Buttons.styled'
import {ArrowIndicator} from '../Cell'
import {EventIcon} from '../../Icons/EventIcon'
import {DropDownButton} from "../../Buttons/DropDownButton";
import {EmptyButtonStyled} from "../../Buttons/EmptyButton.styled";
import {ServerResponse, useUpdateTaskMutation} from "../../../store/api/taskApi/taskApi";
import {toast} from "react-toastify";
import {DatePicker} from "../DatePicker/DatePicker";
import {SwitchCalendarModeTab} from '../Calendar.styled'
import {useFormik} from "formik";
import {Tooltip} from "../../Tooltip/Tooltip";
import {SelectLinks} from "../../Input/SelectInput/CalendarSelectInputs/SelectLinks";
import * as yup from 'yup'
import {LinkValidationSchema} from "../Forms/AddTaskForm";
import {TextInput} from "../../Input/TextInput/TextInput";
import {TextAreaInput} from "../../Input/TextAreaInput/TextAreaInput";
import {SmallMonth} from "../SmallMotnCalendar/SmallMonth";

const FlexColumn = styled('div')`
  & {
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`

const FlexRowStart = styled('div')`
  & {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
`

const TaskInfoTextContainer = styled(FlexRowStart)<{ isSticky?: boolean }>`
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  ${(props) => {
    if (props.isSticky) {
      return css`
        & {
          z-index: 1;
          background-color: #fff;
          padding: 8px 0;
          position: sticky;
          top: 0;
          left: 0
        }
      `
    }
  }}
`

const TaskInfoTitle = styled('span')`
  & {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    margin-right: 6px;
  }
`

const TaskInfoValue = styled('span')`
  & {
    display: block;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
  }
`

const TaskMemberListContainer = styled(FlexColumn)`
  & {
    align-items: flex-start;
    justify-content: flex-start;
    max-height: 70vh;
    overflow: scroll;
  }
`

const TaskMemberItemContainer: FC<FlexBlockProps> = memo((props) => {
	return <FlexBlock
		{...props}
		p={'12px 6px'}
		border={'1px solid black'}
		justify={'start'}
		align={'center'}
		direction={'row'}
		width={'100%'}
		borderRadius={4}
		additionalCss={css`
      &:not(:last-child) {
        margin-bottom: 4px;
      }
		`}
	/>
})

const TaskMemberItemNameContainer = styled('div')`
  & {
    font-size: 16px;
    flex-grow: 1;
    text-align: left;
  }
`

const TaskInformerDataList = styled(FlexRowStart)`
  & {
    flex-direction: column;
    flex: 1 0 calc(50% - 16px);
    min-width: 300px;
    max-width: 600px;
  }

  &:not(:last-child) {
    margin-right: 32px;
  }
`

const TaskInfoText: FC<{ title: string, value: string, isSticky?: boolean }> = ({
																																									title,
																																									value,
																																									isSticky
																																								}) => {
	
	return (
		<TaskInfoTextContainer isSticky={isSticky}>
			<TaskInfoTitle>
				{title}
			</TaskInfoTitle>
			<TaskInfoValue>
				{value}
			</TaskInfoValue>
		</TaskInfoTextContainer>
	)
}


const TaskMemberList: FC<{ members: TaskMembersListType }> = ({members}) => {
	return (
		<TaskMemberListContainer>
			<TaskInfoText
				isSticky={true}
				title={'Участники:'}
				value={members.length.toString()}
			/>
			<FlexBlock justify={'flex-start'} align={'flex-start'} direction={'column'} width={'100%'}>
				{members.map((member) => (
					<TaskMemberItem member={member}/>
				))}
			</FlexBlock>
		</TaskMemberListContainer>
	)
}

const TaskMemberItem: FC<{ member: TaskMemberItemType }> = ({member}) => {
	return (
		<TaskMemberItemContainer>
			<FlexBlock mr={6} align={'center'}>
				{member.gender === 'woman' ? (
					<Female size={20} color={'#000'}/>
				) : <Male size={20} color={'#000'}/>}
			</FlexBlock>
			<TaskMemberItemNameContainer>
				{`${member.surname} ${member.name}`}
			</TaskMemberItemNameContainer>
		</TaskMemberItemContainer>
	)
}

interface TaskInformerTitle {
	title: string,
	onChange: (newTitle: string) => Promise<void>
}

interface TaskInformerTitleInputProps {
	oldValue: string,
	onDecline: () => void,
	onSave: (value: string) => Promise<void>
}

interface EditableFieldsButtonsProps {
	isLoading: boolean,
	onDecline?: () => void,
	
}

const EditableFieldsButtons: FC<EditableFieldsButtonsProps> = ({isLoading, onDecline}) => {
	return (
		<>
			<WhiteButton type={'submit'}>
				{isLoading ? (
					<LoaderIcon size={22} color={currentColor}/>
				) : (
					<CompleteIcon size={22} color={currentColor}/>
				)}
			</WhiteButton>
			<WhiteButton type={'button'} onClick={onDecline}>
				<CancelIcon size={22} color={defaultColor}/>
			</WhiteButton>
		</>
	)
}

const TaskInformerTitleInput: FC<TaskInformerTitleInputProps> = ({oldValue, onSave, onDecline}) => {
	const [loading, setLoading] = useState(false)
	const {values, setFieldValue, errors, touched, setFieldTouched, handleSubmit} = useFormik({
		initialValues: {title: oldValue},
		async onSubmit(values) {
			if (oldValue !== values.title) {
				setLoading(true)
				await onSave(values.title).then(() => onDecline()).finally(() => setLoading(false))
			}
		}
	})
	
	return (
		<StyledTaskInformerLinkForm onSubmit={handleSubmit}>
			<TextInput
				placeholder={'Введите здесь название события'}
				label={'Название события'}
				value={values.title}
				isDirty={touched.title}
				errorMessage={errors.title}
				onChange={(e) => setFieldValue('title', e.target.value)}
				onFocus={() => setFieldTouched('title', true, false)}
				buttons={<EditableFieldsButtons isLoading={loading} onDecline={onDecline}/>}
			/>
		</StyledTaskInformerLinkForm>
	)
}

const TaskInformerTitle: FC<TaskInformerTitle> = ({title, onChange}) => {
	const [isEdit, setIsEdit] = useState(false)
	return (
		<FlexBlock direction={'row'} justify={'start'} width={'100%'} mb={6}>
			{!isEdit ? (
				<FlexBlock gap={6} align={'flex-start'}>
					<Heading.H2>{title}</Heading.H2>
					<EmptyButtonStyled onClick={() => setIsEdit(true)}>
						<PencilIcon size={22} color={currentColor}/>
					</EmptyButtonStyled>
				</FlexBlock>
			) : (
				<TaskInformerTitleInput oldValue={title} onDecline={() => setIsEdit(false)} onSave={onChange}/>
			)}
		
		</FlexBlock>
	)
}

type TaskInformerSwitchersKeys = 'about' | 'history' | 'comments' | 'members'

interface TaskInformerSwitchersItem {
	title: string,
	key: TaskInformerSwitchersKeys
}

interface TaskInformerSwitchers {
	onChange?: (value: TaskInformerSwitchersItem) => void,
	selected: TaskInformerSwitchersKeys
}

const taskInformerSwitcherList: Array<TaskInformerSwitchersItem> = [
	{title: 'О событии', key: 'about'},
	{title: 'История', key: 'history'},
	{title: 'Комментарии', key: 'comments'},
	{title: 'Участники', key: 'members'}
]

const TaskInformerSwitchers: FC<TaskInformerSwitchers> = ({selected, onChange}) => {
	
	return (
		<FlexBlock borderBottom={`1px solid ${disabledColor}`} justify={'flex-start'} align={'flex-end'}>
			{taskInformerSwitcherList.map((item) => (
				<SwitchCalendarModeTab
					key={item.key}
					onClick={() => onChange && onChange(item)}
					isSelected={item.key === selected}
				>
					{item.title}
				</SwitchCalendarModeTab>
			))}
		</FlexBlock>
	)
}

interface TaskInformerRightBarProps extends UsageTaskItemBaseProps {
	monthItem: MonthItem,
	updateFn: TaskInformerUpdateFn
}

type TaskInformerUpdateFn = (field: keyof EventItem, data: string | EventLinkItem) => Promise<void>

interface ToggleEventButtonProps<T> {
	value: T,
	onChange?: TaskInformerUpdateFn,
	elementId?: string,
	stopPropagation?: boolean,
	renderText?: boolean
}

const StyledToggleButtonContainer = styled('label')`
  display: flex;
  align-items: center;
  gap: 6px;
`

const ToggleButtonContainer: FC<{ button: ReactNode, text: ReactNode, focusElementId: string }> = ({
																																																		 button,
																																																		 focusElementId,
																																																		 text
																																																	 }) => {
	return (
		<StyledToggleButtonContainer htmlFor={focusElementId}>
			<FlexBlock grow={0} shrink={0}>
				{button}
			</FlexBlock>
			<FlexBlock grow={1} shrink={1} maxWidth={'100%'}>
				{text}
			</FlexBlock>
		</StyledToggleButtonContainer>
	)
}

const ToggleEventStatus: FC<ToggleEventButtonProps<TaskStatusesType>> = ({value, onChange}) => {
	return (
		<ToggleButtonContainer
			focusElementId={'change__status'}
			button={<DropDownButton
				onChange={async (element) => {
					if (onChange) {
						await onChange('status', element.id)
					}
				}}
				data={Object.values(TASK_STATUSES).map((item) => ({
					id: item.key,
					title: item.title,
					icon: item.icon
				}))}
				renderElement={({ref, onElementFocused, onElementBlur}) => (
					<EmptyButtonStyled id={'change__status'} ref={ref} onFocus={onElementFocused} onBlur={onElementBlur}>
						<EventIcon status={value}/>
					</EmptyButtonStyled>
				)}
				selectedId={value}
			/>}
			text={convertEventStatus(value)}
		/>
	)
}

export const ToggleEventPriority: FC<ToggleEventButtonProps<CalendarPriorityKeys>> = ({
																																												value,
																																												onChange,
																																												elementId,
																																												stopPropagation,
																																												renderText = true
																																											}) => {
	return (
		<ToggleButtonContainer
			button={<DropDownButton
				stopPropagation={stopPropagation}
				onChange={async (element, e) => {
					if (onChange) {
						await onChange('priority', element.id)
					}
				}}
				data={PRIORITY_LIST.map(item => ({
					id: item.type,
					title: item.title,
					icon: <ArrowIndicator priorityKey={item.type} isCompleted={false}/>
				}))}
				renderElement={({ref, onElementFocused, onElementBlur}) => (
					<EmptyButtonStyled
						id={elementId || 'change__priority'}
						ref={ref}
						onFocus={onElementFocused}
						onBlur={onElementBlur}
						onClick={(e) => stopPropagation && e.stopPropagation()}
					>
						<ArrowIndicator
							priorityKey={value}
						/>
					</EmptyButtonStyled>
				)}
				selectedId={value}
			/>}
			text={
				renderText && (
					<FlexBlock fSize={16}>
						{PRIORITY_TITLES[value] + ' приоритет'}
					</FlexBlock>
				)
			}
			focusElementId={elementId || 'change__priority'}
		/>
	)
}

const TaskCreatedMessage: FC<UsageTaskItemBaseProps> = ({taskItem}) => {
	return (
		<FlexBlock fSize={16}>
			Создано: {getHumanizeDateValue(dayjs(taskItem.createdAt).toDate(), true)}
		</FlexBlock>
	)
}

const TaskInformerRightBar: FC<TaskInformerRightBarProps> = ({taskItem, monthItem, updateFn}) => {
	return (
		<FlexBlock
			flex={'0 0 300px'}
			width={'fit-content'}
			justify={'flex-start'}
			align={'flex-start'}
			direction={'column'}
			gap={12}
			pl={8}
		>
			<FlexBlock direction={'column'} align={'flex-start'} justify={'flex-start'} gap={12}>
				<TaskCreatedMessage taskItem={taskItem}/>
				<FlexBlock>
					<Heading.H2 style={{textAlign: 'left', fontSize: 16}}>Доп инфо:</Heading.H2>
				</FlexBlock>
				<ToggleEventStatus value={taskItem.status} onChange={updateFn}/>
				<ToggleEventPriority value={taskItem.priority} onChange={updateFn}/>
			</FlexBlock>
			<FlexBlock mb={6} mt={6}>
				<Heading.H2 style={{textAlign: 'left', fontSize: 16}}>График месяца</Heading.H2>
			</FlexBlock>
			<SmallMonth
				title={<SmallCalendarMonthTitle monthItem={monthItem}/>}
				currentDate={dayjs(taskItem.time).toDate()}
				pourDates={{
					type: 'week',
					date: dayjs(taskItem.time).toDate()
				}}
				monthItem={monthItem}
			/>
		</FlexBlock>
	)
}

interface TaskInformerLeftBarProps extends UsageTaskItemBaseProps {
	updateFn: TaskInformerUpdateFn
}

interface TaskInformerLinkButton {
	link: EventItem['link'],
	updateFn: TaskInformerUpdateFn
}

const StyledTaskInformerLinkForm = styled('form')`
  & {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    width: 100%;
    flex-wrap: nowrap;
  }
`

interface InformerTaskAddLinkProps {
	onDecline: () => void,
	onSave: (field: 'link', data: EventLinkItem) => Promise<void>,
	link: EventLinkItem | null
}

const TaskInformerLinkInput: FC<InformerTaskAddLinkProps> = ({onDecline, onSave, link}) => {
	const [loading, setLoading] = useState(false)
	const {values, setFieldValue, handleSubmit} = useFormik({
		initialValues: {link},
		validationSchema: yup.object().shape({
			link: LinkValidationSchema
		}),
		async onSubmit(values, formikHelpers) {
			if (values.link && link?.value !== values.link?.value) {
				setLoading(true)
				await onSave('link', values.link).then(() => onDecline()).finally(() => setLoading(false))
			}
		}
	})
	
	return (
		<StyledTaskInformerLinkForm onSubmit={handleSubmit}>
			<SelectLinks
				initialLinkValue={values.link}
				label={'Ссылка для подключения'}
				initialShowNotification={false}
				inputId={'select__link'}
				onChange={(value) => {
					setFieldValue('link', value, false)
				}}
				buttons={<EditableFieldsButtons isLoading={loading} onDecline={onDecline}/>}
			/>
		</StyledTaskInformerLinkForm>
	)
}


const TaskInformerLinkButton: FC<TaskInformerLinkButton> = ({link, updateFn}) => {
	const [editMode, setEditMode] = useState(false)
	
	const declineHandler = () => {
		setEditMode(false)
	}
	
	return (
		<FlexBlock justify={'flex-start'} align={'center'} width={'100%'} gap={6}>
			{editMode ? (
				<TaskInformerLinkInput
					link={link}
					onDecline={declineHandler}
					onSave={updateFn}
				/>
			) : link?.value ? (
				<>
					<JoinToEventButton
						href={link.value}
						target={'_blank'}
						rel={''}
					>
						Подключиться по ссылке
					</JoinToEventButton>
					<EmptyButtonStyled onClick={() => setEditMode(true)}>
						<PencilIcon size={22}/>
					</EmptyButtonStyled>
				</>
			) : (
				<WhiteButton onClick={() => setEditMode(true)}>
					Добавить ссылку для события
				</WhiteButton>
			)}
		</FlexBlock>
	)
}

interface TaskInformerDescriptionProps extends UsageTaskItemBaseProps {
	updateFn: TaskInformerUpdateFn,
}

interface TaskInformerDescriptionInputProps {
	value: string,
	updateFn: TaskInformerUpdateFn,
	onDecline: () => void
}

const TaskInformerDescriptionInput: FC<TaskInformerDescriptionInputProps> = ({value, updateFn, onDecline}) => {
	const [loading, setLoading] = useState(false)
	const formik = useFormik({
		initialValues: {description: value},
		async onSubmit(values) {
			if (!!values.description && values.description !== value) {
				setLoading(true)
				await updateFn('description', values.description).then(() => onDecline()).finally(() => setLoading(false))
			}
		}
	})
	
	return (
		<StyledTaskInformerLinkForm onSubmit={formik.handleSubmit}>
			<FlexBlock direction={'column'} gap={6} width={'100%'}>
				<TextAreaInput
					value={formik.values.description}
					onChange={(v) => formik.setFieldValue('description', v)}
					label={'Подробное описание события'}
					placeholder={'Постарайтесь объяснить, что нужно сделать в этом событии'}
				/>
				<FlexBlock direction={'row'} width={'fit-content'} gap={6}>
					<EditableFieldsButtons isLoading={loading} onDecline={onDecline}/>
				</FlexBlock>
			</FlexBlock>
		</StyledTaskInformerLinkForm>
	)
}

const TaskInformerDescriptionContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 6px;
  width: 100%;
  align-items: flex-start;
  position: relative;
  padding: 12px 8px;
  border-radius: 4px;
  border: 2px solid ${disabledColor};

`

const TaskInformerDescription: FC<TaskInformerDescriptionProps> = ({taskItem, updateFn}) => {
	const [editMode, setEditMode] = useState(false)
	
	return (
		<FlexBlock direction={'column'}>
			{editMode ? (
				<TaskInformerDescriptionInput
					value={taskItem.description}
					updateFn={updateFn}
					onDecline={() => setEditMode(false)}
				/>
			) : (
				<FlexBlock width={'100%'} direction={'column'} gap={6}>
					<FlexBlock fSize={16} gap={6} pl={8} additionalCss={css`color: ${currentColor};`}>
						Описание события
						<Tooltip
							size={16}
							text={'Зачастую описание события не помещается в выделенную для него область, попробуйте скроллить блок ниже, для получения дополнительной информации'}
							placement={'top'}
						/>
					</FlexBlock>
					<TaskInformerDescriptionContainer>
						<FlexBlock
							fSize={16}
							additionalCss={css`
                max-height: 127px;
                overflow-y: scroll;
                -webkit-scroll-snap-type: none;
							`}
						>
							<FlexBlock
								fSize={16}
								additionalCss={css`
                  white-space: pre-wrap;
                  padding-right: 42px;
                  word-wrap: anywhere;
								`}
							>
								{taskItem.description || 'У данного события нет описания'}
							</FlexBlock>
						</FlexBlock>
						<FlexBlock
							position={'absolute'}
							additionalCss={css`
                top: 4px;
                right: 4px
							`}
						>
							<EmptyButtonStyled onClick={() => setEditMode(true)}>
								<PencilIcon size={22}/>
							</EmptyButtonStyled>
						</FlexBlock>
					</TaskInformerDescriptionContainer>
				</FlexBlock>
			)}
		</FlexBlock>
	)
}

interface TaskInformerAboutTab extends UsageTaskItemBaseProps  {
	updateFn: TaskInformerUpdateFn
}

const TaskInformerAboutTab: FC<TaskInformerAboutTab> = ({taskItem, updateFn}) => {
	return (
		<FlexBlock direction={'column'} gap={12}>
			<FlexBlock direction={'row'} gap={12}>
				<DatePicker
					label={'Дата начала события'}
					currentDate={dayjs(taskItem.time).toDate()}
					onChange={async (date) => {
						await updateFn('time', dayjs(date).toString())
					}}
				/>
				<DatePicker
					label={'Дата завершения события'}
					currentDate={dayjs(taskItem.timeEnd).toDate()}
					onChange={async (date) => {
						await updateFn('timeEnd', dayjs(date).toString())
					}}
				/>
			</FlexBlock>
			<TaskInformerDescription taskItem={taskItem} updateFn={updateFn}/>
		</FlexBlock>
	)
}

const TaskInformerLeftBar: FC<TaskInformerLeftBarProps> = ({taskItem, updateFn}) => {
	const [switcher, setSwitcher] = useState<TaskInformerSwitchersKeys>('about')
	
	return (
		<FlexBlock
			flex={'1 0 calc(100% - 312px)'}
			borderRight={`1px solid ${disabledColor}`}
			pr={20}
			direction={'column'}
			gap={12}
		>
			<TaskInformerTitle
				title={taskItem.title}
				onChange={async (value) => await updateFn('title', value)}
			/>
			<TaskInformerLinkButton
				link={taskItem.link}
				updateFn={updateFn}
			/>
			<TaskInformerSwitchers
				selected={switcher}
				onChange={(value) => setSwitcher(value.key)}
			/>
			<FlexBlock direction={'column'}>
				{switcher === 'about' ? (
					<TaskInformerAboutTab taskItem={taskItem} updateFn={updateFn}/>
				) : <>{switcher}</>}
			</FlexBlock>
		</FlexBlock>
	)
}


const TaskInformerMain: FC<TaskInformerMainProps> = ({taskItem}) => {
	const options = useMemo(() => {
		const start = dayjs(taskItem.time)
		const current: CalendarCurrentMonth = {
			layout: 'month',
			month: start.month(),
			year: start.year()
		}
		return {
			monthItem: getMonthDays(current, {useOtherDays: true}),
			currentDate: start.toDate(),
		}
	}, [taskItem.time])
	
	const [updateTask, {data}] = useUpdateTaskMutation()
	
	const updateTaskHandler: TaskInformerUpdateFn = useCallback(async (field, data) => {
		return await updateTask({
			id: taskItem.id,
			field,
			data
		})
			.unwrap()
			.then(r => {
				console.log(r)
				if (r.info) {
					toast(r.info.message, {
						type: r.info.type
					})
				}
			})
			.catch((r: { data?: ServerResponse<null>, status: number }) => {
				if (r.data?.info) {
					toast(r.data?.info?.message, {
						type: r.data.info.type
					})
				}
			})
	}, [taskItem.id])
	
	return (
		<FlexBlock
			direction={'column'}
			width={'100%'}
			minWidth={900}
			maxWidth={'80vw'}
			p={'12px 20px'}
			gap={20}
		>
			<FlexBlock direction={'row'} width={'100%'} gap={12}>
				<TaskInformerLeftBar taskItem={taskItem} updateFn={updateTaskHandler}/>
				<TaskInformerRightBar taskItem={taskItem} monthItem={options.monthItem} updateFn={updateTaskHandler}/>
			</FlexBlock>
		</FlexBlock>
	)
}

const TaskInfoButtons = () => {
	return (
		<>
		
		</>
	)
}

const TaskInfoNotFound: FC = () => (
	<FlexBlock
		height={'100%'}
		width={'100%'}
		justify={'center'}
		align={'center'}
		wrap={'wrap'}
		p={'24px 0'}
	>
		<FlexBlock
			width={'100%'}
			justify={'center'}
			align={'center'}
			mb={24}
		>
			<SadSmile color={'darkorange'}/>
		</FlexBlock>
		<FlexBlock
			width={'100%'}
			justify={'center'}
		>
			К сожалению, не удалось загрузить информацию по данному заданию.
		</FlexBlock>
	</FlexBlock>
)

export const TaskInformer: FC<TaskInformerProps> = ({taskItem}) => {
	return !taskItem ? <TaskInfoNotFound/> : <TaskInformerMain taskItem={taskItem}/>
}
