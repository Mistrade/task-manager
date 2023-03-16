import { FC, useEffect, useMemo, useState } from 'react';
import { FlexBlock } from '../LayoutComponents/FlexBlock';
import {
  CalendarDisabledOptions,
  MonthItem,
  PlannerMonthMode,
} from '../../pages/Planner/planner.types';
import { CalendarTodaySwitchers } from '../../pages/Planner/Header/CalendarTodaySwitchers';
import { changeMonthCurrentHandler } from '../../common/functions';
import dayjs from 'dayjs';
import { SmallCalendarMonthTitle } from '../../pages/Planner/SmallMotnCalendar/SmallCalendarMonthTitle';
import { TimeSelector } from './TimeSelector';
import { SmallMonth } from '../../pages/Planner/SmallMotnCalendar/SmallMonth';
import { DateListGenerator } from '../../common/calendarSupport/generators';

interface DatePickerPaperProps {
  disabledOptions?: CalendarDisabledOptions;
  currentDate: Date;
  onChange?: (date: Date) => void;
}

export const DatePickerPaper: FC<DatePickerPaperProps> = ({
  disabledOptions,
  currentDate,
  onChange,
}) => {
  const [current, setCurrent] = useState<PlannerMonthMode>({
    layout: 'month',
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });

  const monthItem: MonthItem = useMemo(() => {
    return new DateListGenerator({
      useOtherDays: true,
      disabled: disabledOptions,
    }).getMonthItem(new Date(current.year, current.month));
  }, [current, disabledOptions]);

  const [value, setValue] = useState<Date>(currentDate);

  useEffect(() => {
    if (onChange && !dayjs(value).isSame(currentDate)) {
      onChange(value);
    }
  }, [value]);

  return (
    <FlexBlock width={'100%'} direction={'column'} align={'center'} p={8}>
      <FlexBlock mb={24}>
        <CalendarTodaySwitchers
          onChangeSwitcherState={(pattern) => {
            const v = dayjs()
              .set('year', current.year)
              .set('month', current.month);
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
          }}
        />
      </FlexBlock>
      <FlexBlock
        direction={'row'}
        width={'100%'}
        height={225}
        gap={12}
        justify={'flex-start'}
        overflow={'hidden'}
      >
        <SmallMonth
          title={
            <SmallCalendarMonthTitle monthItem={monthItem} renderYear={true} />
          }
          onSelectDate={(data) => {
            const m = value.getMinutes();
            const h = value.getHours();
            const r = dayjs(data.value)
              .set('hour', h)
              .set('minute', m)
              .toDate();

            if (
              r.getMonth() !== current.month ||
              r.getFullYear() !== current.year
            ) {
              setCurrent({
                layout: 'month',
                month: r.getMonth(),
                year: r.getFullYear(),
              });
            }

            setValue(r);
          }}
          current={current}
          value={value}
          monthItem={monthItem}
        />
        <TimeSelector
          currentDate={value}
          minuteStep={5}
          onChange={(date) => {
            console.log(date);
            if (disabledOptions?.min) {
              const min = dayjs(disabledOptions.min);
              if (min.isSame(date, 'hour')) {
                if (min.isSameOrAfter(date, 'minute')) {
                  return setValue(dayjs(min).add(5, 'minute').toDate());
                } else {
                  return setValue(date);
                }
              }
              if (min.isAfter(date)) {
                return;
              }
            }
            return setValue(date);
          }}
        />
      </FlexBlock>
    </FlexBlock>
  );
};
