import {CalendarCurrentContext, CalendarDisabledOptions, CalendarItem} from "../../components/Calendars/types";
import dayjs, {Dayjs} from "dayjs";
import {DateHelper} from "./dateHelper";

export interface CalendarDateItemProps {
	date: Date,
	context?: CalendarCurrentContext,
	disabledOptions?: CalendarDisabledOptions
}

export class CalendarDateItem {
	private date: Date;
	private context?: CalendarCurrentContext;
	private disabledOptions?: CalendarDisabledOptions;
	
	//Класс, формирующий специальный объект с мета данными о полученной дате
	constructor(props: CalendarDateItemProps) {
		this.date = props.date;
		this.context = props.context;
		this.disabledOptions = props.disabledOptions
	}
	
	//Основной метод, собирающий весь объем данных
	public getItem(): CalendarItem {
		const d = dayjs(this.date)
		return {
			value: d.toDate(),
			meta: this.getMetaData(d)
		}
	}
	
	//метод, формирующий мета данные
	public getMetaData(d: Dayjs): CalendarItem["meta"] {
		return {
			isToday: d.isToday(),
			isTomorrow: d.isTomorrow(),
			isYesterday: d.isYesterday(),
			isDisabled: DateHelper.checkIsDisabled(this.date, this.disabledOptions || {}),
			isCurrent: DateHelper.checkThatDateInCurrentScope(this.date, this.context),
		}
	}
	
	//метод, изменяющий текущий контекст
	public setThis(options: Partial<CalendarDateItemProps>): CalendarDateItem {
		this.disabledOptions = options.disabledOptions
		this.context = options.context
		options?.date ? this.date = options.date : null
		
		return this
	}
}