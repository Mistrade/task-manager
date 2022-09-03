import {
	CalendarCurrentContext,
	CalendarCurrentMonth,
	CalendarCurrentWeek,
	CalendarCurrentYear,
	CalendarDisabledOptions,
	CalendarItem,
	CalendarList,
	MonthItem,
	WeekItem,
	YearItem
} from '../../components/Calendars/types'
import {DateScopeOptions, DateScopeType} from './scopes'
import dayjs from 'dayjs'
import {getFirstDayInWeek} from './other'
import {checkIsDisabledDate} from './isDisabledDate'
import {checkIsCurrent} from './isCurrent'
import {getMonthDays, getWeekDays} from './getters'

export const dateToCalendarItem = (date: Date, context: CalendarCurrentContext, disabledOptions?: CalendarDisabledOptions): CalendarItem => {
	return {
		value: dayjs(date).toDate(),
		meta: {
			isToday: dayjs(date).isToday(),
			isTomorrow: dayjs(date).isTomorrow(),
			isYesterday: dayjs(date).isYesterday(),
			isDisabled: checkIsDisabledDate(date, disabledOptions || {}),
			isCurrent: checkIsCurrent(context, date)
		}
	}
}
export const generateDateOfWeekArray = (current: CalendarCurrentWeek, scope: DateScopeType, context: CalendarCurrentContext, options?: DateScopeOptions): WeekItem => {
	const start = getFirstDayInWeek(scope.startDate)
	let currentWeek = start.week()
	const end = start.add(scope.count, 'day')
	let iterationDate = start
	const result: CalendarList = []
	
	while (iterationDate.isBetween(start, end, 'day', '[]') && currentWeek === start.week()) {
		const item = dateToCalendarItem(iterationDate.toDate(), context, options?.disabled)
		
		iterationDate = iterationDate.add(1, 'day')
		currentWeek = iterationDate.week()
		
		if (!options?.useOtherDays && !item.meta.isCurrent) {
			continue
		}
		
		result.push(
			item
		)
	}
	
	return {
		weekOfYear: start.week(),
		month: context.month,
		year: context.year,
		days: result
	}
}
export const generateDateOfMonthArray = (current: CalendarCurrentMonth, scope: DateScopeType, options?: DateScopeOptions): MonthItem => {
	let d = dayjs(scope.startDate)
	let week = scope.count
	const weekList: Array<WeekItem> = []
	
	while (week > 0) {
		const weekCurrent: CalendarCurrentWeek = {
			layout: 'week',
			aroundDate: d.toDate()
		}
		const weekCtx: CalendarCurrentContext = {month: current.month, year: current.year}
		const w = getWeekDays(weekCurrent, weekCtx, options)
		if (!!w.days.length) {
			weekList.push(w)
		}
		week--
		d = d.add(7, 'day')
	}
	
	return {
		monthOfYear: current.month,
		year: current.year,
		weeks: weekList
	}
}
export const generateDateOfYearArray = (current: CalendarCurrentYear, scope: DateScopeType, options?: DateScopeOptions): YearItem => {
	const start = 0
	const end = scope.count
	
	let i = start
	
	let months: Array<MonthItem> = []
	
	while (i <= end) {
		const mCurrent: CalendarCurrentMonth = {layout: 'month', month: i, year: current.year}
		const m = getMonthDays(mCurrent, options)
		months.push(m)
		i++
	}
	
	
	return {
		year: current.year,
		months
	}
}


