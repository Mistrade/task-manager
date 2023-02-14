import {
	CalendarPriorityKeys,
	CalendarPriorityList,
	DateItem,
	MonthItem,
	TaskMembersListType,
	TaskStatusesType,
	TaskStatusInfo,
	WeekItem,
	YearItem
} from '../components/Calendars/types'
import dayjs from 'dayjs'
import {ArchiveIcon, CompleteIcon, CreatedIcon, ProcessIcon, WaitIcon} from '../components/Icons/Icons'
import {ErrorImagesType, InitialCurrentCalendarModeType} from "./types";
import {SystemErrorImg} from "../components/Icons/Errors/SystemError";
import {ErrorBadRequestImg} from "../components/Icons/Errors/ErrorBadRequest";
import {ErrorForbiddenImg} from "../components/Icons/Errors/ErrorForbidden";
import {FilterTaskStatuses} from "../components/Calendars/Modes/DayCalendar/EventFilter";

export const MonthList = [
	'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

export const DeclinationMonthList = [
	'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
]

export const ShortMonthList = [
	'Янв', 'Фев', 'Март', "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"
]

export const WeekDaysList = [
	'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
]

export const WeekDaysShortList = [
	'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
]

export const disabledColor = 'rgba(30,30,30,.1)'
export const defaultColor = 'rgba(30,30,30,.45)'
export const currentColor = 'rgba(100,149,237,.9)'
export const currentColorWithoutBlur = 'rgb(100,149,237)'
export const hoverColor = 'rgba(100,149,237,.15)'
export const darkColor = 'rgba(0, 0, 0, .6)'
export const todayID = 'calendar-today'
export const pageHeaderColor = '#f6f8fa'
export const orangeColor = 'rgba(255,117,66, 1)'
export const lightHoverColor = 'rgba(220, 220, 220, .4)'
export const errorColor = '#FF6666'
export const completeColor = '#c6fcda'

export const borderRadiusSize = {
	xs: "4px",
	sm: "10px",
	md: "16px",
	xl: "20px",
}

export const colorRegExpDefault = /#[a-fA-F0-9]{3,6}$/gi
export const colorRegExpRGBA = /rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\)/gi

export const priorityColors: { [key in CalendarPriorityKeys]: string } = {
	veryLow: defaultColor,
	low: 'lightblue',
	medium: currentColor,
	high: 'orange',
	veryHigh: 'red',
	not_selected: currentColor
}
export const PRIORITY_TITLES: { [key in CalendarPriorityKeys]: string } = {
	veryLow: 'Очень низкий',
	low: 'Низкий',
	medium: 'Средний',
	high: 'Высокий',
	veryHigh: 'Очень высокий',
	not_selected: 'Не выбрано'
}
export const PRIORITY_LIST: CalendarPriorityList = [
	{type: 'veryHigh', title: PRIORITY_TITLES.veryHigh},
	{type: 'high', title: PRIORITY_TITLES.high},
	{type: 'medium', title: PRIORITY_TITLES.medium},
	{type: 'low', title: PRIORITY_TITLES.low},
	{type: 'veryLow', title: PRIORITY_TITLES.veryLow}
]

type TaskStatusesObjectProps = {
	[key in FilterTaskStatuses]: Array<TaskStatusesType>
}
export const TaskStatusesObject: TaskStatusesObjectProps = {
	created: ['created'],
	in_work: ['in_progress', 'review'],
	completed: ['completed'],
	archive: ['archive'],
	all: ['created', 'completed', 'review', 'in_progress']
}

interface ContinueTaskObject {
	title: string,
	nextStatus: TaskStatusesType,
}

export const ContinueWorkTaskButtonName: { [key in TaskStatusesType]: Array<ContinueTaskObject> } = {
	archive: [{
		title: 'Восстановить',
		nextStatus: 'created',
	}],
	review: [{
		title: 'Выполнить',
		nextStatus: 'completed',
	}],
	completed: [],
	in_progress: [
		{
			title: 'На проверку',
			nextStatus: 'review',
		},
		{
			title: 'Выполнить',
			nextStatus: 'completed'
		}
	],
	created: [{
		title: 'Взять в работу',
		nextStatus: 'in_progress'
	}]
}

