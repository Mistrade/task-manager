import {
	EventItem,
	EventsStorage,
	PlannerDateMode,
	PlannerListMode,
	PlannerMode,
	PlannerMonthMode,
	PlannerWeekMode,
	PlannerYearMode
} from '../pages/Planner/planner.types'
import dayjs from 'dayjs'
import {
	ChangeDayCurrentFn,
	ChangeListCurrentFn,
	ChangeMonthCurrentFn,
	ChangeWeekCurrentFn,
	ChangeYearCurrentFn,
	ShortChangeCurrentPattern
} from './commonTypes'
import {MonthList} from './constants'
import {DateHelper} from "./calendarSupport/dateHelper";
import {ShortEventInfoModel} from "../store/api/planning-api/types/event-info.types";
import {CommentModel} from "../store/api/planning-api/types/comments.types";
import {MergedComment} from "../pages/Planner/TaskInformer/LeftBar/Tabs/TaskComments/SupportComponents/CommentsList";
import {UserModel} from "../store/api/session-api/session-api.types";

export const addNull = (value: number): string => value < 10 ? `0${value}` : value.toString()

export const getTaskListOfDay = <EVENT = EventItem | ShortEventInfoModel>(day: Date, storage: EventsStorage<EVENT>): Array<EVENT> => {
	const y = storage[dayjs(day).year()] || {}
	const m = y[dayjs(day).month()] || {}
	return m[dayjs(day).date()] || []
}

export const changeYearCurrentHandler: ChangeYearCurrentFn = (current, pattern) => {
	const {year, layout} = current
	const old = dayjs(new Date(year, 0, 1))
	let newCurrent = old.toDate()
	
	switch (pattern) {
		case '+':
			newCurrent = old.add(1, 'year').toDate()
			break
		case '++':
			newCurrent = old.add(2, 'year').toDate()
			break
		case '-':
			newCurrent = old.subtract(1, 'year').toDate()
			break
		case '--':
			newCurrent = old.subtract(2, 'year').toDate()
			break
		case 'today':
			newCurrent = dayjs().toDate()
			break
	}
	
	return newCurrent
}

export const changeMonthCurrentHandler: ChangeMonthCurrentFn = (current, pattern = 'today') => {
	const oldCurrent = dayjs(new Date(current.year, current.month, 1))
	let newCurrentDate = oldCurrent.toDate()
	switch (pattern) {
		case '+':
			newCurrentDate = oldCurrent.add(1, 'month').toDate()
			break
		case '++':
			newCurrentDate = oldCurrent.add(1, 'year').toDate()
			break
		case '-':
			newCurrentDate = oldCurrent.subtract(1, 'month').toDate()
			break
		case '--':
			newCurrentDate = oldCurrent.subtract(1, 'year').toDate()
			break
		case 'today':
			newCurrentDate = dayjs().toDate()
			break
	}
	return newCurrentDate
}

export const changeWeekCurrentHandler: ChangeWeekCurrentFn = (current, pattern = 'today') => {
	const oldCurrent = dayjs(current.aroundDate)
	
	switch (pattern) {
		case '+':
			return oldCurrent.add(1, 'week').toDate()
		case '-':
			return oldCurrent.subtract(1, 'week').toDate()
		case 'today':
			return dayjs().toDate()
		case '++':
			return oldCurrent.add(1, 'month').toDate()
		case '--':
			return oldCurrent.subtract(1, 'month').toDate()
	}
}

export const changeDayCurrentHandler: ChangeDayCurrentFn = (current, pattern = 'today') => {
	const oldCurrent = dayjs(current.date)
	
	switch (pattern) {
		case '+':
			return oldCurrent.add(1, 'day').toDate()
		case '-':
			return oldCurrent.subtract(1, 'day').toDate()
		case 'today':
			return dayjs().toDate()
		case '++':
			return oldCurrent.add(1, 'week').toDate()
		case '--':
			return oldCurrent.subtract(1, 'week').toDate()
	}
}

export const changeListCurrentHandler: ChangeListCurrentFn = (current, pattern = 'today') => {
	const oldFromCurrent = dayjs(current.fromDate)
	const oldToCurrent = dayjs(current.toDate)
	
	switch (pattern) {
		case '+':
			return {
				layout: 'list',
				fromDate: oldFromCurrent.add(1, 'day').startOf('date').toDate(),
				toDate: oldToCurrent.add(1, 'day').endOf('date').toDate(),
			}
		case '-':
			return {
				layout: 'list',
				fromDate: oldFromCurrent.subtract(1, 'day').startOf('date').toDate(),
				toDate: oldToCurrent.subtract(1, 'day').endOf('date').toDate(),
			}
		case 'today':
			return {
				layout: 'list',
				fromDate: dayjs().startOf('date').toDate(),
				toDate: dayjs().add(31, 'day').endOf('date').toDate(),
			}
		case '++':
			return {
				layout: 'list',
				fromDate: oldFromCurrent.add(7, 'day').startOf('date').toDate(),
				toDate: oldToCurrent.add(7, 'day').endOf('date').toDate(),
			}
		case '--':
			return {
				layout: 'list',
				fromDate: oldFromCurrent.subtract(7, 'day').startOf('date').toDate(),
				toDate: oldToCurrent.subtract(7, 'day').endOf('date').toDate(),
			}
	}
}

