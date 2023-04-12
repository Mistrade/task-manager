import {
  CalendarDisabledOptions,
  DateItem,
  MonthItem,
  WeekItem,
  YearItem,
} from '@pages/planner/planner.types';
import { DateListGenerator } from './generators';

export class PlannerObserver {
  public disabledOptions?: CalendarDisabledOptions;

  constructor(disabledOptions?: CalendarDisabledOptions) {
    this.disabledOptions = disabledOptions;
  }

  public getYearItem(newDate: Date): YearItem {
    return new DateListGenerator({
      useOtherDays: true,
      disabled: this.disabledOptions,
    }).getYearItem(newDate, { year: newDate.getFullYear() });
  }

  public getMonthItem(newDate: Date): MonthItem {
    return new DateListGenerator({ useOtherDays: true }).getMonthItem(newDate, {
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
    });
  }

  public getWeekItem(newDate: Date): WeekItem {
    return new DateListGenerator({
      useOtherDays: true,
      disabled: this.disabledOptions,
    }).getWeekItem(newDate);
  }

  public getDateItem(date: Date): DateItem {
    return {
      current: {
        layout: 'day',
        date,
      },
      settingPanel: {
        monthItem: new DateListGenerator({
          useOtherDays: true,
          disabled: this.disabledOptions,
        }).getMonthItem(date),
        monthCurrent: {
          layout: 'month',
          year: date.getFullYear(),
          month: date.getMonth(),
        },
      },
    };
  }
}
