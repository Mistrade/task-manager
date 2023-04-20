import React, { memo } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { PLANNER_LAYOUTS } from '@src/common/constants/enums';
import { disableReRender } from '@src/common/utils/react-utils';
import { CenteredContainer } from '@src/routes/Interceptors/SessionInterceptor';

import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { LayoutSuspense } from '@components/Loaders/LayoutSuspense';

import { FindEventFilter } from '@planner/Filters/FindEventFilter';

const DayLayout = React.lazy(() =>
  import('@src/pages/planner/Modes/Day/DayCalendar').then(
    ({ DayCalendar }) => ({
      default: DayCalendar,
    })
  )
);
const WeekLayout = React.lazy(() =>
  import('@src/pages/planner/Modes/Week/WeekLayout').then(({ WeekLayout }) => ({
    default: WeekLayout,
  }))
);
const MonthLayout = React.lazy(() =>
  import('@src/pages/planner/Modes/Month/MonthCalendar').then(
    ({ MonthCalendar }) => ({ default: MonthCalendar })
  )
);
const YearLayout = React.lazy(() =>
  import('@src/pages/planner/Modes/Year/YearCalendar').then(
    ({ YearCalendar }) => ({ default: YearCalendar })
  )
);
const EventListLayout = React.lazy(() =>
  import('@src/pages/planner/Modes/List/ListCalendarMode').then(
    ({ ListCalendarMode }) => ({ default: ListCalendarMode })
  )
);
const FavoriteEventsLayout = React.lazy(() =>
  import('@src/pages/planner/Modes/Favorites/FavoritesCalendar').then(
    ({ FavoritesCalendar }) => ({ default: FavoritesCalendar })
  )
);

export const LayoutSelector = memo(() => {
  return (
    <VerticalScroll
      staticContent={<FindEventFilter />}
      placementStatic={'top'}
      renderPattern={'top-bottom'}
    >
      <Routes>
        <Route
          path={`${PLANNER_LAYOUTS.DAY}/*`}
          element={
            <LayoutSuspense>
              <DayLayout />
            </LayoutSuspense>
          }
        />
        <Route
          path={`${PLANNER_LAYOUTS.WEEK}/*`}
          element={
            <LayoutSuspense>
              <WeekLayout />
            </LayoutSuspense>
          }
        />
        <Route
          path={`${PLANNER_LAYOUTS.MONTH}/*`}
          element={
            <LayoutSuspense>
              <MonthLayout />
            </LayoutSuspense>
          }
        />
        <Route
          path={`${PLANNER_LAYOUTS.YEAR}/*`}
          element={
            <LayoutSuspense>
              <YearLayout />
            </LayoutSuspense>
          }
        />
        <Route
          path={`${PLANNER_LAYOUTS.LIST}/*`}
          element={
            <LayoutSuspense>
              <EventListLayout />
            </LayoutSuspense>
          }
        />
        <Route
          path={`${PLANNER_LAYOUTS.FAVORITES}/*`}
          element={
            <LayoutSuspense>
              <FavoriteEventsLayout />
            </LayoutSuspense>
          }
        />
        <Route
          path={'*'}
          element={
            <CenteredContainer>
              <ErrorScreen
                title={'Такого URL не существует'}
                description={
                  'В адресной строке допущена ошибка относительно режима отображения событий. Нажмите на кнопку ниже, если вы хотели попасть в "Планировщик"'
                }
                errorType={'SYSTEM_ERROR'}
                action={{
                  title: 'Перейти к планировщику',
                  onClick: () => {
                    // navigate(
                    //   `/${ServicesNames.PLANNER}/${DEFAULT_PLANNER_LAYOUT}/${DEFAULT_PLANNER_STATUS}`
                    // );
                  },
                }}
              />
            </CenteredContainer>
          }
        />
      </Routes>
    </VerticalScroll>
  );
}, disableReRender);