const getMonthCalendarTitle = (current: PlannerMonthMode, withTodayMonth?: boolean): string => {
	const {year, month} = current
	const m = MonthList[month]
	const today = dayjs()
	
	const todayTitle = withTodayMonth && today.year() === year && month === today.month() ? '( Сегодня )' : ''
	return `${m}/${year} г. ${todayTitle}`.trim()
}

const getWeekCalendarTitle = (current: PlannerWeekMode): string => {
	const {aroundDate} = current
	const d = dayjs(aroundDate)
	const w = d.week()
	
	const m: PlannerMonthMode = {
		layout: 'month',
		year: d.year(),
		month: d.month()
	}
	return `Неделя ${w}, ${m.year}г.`
}

const getYearCalendarTitle = (current: PlannerYearMode) => {
	const {year} = current
	return `Календарь ${year}г.`
}

const getDayCalendarTitle = (current: PlannerDateMode) => {
	const {date} = current
	const d = dayjs(date)
	return DateHelper.getHumanizeDateValue(d.toDate(), {withTime: false})
}

const getListCalendarTitle = (current: PlannerListMode) => {
	const start = DateHelper.getHumanizeDateValue(current.fromDate, {withYear: false, withTime: false})
	const end = DateHelper.getHumanizeDateValue(current.toDate, {withYear: false, withTime: false})
	
	return `${start} - ${end}`
}

export const getCalendarTitle = (current: PlannerMode) => {
	switch (current.layout) {
		case 'month':
			return getMonthCalendarTitle(current, false)
		case 'week':
			return getWeekCalendarTitle(current)
		case 'day':
			return getDayCalendarTitle(current)
		case 'year':
			return getYearCalendarTitle(current)
		case "list":
			return getListCalendarTitle(current)
		case "favorites":
			return 'Избранное'
	}
}

export const changeCurrentModeHandler = (current: PlannerMode, pattern: ShortChangeCurrentPattern) => {
	const {layout} = current
	
	switch (layout) {
		case 'day':
			return changeDayCurrentHandler(current, pattern)
		case 'week':
			return changeWeekCurrentHandler(current, pattern)
		case 'month':
			return changeMonthCurrentHandler(current, pattern)
		case 'year':
			return changeYearCurrentHandler(current, pattern)
		case 'list':
			return changeListCurrentHandler(current, pattern)
		case "favorites":
			return dayjs().toDate()
	}
}

export const generateHoursArray = ({
																		 start,
																		 end
																	 }: { start: number, end: number }): Array<number> => {
	const s: number = start < 0 || start > 23 ? 0 : start
	const e: number = end < 0 || end > 23 ? 23 : end
	let counter: number = s
	let arr: Array<number> = []
	while (counter <= e) {
		arr.push(counter)
		counter++
	}
	return arr
}

export const generateMinuteArray = ({step}: { step: number }) => {
	const s = step <= 0 || step > 30 ? 5 : step > 5 ? Math.floor(step / 5) : step
	
	const length = 60 / s
	let counter = 0
	let arr = []
	while (counter < length) {
		arr.push(counter * step)
		counter++
	}
	
	return arr
	
}

export const convertEventStatus = (status: EventItem['status']) => {
	switch (status) {
		case 'created':
			return 'Создано'
		case 'in_progress':
			return 'В работе'
		case 'review':
			return "На проверке"
		case 'completed':
			return 'Выполнено'
		case "archive":
			return 'В архиве'
	}
}


export async function Delay(delayCountMs: number = 500): Promise<void> {
	return new Promise((resolve, reject) => setTimeout(() => {
		resolve()
	}, delayCountMs))
}

export interface MergedObject<InitialType extends Record<string, any>, fieldName extends keyof InitialType, ResultType extends Record<fieldName, InitialType[fieldName]>> {
	user: UserModel,
	arr: Array<InitialType>
}

export const mergeArrayWithUserId = <InitialType extends Record<string, any>, fieldName extends keyof InitialType, ResultType extends Record<fieldName, InitialType[fieldName]>>(
	list: Array<InitialType>,
	userField: fieldName
): Array<MergedObject<InitialType, fieldName, ResultType>> => {
	const arr: Array<MergedObject<InitialType, fieldName, ResultType>> = []
	
	
	list.forEach((item) => {
		const arrIndex = arr.length - 1
		if (arrIndex >= 0 && arr[arrIndex]?.user._id === item[userField]._id) {
			return arr[arrIndex].arr.push(item)
		}
		
		return arr.push({
			arr: [item], user: item[userField]
		})
	})
	
	return arr
}