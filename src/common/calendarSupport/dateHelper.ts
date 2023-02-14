import dayjs, {Dayjs} from "dayjs";
import {
	CalendarCurrentContext,
	CalendarCurrentDay,
	CalendarCurrentMonth,
	CalendarCurrentWeek,
	CalendarCurrentYear,
	CalendarDisabledOptions
} from "../../components/Calendars/types";

export class DateHelper {
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
	
	public static createMonthCurrent(date: Date): CalendarCurrentMonth {
		return {
			layout: "month",
			month: date.getMonth(),
			year: date.getFullYear()
		}
	}
	
	public static createWeekCurrent(date: Date): CalendarCurrentWeek {
		return {
			layout: 'week',
			aroundDate: date
		}
	}
	
	public static createYearCurrent(date: Date): CalendarCurrentYear {
		return {
			layout: 'year',
			year: date.getFullYear(),
		}
	}
	
	public static createDateCurrent(date: Date): CalendarCurrentDay {
		return {
			layout: 'day',
			date: date
		}
	}
	
}