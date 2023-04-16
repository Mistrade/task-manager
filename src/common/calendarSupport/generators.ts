import { dateToPlannerDate } from '@planner-reducer/utils';
import dayjs from 'dayjs';

import {
  CalendarCurrentContext,
  CalendarList,
  CalendarMonthList,
  CalendarWeekList,
  MonthItem,
  WeekItem,
  YearItem,
} from '@pages/planner/planner.types';

import { CalendarDateItem } from './calendarDateItem';
import { DateHelper } from './dateHelper';
import {
  DateScopeHelper,
  DateScopeInterface,
  DateScopeOptions,
} from './scopes';

export class DateListGenerator {
  public options?: DateScopeOptions;

  constructor(options?: DateScopeOptions) {
    this.options = options;
  }

  private getCalendarItem(date: Date, context?: CalendarCurrentContext) {
    return new CalendarDateItem({
      context,
      date: date,
      disabledOptions: this.options?.disabled,
    }).getItem();
  }

  public getDateList(
    scope: DateScopeInterface,
    context?: CalendarCurrentContext
  ): CalendarList {
    const startDate = dayjs(scope.startDate);
    const endDate = dayjs(scope.endDate);
    const result: CalendarList = [];
    let iterationDate = startDate;

    if (endDate.isBefore(startDate)) {
      return result;
    }

    while (iterationDate.isBetween(startDate, endDate, 'date', '[]')) {
      const item = this.getCalendarItem(iterationDate.toDate(), context);
      iterationDate = iterationDate.add(1, 'day');

      if (!this.options?.useOtherDays && !item.meta.isCurrent) {
        continue;
      }

      result.push(item);
    }

    return result;
  }

  public getWeekItem(
    aroundWeekDate: Date = new Date(),
    context?: CalendarCurrentContext
  ): WeekItem {
    const inputDate = dayjs(DateHelper.getFirstDayInWeek(aroundWeekDate));
    const scope = new DateScopeHelper(this.options).getDateScopeOfWeek(
      aroundWeekDate
    );
    const list = this.getDateList(scope, context);

    return {
      stateDate: dateToPlannerDate(inputDate),
      weekOfYear: inputDate.week(),
      year: inputDate.year(),
      month: inputDate.month(),
      days: list,
      scope: {
        startDate: dateToPlannerDate(scope.startDate),
        endDate: dateToPlannerDate(scope.endDate),
      },
    };
  }

  public getWeekList(
    scope: DateScopeInterface,
    context?: CalendarCurrentContext
  ): CalendarWeekList {
    const startDate = dayjs(DateHelper.getFirstDayInWeek(scope.startDate));
    const endDate = dayjs(DateHelper.getLastDayInWeek(scope.endDate));
    let iterationDate = startDate;
    const result: CalendarWeekList = [];

    if (endDate.isBefore(startDate)) {
      return result;
    }

    while (iterationDate.isBetween(startDate, endDate, 'date', '[]')) {
      const item = this.getWeekItem(iterationDate.toDate(), context);

      if (item.days.length > 0) {
        result.push(item);
      }

      iterationDate = iterationDate.add(1, 'week');
    }

    return result;
  }

  public getMonthItem(
    aroundMonthDate: Date = new Date(),
    context?: CalendarCurrentContext
  ): MonthItem {
    const inputDate = dayjs(aroundMonthDate).startOf('month');
    const scope = new DateScopeHelper(this.options).getDateScopeOfMonth(
      aroundMonthDate
    );
    const listOfWeeks = this.getWeekList(scope, context);

    return {
      stateDate: dateToPlannerDate(inputDate),
      monthOfYear: inputDate.month(),
      year: inputDate.year(),
      weeks: listOfWeeks,
      scope: {
        startDate: dateToPlannerDate(scope.startDate),
        endDate: dateToPlannerDate(scope.endDate),
      },
    };
  }

  public getMonthList(
    scope: DateScopeInterface,
    context?: CalendarCurrentContext
  ): CalendarMonthList {
    const startDate = dayjs(scope.startDate);
    const endDate = dayjs(scope.endDate);
    const result: CalendarMonthList = [];
    let iterationDate = startDate;

    if (endDate.isBefore(startDate, 'date')) {
      return [];
    }

    while (iterationDate.isBetween(startDate, endDate, 'date', '[]')) {
      const ctx = DateHelper.createContext(iterationDate.toDate(), 'month');
      const item = this.getMonthItem(iterationDate.toDate(), context || ctx);
      if (item.weeks.length > 0) {
        result.push(item);
      }

      iterationDate = iterationDate.add(1, 'month');
    }

    return result;
  }

  public getYearItem(
    aroundYearDate: Date = new Date(),
    context?: CalendarCurrentContext
  ): YearItem {
    const inputDate = dayjs(aroundYearDate).startOf('year');
    const scope = new DateScopeHelper(this.options).getDateScopeOfYear(
      aroundYearDate
    );

    const monthList = this.getMonthList(scope, context);

    return {
      stateDate: dateToPlannerDate(inputDate),
      year: inputDate.year(),
      months: monthList,
      scope: {
        startDate: dateToPlannerDate(scope.startDate),
        endDate: dateToPlannerDate(scope.endDate),
      },
    };
  }
}