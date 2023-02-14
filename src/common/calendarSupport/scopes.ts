import {CalendarDisabledOptions} from '../../components/Calendars/types'
import dayjs from 'dayjs'
import {DateHelper} from "./dateHelper";

export interface DateScopeOptions {
	disabled?: CalendarDisabledOptions,
	useOtherDays?: boolean,
}

export interface DateScopeInterface {
	startDate: Date,
	endDate: Date,
}

export interface TaskSchemeDateScopeInterface {
	fromDate: string,
	toDate: string,
}


export class DateScopeHelper {
	public options?: Omit<DateScopeOptions, 'disabled'>;
	
	//Класс с набором методов для получения диапазона дата внутри месяца, недели, года, включая доп дни для заполнения полупустых недель
	//Доп.дни контролируются флагом (options.useOtherDays)
	constructor(options?: DateScopeOptions) {
		this.options = options
	}
	
	//Публичный метод, возвращающий диапазон дат внутри конкретной недели, полученной из current
	public getDateScopeOfWeek(dateInWeek: Date): DateScopeInterface {
		return {
			startDate: DateHelper.getFirstDayInWeek(dateInWeek).toDate(),
			endDate: DateHelper.getLastDayInWeek(dateInWeek).toDate()
		}
	}
	
	//Приватный Метод возвращающий начальную и конечную дату полностью включающую между ними переданный месяц, диапазон дат - 42 дня
	//От понедельника, недели включающей 1 число месяца
	//До - первый день периода + 41 день
	//Итого - 6 недель по 7 дней
	private getDateScopeOfMonthIncludeAdditionalDates(dateInMonth: Date): DateScopeInterface {
		const firstDayInMonth = DateHelper.getFirstDayInMonth(dateInMonth)
		const startDate = DateHelper.getFirstDayInWeek(firstDayInMonth)
		
		return {
			startDate: startDate.toDate(),
			endDate: dayjs(startDate).add((6 * 7) - 1, 'day').endOf('day').toDate()
		}
	}
	
	//Приватный метод, возвращающий первый день месяца и последний
	private getDateScopeOnlyInMonth(dateInMonth: Date): DateScopeInterface {
		return {
			startDate: DateHelper.getFirstDayInMonth(dateInMonth).toDate(),
			endDate: DateHelper.getLastDayInMonth(dateInMonth).toDate(),
		}
	}
	
	//Публичный метод, агрегирующий совокупность входящих options в конструкторе с current
	//Возвращает промежуток дат, полностью включающий месяц current и добавляющий несколько дней в начало и конец (от понедельника до воскресенья)
	//В зависимости от наличия useOtherDays
	public getDateScopeOfMonth(dateInMonth: Date): DateScopeInterface {
		return this.options?.useOtherDays
			? this.getDateScopeOfMonthIncludeAdditionalDates(dateInMonth)
			: this.getDateScopeOnlyInMonth(dateInMonth)
	}
	
	//Публичный метод, возвращающий диапазон дат от начала до конца года
	//Или от понедельника недели, в которой год начинается, До воскресенья недели, в которой год заканчивается
	//В зависимости от переданного options.useOtherDays в конструкторе
	public getDateScopeOfYear(dateInYear: Date): DateScopeInterface {
		return {
			startDate: DateHelper.getFirstDayInYear(dateInYear.getFullYear()).toDate(),
			endDate: DateHelper.getLastDayInYear(dateInYear.getFullYear()).toDate()
		}
	}
	
	//Приватный метод, возвращающий диапазон дат в виде строк в рамках одного месяца, включая или исключая дополнительные дни от useOtherDays,
	//переданного в конструкторе класса
	private getDateScopeForTaskSchemeOfMonthPattern(dateForScheme: Date): TaskSchemeDateScopeInterface {
		const dates = this.getDateScopeOfMonth(dateForScheme)
		
		return {
			fromDate: dates.startDate.toString(),
			toDate: dates.endDate.toString()
		}
	}
	
	//Приватный метод, выполняющий функционал, аналогичный методу getDateScopeForTaskSchemeOfMonthPattern, только в рамках года, вместо месяца
	private getDateScopeForTaskSchemeOfYearPattern(dateForScheme: Date): TaskSchemeDateScopeInterface {
		const firstDayInYear = DateHelper.getFirstDayInYear(dateForScheme.getFullYear())
		const startDate = this.options?.useOtherDays
			? DateHelper.getFirstDayInWeek(firstDayInYear)
			: firstDayInYear
		
		const lastDayInYear = DateHelper.getLastDayInYear(firstDayInYear.year())
		const endDate = this.options?.useOtherDays
			? DateHelper.getLastDayInWeek(lastDayInYear)
			: lastDayInYear
		
		return {
			fromDate: startDate.toDate().toString(),
			toDate: endDate.toDate().toString()
		}
	}
	
	//Публичный метод, возвращающий диапазон дат для TaskScheme, включая или исключая доп. дни в зависимости от options.useOtherDays в конструкторе класса
	public getDateScopeForTaskScheme(dateForScheme: Date, schemeType: 'month' | 'year'): TaskSchemeDateScopeInterface {
		return schemeType === 'month'
			? this.getDateScopeForTaskSchemeOfMonthPattern(dateForScheme)
			: this.getDateScopeForTaskSchemeOfYearPattern(dateForScheme)
	}
}