export const TASK_STATUSES: { [key in TaskStatusesType]: TaskStatusInfo } = {
	created: {
		value: false,
		key: 'created',
		title: 'Запланировано к выполнению',
		icon: <CreatedIcon size={16}/>
	},
	in_progress: {
		value: false,
		key: 'in_progress',
		title: 'В процессе выполнения',
		icon: <ProcessIcon size={16}/>
	},
	review: {
		value: false,
		key: 'review',
		title: 'Ожидает подтверждения',
		icon: <WaitIcon size={16}/>
	},
	completed: {
		value: true,
		key: 'completed',
		title: 'Выполнено',
		icon: <CompleteIcon size={16}/>
	},
	archive: {
		value: false,
		key: 'archive',
		title: 'Перенести в архив',
		icon: <ArchiveIcon size={16} color={currentColor}/>
	}
}

export const DATE_RENDER_FORMAT = 'DD-MM-YYYY HH:mm'
export const DATE_HOURS_FORMAT = 'HH:mm'
export const DEFAULT_TASK_STATUS: TaskStatusesType = 'created'
export const DEFAULT_TASK_PRIORITY: CalendarPriorityKeys = 'medium'
export const Members: TaskMembersListType = [
	{
		name: 'Владос',
		surname: 'Валеев',
		patronymic: 'Ринатович',
		id: '1',
		gender: 'man',
		socialNetworks: [
			{
				networkName: 'vk',
				link: 'https://vk.com/yudakov2014'
			}
		]
	}
]

export const ERROR_IMAGES: ErrorImagesType = {
	SYSTEM_ERROR: <SystemErrorImg/>,
	BAD_REQUEST: <ErrorBadRequestImg/>,
	ERR_FORBIDDEN: <ErrorForbiddenImg/>,
	ERR_NOT_VALID_RESPONSE: <SystemErrorImg/>
}

export const getHumanizeDateValue = (date: Date, withTime: boolean = true) => {
	return dayjs(date).format(`DD ${ShortMonthList[date.getMonth()]} YYYY${withTime ? ' в HH:mm' : ''}`)
}

export const defaultYearItem: YearItem = {
	year: -1,
	months: []
}
export const defaultMonthItem: MonthItem = {
	monthOfYear: -1,
	year: -1,
	weeks: []
}
export const defaultWeekItem: WeekItem = {
	weekOfYear: -1,
	month: -1,
	year: -1,
	days: []
}
export const defaultDateItem: DateItem = {
	current: {
		date: new Date(),
		layout: 'day'
	},
	settingPanel: {
		monthItem: defaultMonthItem,
		monthCurrent: {
			layout: 'month',
			month: -1,
			year: -1
		}
	}
}

export enum LS_KEYS {
	'EVENTS' = 'events'
}

export enum ERROR_DESCRIPTIONS {
	'SUSPENSE' = 'Это может быть связано с нестабильным интернет-соединением или временной неполадкой.\nНе переживайте, мы уже работаем над этим.',
}

export enum ERROR_TITLES {
	'SUSPENSE' = 'Не удалось загрузить запрашиваемый ресурс ленивой загрузки, попробуйте снова, позже...',
	'CALENDAR_RENDER' = 'Произошла критическая ошибка рендера во время работы календаря.'
}


const currentDate = new Date()
export const initialCurrentMap: InitialCurrentCalendarModeType = {
	day: {
		layout: 'day',
		date: currentDate,
	},
	week: {
		layout: 'week',
		aroundDate: currentDate
	},
	month: {
		layout: 'month',
		year: currentDate.getFullYear(),
		month: currentDate.getMonth()
	},
	year: {
		layout: 'year',
		year: currentDate.getFullYear()
	}
}

export const colorPalette = [
	'rgba(100,149,237,.9)',
	'#FF6666',
	'#996666',
	'#FFA4A4',
	'#D46600',
	'#9999CC',
	'#0099FF',
	'#996699',
	'#660099',
	'#CC6699',
	'#FFCCFF',
	'#006699',
	'#66CCCC',
	'#336666',
	'#00CCCC',
	'#009999',
	'#00CC99',
	'#66FF66',
	'#CCFF99',
	'#99CC00',
	'#CCCC99',
	'#CCCC33',
	'#999966',
	'#999999'
]

