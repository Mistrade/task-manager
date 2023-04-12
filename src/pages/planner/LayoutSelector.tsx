import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { PLANNER_LAYOUTS } from '@src/common/constants';
import React from 'react';
import { LayoutSuspense } from '../LayoutSuspense';

const DayLayout = React.lazy(() =>
  import('./RenderModes/DayCalendar/DayCalendar').then(({ DayCalendar }) => ({
    default: DayCalendar,
  }))
);
const WeekLayout = React.lazy(() =>
  import('./RenderModes/WeekCalendar/WeekLayout').then(({ WeekLayout }) => ({
    default: WeekLayout,
  }))
);
const MonthLayout = React.lazy(() =>
  import('./RenderModes/MonthCalendar/MonthCalendar').then(
    ({ MonthCalendar }) => ({ default: MonthCalendar })
  )
);
const YearLayout = React.lazy(() =>
  import('./RenderModes/YearCalendar/YearCalendar').then(
    ({ YearCalendar }) => ({ default: YearCalendar })
  )
);
const EventListLayout = React.lazy(() =>
  import('./RenderModes/List/ListCalendarMode').then(
    ({ ListCalendarMode }) => ({ default: ListCalendarMode })
  )
);
const FavoriteEventsLayout = React.lazy(() =>
  import('./RenderModes/FavoritesCalendar/FavoritesCalendar').then(
    ({ FavoritesCalendar }) => ({ default: FavoritesCalendar })
  )
);

export const LayoutSelector = () => {
  const layout = useAppSelector(plannerSelectLayout);

  switch (layout) {
    case PLANNER_LAYOUTS.DAY:
      return (
        <LayoutSuspense>
          <DayLayout />
        </LayoutSuspense>
      );
    case PLANNER_LAYOUTS.WEEK:
      return (
        <LayoutSuspense>
          <WeekLayout />
        </LayoutSuspense>
      );
    case PLANNER_LAYOUTS.MONTH:
      return (
        <LayoutSuspense>
          <MonthLayout renderTaskCount={5} />
        </LayoutSuspense>
      );
    case PLANNER_LAYOUTS.YEAR:
      return (
        <LayoutSuspense>
          <YearLayout />
        </LayoutSuspense>
      );
    case PLANNER_LAYOUTS.LIST:
      return (
        <LayoutSuspense>
          <EventListLayout />
        </LayoutSuspense>
      );
    case PLANNER_LAYOUTS.FAVORITES:
      return (
        <LayoutSuspense>
          <FavoriteEventsLayout />
        </LayoutSuspense>
      );
  }
};
