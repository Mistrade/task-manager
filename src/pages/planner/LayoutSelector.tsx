import React, { memo } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { PLANNER_LAYOUTS } from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';

import { CenteredContainer } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { ErrorScreen } from '@components/Errors/ErrorScreen';

import { ModalRoutes } from '@planner/ModalRoutes';
import { StatusRoutes } from '@planner/StatusRoutes';

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

export const LayoutSelector = memo(() => {
  return (
    <Routes>
      <Route
        path={`${PLANNER_LAYOUTS.DAY}/*`}
        element={
          <LayoutSuspense>
            <StatusRoutes>
              <DayLayout />
              <ModalRoutes />
            </StatusRoutes>
          </LayoutSuspense>
        }
      />
      <Route
        path={`${PLANNER_LAYOUTS.WEEK}/*`}
        element={
          <LayoutSuspense>
            <StatusRoutes>
              <WeekLayout />
              <ModalRoutes />
            </StatusRoutes>
          </LayoutSuspense>
        }
      />
      <Route
        path={`${PLANNER_LAYOUTS.MONTH}/*`}
        element={
          <LayoutSuspense>
            <StatusRoutes>
              <MonthLayout />
              <ModalRoutes />
            </StatusRoutes>
          </LayoutSuspense>
        }
      />
      <Route
        path={`${PLANNER_LAYOUTS.YEAR}/*`}
        element={
          <LayoutSuspense>
            <StatusRoutes>
              <YearLayout />
              <ModalRoutes />
            </StatusRoutes>
          </LayoutSuspense>
        }
      />
      <Route
        path={`${PLANNER_LAYOUTS.LIST}/*`}
        element={
          <LayoutSuspense>
            <StatusRoutes>
              <EventListLayout />
              <ModalRoutes />
            </StatusRoutes>
          </LayoutSuspense>
        }
      />
      <Route
        path={`${PLANNER_LAYOUTS.FAVORITES}/*`}
        element={
          <LayoutSuspense>
            <StatusRoutes>
              <FavoriteEventsLayout />
              <ModalRoutes />
            </StatusRoutes>
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
  );
}, disableReRender);