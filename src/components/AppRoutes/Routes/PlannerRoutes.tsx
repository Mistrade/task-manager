import { Routes } from 'react-router-dom';
import { Navigate, Route } from 'react-router';
import { SessionInterceptor } from '../Interceptors/SessionInterceptor';
import React, { FC, useContext } from 'react';
import { Loader } from '../../Loaders/Loader';
import { UserInfoContext } from '../../../Context/userInfo.context';
import {
  DEFAULT_PLANNER_LAYOUT,
  DEFAULT_PLANNER_STATUS,
  ERROR_DESCRIPTIONS,
  ERROR_TITLES,
} from '../../../common/constants';
import { ErrorBoundary } from '../../Errors/ErrorBoundary';
import { ServicesNames } from '../../../store/reducers/global';

const PlannerPage = React.lazy(() =>
  import('../../../pages/Planner').then(({ PlannerController }) => ({
    default: PlannerController,
  }))
);

export const PlannerRoutes: FC = () => {
  const userInfo = useContext(UserInfoContext);

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
                <PlannerPage />
              </React.Suspense>
            }
          />
        </Routes>
      </SessionInterceptor>
    </ErrorBoundary>
  );
};
