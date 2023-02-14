import {
	CalendarCurrentDay,
	CalendarCurrentMonth,
	CalendarDisabledOptions,
	DateItem,
	MonthItem,
	WeekItem,
	YearItem
} from "../../components/Calendars/types";
import dayjs from "dayjs";
import {DateListGenerator} from "./generators";
import {DateHelper} from "./dateHelper";

export class CalendarObserver {
	public disabledOptions?: CalendarDisabledOptions;
	
	constructor(disabledOptions?: CalendarDisabledOptions) {
		this.disabledOptions = disabledOptions
	}
	
	public getYearItem(prev: YearItem, newDate: Date): YearItem {
		return new DateListGenerator({useOtherDays: true, disabled: this.disabledOptions})
			.getYearItem(newDate, {year: newDate.getFullYear()})
	}
	
	public getMonthItem(prev: MonthItem, newDate: Date): MonthItem {
		return prev.monthOfYear !== newDate.getMonth() || prev.year !== newDate.getFullYear()
			? new DateListGenerator({useOtherDays: true, disabled: this.disabledOptions})
				.getMonthItem(newDate, {year: newDate.getFullYear(), month: newDate.getMonth()})
			: prev
	}
	
	public getWeekItem(newDate: Date): WeekItem {
		return new DateListGenerator({useOtherDays: true, disabled: this.disabledOptions})
			.getWeekItem(newDate)
	}
	
	public getDateItem(prev: DateItem, current: CalendarCurrentDay): DateItem {
		const prevDate = dayjs(prev.current.date)
		const currentDate = dayjs(current.date)
		
		const hasSettingPanelInfo = prev.settingPanel.monthItem.monthOfYear >= 0
		
		if (prevDate.isSame(currentDate, 'month') && hasSettingPanelInfo) {
			return {
				...prev,
				current
			}
		}
		
		const monthItemCurrent: CalendarCurrentMonth = DateHelper.createMonthCurrent(current.date)
		return {
			current,
			settingPanel: {
				monthItem: new DateListGenerator({
					useOtherDays: true,
					disabled: this.disabledOptions
				}).getMonthItem(current.date),
				monthCurrent: monthItemCurrent
			}
		}
		
	}
}