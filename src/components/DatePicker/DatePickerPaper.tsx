import { plannerDateToDate } from '@planner-reducer/utils';
import dayjs from 'dayjs';
import { FC, useCallback, useMemo, useState } from 'react';

import { DateListGenerator } from '@src/common/calendarSupport/generators';
import { changeMonthCurrentHandler } from '@src/common/functions';

import { DatePickerSwitch } from '@components/DatePicker/DatePickerSwitch';
import { FlexBlock } from '@components/LayoutComponents';

import { SmallCalendarMonthTitle } from '@pages/planner/SmallMonth/SmallCalendarMonthTitle';
import { SmallMonth } from '@pages/planner/SmallMonth/SmallMonth';

import {
  CalendarDisabledOptions,
  CalendarItem,
  MonthItem,
  PlannerMonthMode,
} from '@planner/types';

import { ShortChangeCurrentPattern } from '../../common/commonTypes';
import { TimeSelector } from './TimeSelector';

interface DatePickerPaperProps {
  disabledOptions?: CalendarDisabledOptions;
  currentDate: Date;
  onChange?: (date: Date) => void;
  useOtherDays: boolean;
}

export const DatePickerPaper: FC<DatePickerPaperProps> = ({
  disabledOptions,
  currentDate,
  onChange,
  useOtherDays = false,
}) => {
  const [current, setCurrent] = useState<PlannerMonthMode>({
    layout: 'month',
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });

  const monthItem: MonthItem = useMemo(() => {
    return new DateListGenerator({
      useOtherDays,
      disabled: disabledOptions,
    }).getMonthItem(new Date(current.year, current.month));
  }, [current, disabledOptions, useOtherDays]);

  const switchHandler = useCallback(
    (pattern: ShortChangeCurrentPattern) => {
      const v = dayjs().set('year', current.year).set('month', current.month);
      const t = dayjs();
      const m = v.isSame(t, 'month');
      const y = v.isSame(t, 'year');

      if (pattern === 'today' && m && y) {
        return;
      }

      const newDate = changeMonthCurrentHandler(current, pattern);
      setCurrent({
        layout: 'month',
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      });
    },
    [current.year, current.month]
  );

  const selectDateHandler = useCallback(
    (data: CalendarItem) => {
      const m = currentDate.getMinutes();
      const h = currentDate.getHours();
      const r = dayjs(plannerDateToDate(data.value))
        .set('hour', h)
        .set('minute', m)
        .toDate();

      if (r.getMonth() !== current.month || r.getFullYear() !== current.year) {
        setCurrent({
          layout: 'month',
          month: r.getMonth(),
          year: r.getFullYear(),
        });
      }

      onChange && onChange(r);
    },
    [currentDate, current]
  );

  const changeTimeHandler = useCallback(
    (date: Date) => {
      if (disabledOptions?.min) {
        const min = dayjs(disabledOptions.min);
        if (min.isSame(date, 'hour')) {
          if (min.isSameOrAfter(date, 'minute')) {
            return onChange && onChange(dayjs(min).add(5, 'minute').toDate());
          } else {
            return onChange && onChange(date);
          }
        }
        if (min.isAfter(date)) {
          return;
        }
      }
      return onChange && onChange(date);
    },
    [disabledOptions?.min]
  );

  return (
    <FlexBlock width={'100%'} direction={'column'} align={'center'} p={8}>
      <FlexBlock mb={24}>
        <DatePickerSwitch onClick={switchHandler} />
      </FlexBlock>
      <FlexBlock
        direction={'row'}
        width={'100%'}
        height={250}
        gap={12}
        align={'flex-start'}
        justify={'flex-start'}
        overflow={'hidden'}
      >
        <SmallMonth
          title={
            <SmallCalendarMonthTitle monthItem={monthItem} renderYear={true} />
          }
          onSelectDate={selectDateHandler}
          current={current}
          value={currentDate}
          monthItem={monthItem}
        />
        <TimeSelector
          currentDate={currentDate}
          minuteStep={1}
          onChange={changeTimeHandler}
        />
      </FlexBlock>
    </FlexBlock>
  );
};
