import { WeekCalendarController } from '@planner/RenderModes/WeekCalendar/WeekCalendarController';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectWeekConfig } from '@selectors/planner';

export const WeekLayout = () => {
  const config = useAppSelector(plannerSelectWeekConfig);
  return <WeekCalendarController config={config} />;
};
