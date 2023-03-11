import dayjs, {Dayjs} from "dayjs";
import {
	CalendarCurrentContext,
	CalendarDisabledOptions,
	PlannerDateMode,
	PlannerMonthMode,
	PlannerWeekMode,
	PlannerYearMode
} from "../../pages/Planner/planner.types";
import {DATE_HOURS_MINUTES_SECONDS_FORMAT, DeclinationMonthList, ShortMonthList} from "../constants";

export interface HumanizeDateValueOptions {
	withTime?: boolean,
	withYear?: boolean,
	monthPattern?: 'short' | 'full',
	yearPattern?: 'short' | 'full',
}

export abstract class DateHelper {
	public static getHumanizeDateValue(date: Date | string, options: HumanizeDateValueOptions = {}) {
		const {
			withTime = true,
			withYear = true,
			monthPattern = 'short',
			yearPattern = 'full',
		} = options
		
		
		const d = dayjs(date)
		let format: Array<string> = [
			`DD`,
			monthPattern === 'short'
				? ShortMonthList[d.month()]
				: DeclinationMonthList[d.month()]
		]
		
		if (withYear) {
			format.push(
				yearPattern === 'short'
					? 'YYг.'
					: 'YYYY'
			)
		}
		
		if (withTime) {
			format.push(
				'в HH:mm'
			)
		}
		
		return d.format(format.join(' '))
	}
	
	public static getFirstDayInMonth(dateInMonth: Date | Dayjs): Dayjs {
		return dayjs(dateInMonth).startOf('month')
	}
	
	public static getLastDayInMonth(dateInMonth: Date | Dayjs): Dayjs {
		return dayjs(dateInMonth).endOf('month')
	}
	
	public static getFirstDayInWeek(date: Date | Dayjs): Dayjs {
		return dayjs(date).startOf('week')
	}
	
	public static getLastDayInWeek(date: Date | Dayjs): Dayjs {
		return dayjs(date).endOf('week')
	}
	
	public static getFirstDayInYear(year: number): Dayjs {
		return dayjs().set('year', year).startOf('year')
	}
	
	public static getLastDayInYear(year: number): Dayjs {
		return dayjs().set('year', year).endOf('year')
	}
	
	public static checkThatDateIsDisabledOfMinDate(dateForCheck: Date, minDate?: CalendarDisabledOptions['min'], includeMinDate?: CalendarDisabledOptions['includeMin']): boolean {
		if (!minDate) {
			return false
		}
		
		const date = dayjs(minDate)
		
		return includeMinDate
			? date.isAfter(dateForCheck, 'day')
			: date.isSameOrAfter(dateForCheck, 'day')
	}
	
	public static checkThatDateIsDisabledOfMaxDate(dateForCheck: Date, maxDate?: CalendarDisabledOptions['max'], includeMaxDate?: CalendarDisabledOptions['includeMax']): boolean {
		if (!maxDate) {
			return false
		}
		
		const date = dayjs(maxDate)
		
		return includeMaxDate
			? date.isBefore(dateForCheck, 'day')
			: date.isSameOrBefore(dateForCheck, 'day')
	}
	
	public static checkThatDateIsWeekend(dateForCheck: Date, excludeWeekends?: CalendarDisabledOptions['excludeWeekends']): boolean {
		if (!excludeWeekends) {
			return false
		}
		
		const weekDay = dayjs(dateForCheck).weekday()
		return weekDay === 5 || weekDay === 6
	}
	
	public static checkThatDateIncludesInDisableDateList(dateForCheck: Date, disabledDateList?: CalendarDisabledOptions['disableDates']): boolean {
		if (!disabledDateList?.length) {
			return false
		}
		
		return disabledDateList.some(
			(disabledDate) => dayjs(dateForCheck).isSame(disabledDate, 'date')
		)
	}
	
	public static checkIsDisabled(dateForCheck: Date, options: CalendarDisabledOptions) {
		const {
			min,
			includeMin = false,
			max,
			includeMax = false,
			excludeWeekends = false,
			disableDates = []
		} = options
		
		
		return [
			min ? this.checkThatDateIsDisabledOfMinDate(dateForCheck, min, includeMin) : false,
			max ? this.checkThatDateIsDisabledOfMaxDate(dateForCheck, max, includeMax) : false,
			excludeWeekends ? this.checkThatDateIsWeekend(dateForCheck, excludeWeekends) : false,
			!!disableDates.length ? this.checkThatDateIncludesInDisableDateList(dateForCheck, disableDates) : false
		]
			.some((res) => res)
		
	}
	
	public static checkThatDateInCurrentScope(dateForCheck: Date, context?: CalendarCurrentContext) {
		if (!context) {
			return true
		}
		
		if (context.month) {
			const ctx = dayjs(new Date(context.year, context.month, 1))
			return dateForCheck.getMonth() === ctx.month() && dateForCheck.getFullYear() === ctx.year()
		}
		
		
		const ctx = dayjs().set('year', context.year)
		return dateForCheck.getFullYear() === ctx.year()
	}
	
	public static createContext(date: Date, pattern: 'year' | 'month' | 'week'): CalendarCurrentContext | undefined {
		if (pattern === 'year') {
			return {
				year: date.getFullYear()
			}
		}
		
		if (pattern === 'month') {
			return {
				year: date.getFullYear(),
				month: date.getMonth()
			}
		}
		
		if (pattern === 'week') {
			const d = dayjs(date)
			return {
				year: d.year(),
				month: d.month(),
				week: d.week()
			}
		}
	}
	
	public static createMonthCurrent(date: Date): PlannerMonthMode {
		return {
			layout: "month",
			month: date.getMonth(),
			year: date.getFullYear()
		}
	}
	
	public static createWeekCurrent(date: Date): PlannerWeekMode {
		return {
			layout: 'week',
			aroundDate: date
		}
	}
	
	public static createYearCurrent(date: Date): PlannerYearMode {
		return {
			layout: 'year',
			year: date.getFullYear(),
		}
	}
	
	public static createDateCurrent(date: Date): PlannerDateMode {
		return {
			layout: 'day',
			date: date
		}
	}
	
}

export const getDateDescription = (date: Date, withTime: boolean = true): string => {
	const d = dayjs(date)
	
	const formattedHours = d.format(DATE_HOURS_MINUTES_SECONDS_FORMAT)
	
	const diffMinutes = Math.abs(d.diff(dayjs(), 'minute'))
	
	if (diffMinutes < 2) {
		return `Менее 2 минут назад`
	}
	
	if (diffMinutes < 60) {
		if (diffMinutes <= 20 && diffMinutes >= 5) {
			return `${diffMinutes} минут назад`
		}
		
		const divisionRemainder = diffMinutes % 10
		
		
		if (divisionRemainder === 1) {
			return `${diffMinutes} минуту назад`
		}
		
		if (divisionRemainder >= 2 && divisionRemainder <= 4) {
			return `${diffMinutes} минуты назад`
		}
		
		return `${diffMinutes} минут назад`
	}
	
	if (d.isTomorrow()) {
		return `Завтра в ${formattedHours}`
	}
	
	if (d.isToday()) {
		return `Сегодня в ${formattedHours}`
	}
	
	if (d.isYesterday()) {
		return `Вчера в ${formattedHours}`
	}
	
	return DateHelper.getHumanizeDateValue(d.toDate(), {withTime, monthPattern: 'full'})
}