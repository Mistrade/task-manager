import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectWeekConfig } from '@selectors/planner';
import { memo } from 'react';
import { Helmet } from 'react-helmet';

import { WeekCalendarController } from '@planner/RenderModes/WeekCalendar/WeekCalendarController';


export const WeekLayout = memo(() => {
  const config = useAppSelector(plannerSelectWeekConfig);
  return (
    <>
      <Helmet title={`События ${config.weekOfYear} недели ${config.year}г.`} />
      <WeekCalendarController config={config} />
    </>
  );
});