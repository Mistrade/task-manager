import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectWeekConfig } from '@selectors/planner';
import { Helmet } from 'react-helmet';

import { DateHelper } from '@src/common/calendarSupport/dateHelper';

import { WeekCalendarController } from '@planner/RenderModes/WeekCalendar/WeekCalendarController';

export const WeekLayout = () => {
  const config = useAppSelector(plannerSelectWeekConfig);
  return (
    <>
      <Helmet title={`События ${config.weekOfYear} недели ${config.year}г.`} />
      <WeekCalendarController config={config} />
    </>
  );
};
