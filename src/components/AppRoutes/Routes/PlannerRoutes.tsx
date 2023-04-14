import { SessionInterceptor } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { ErrorBoundary } from '@components/Errors/ErrorBoundary';
import { Loader } from '@components/Loaders/Loader';
import { useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import { selectUserInfo } from '@redux/reducers/session/session-selectors';
import {
  DEFAULT_PLANNER_LAYOUT,
  DEFAULT_PLANNER_STATUS,
  ERROR_DESCRIPTIONS,
  ERROR_TITLES,
} from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { FC } from 'react';
import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router-dom';

// const PlannerPage = React.lazy(() =>
//   import('../../../pages/planner').then(({ PlannerController }) => ({
//     default: PlannerController,
//   }))
// );

export const PlannerRoutes: FC = React.memo(() => {
  const userInfo = useAppSelector(selectUserInfo);

  return (
    <ErrorBoundary
      title={ERROR_TITLES['CALENDAR_RENDER']}
      description={ERROR_DESCRIPTIONS['PLANNER_RENDER']}
      errorType={'SYSTEM_ERROR'}
      action={{
        title: 'Обновить страницу',
        onClick() {
          window.location.reload();
        },
      }}
    >
      <SessionInterceptor userInfo={userInfo}>
        <Routes>
          <Route
            index
            element={
              <Navigate
                to={`/${ServicesNames.PLANNER}/${DEFAULT_PLANNER_LAYOUT}/${DEFAULT_PLANNER_STATUS}`}
              />
            }
          />
          <Route
            path={':layout/*'}
            element={
              <React.Suspense
                fallback={
                  <Loader
                    title={'Загрузка сервиса планирования'}
                    isActive={true}
                  />
                }
              >
                {/*<PlannerPage />*/}
              </React.Suspense>
            }
          />
        </Routes>
      </SessionInterceptor>
    </ErrorBoundary>
  );
}, disableReRender);
