import { Routes } from 'react-router-dom';
import { Navigate, Route } from 'react-router';
import { SessionInterceptor } from '../Interceptors/SessionInterceptor';
import React, { FC } from 'react';
import { Loader } from '../../Loaders/Loader';
import { OnlyAuthRoutesProps } from '../index';

const PlannerPage = React.lazy(() =>
  import('../../../pages/Planner').then(({ PlannerController }) => ({
    default: PlannerController,
  }))
);

export const PlannerRoutes: FC<OnlyAuthRoutesProps> = ({ userInfo }) => {
  return (
    <SessionInterceptor userInfo={userInfo}>
      <Routes>
        <Route index element={<Navigate to={'/planner/day/in_progress'} />} />
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
  );
};
