import React, { useContext } from 'react';
import { PLANNER_LAYOUTS } from '../../common/constants';
import { PlannerContext } from '../../Context/planner.context';
import { LayoutSuspense } from '../LayoutSuspense';

const DayLayout = React.lazy(() =>
  import('./RenderModes/DayCalendar/DayCalendar').then(({ DayCalendar }) => ({
    default: DayCalendar,
  }))
);
const WeekLayout = React.lazy(() =>
  import('./RenderModes/WeekCalendar/WeekCalendarController').then(
    ({ WeekCalendarController }) => ({ default: WeekCalendarController })
  )
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
  const { currentLayout, currentDate, layoutItems } =
    useContext(PlannerContext);

  switch (currentLayout) {
    case PLANNER_LAYOUTS.DAY:
      return (
        <LayoutSuspense>
          <DayLayout currentDate={currentDate.day} />
        </LayoutSuspense>
      );
    case PLANNER_LAYOUTS.WEEK:
      return (
        <LayoutSuspense>
          <WeekLayout weekItem={layoutItems.week} />
        </LayoutSuspense>
      );
    case PLANNER_LAYOUTS.MONTH:
      return (
        <LayoutSuspense>
          <MonthLayout renderTaskCount={5} monthItem={layoutItems.month} />
        </LayoutSuspense>
      );
    case PLANNER_LAYOUTS.YEAR:
      return (
        <LayoutSuspense>
          <YearLayout yearItem={layoutItems.year} />
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
