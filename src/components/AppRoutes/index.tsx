import { useAppSelector } from '@redux/hooks/hooks';
import { selectUserInfo } from '@redux/reducers/session/session-selectors';
import React, { FC, lazy } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { SERVICES_NAMES } from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';

import { SessionInterceptor } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { FaqRoutes } from '@components/AppRoutes/Routes/FaqRoutes';
import { ProfileRoutes } from '@components/AppRoutes/Routes/ProfileRoutes';
import { SessionRoutes } from '@components/AppRoutes/Routes/SessionRoutes';

import { FriendsPage } from '@pages/Friends/index';
import { LayoutSuspense } from '@pages/LayoutSuspense';
import { NotFoundPage } from '@pages/NotFound/NotFoundPage';

import { PlannerPage } from '@planner/Planner';

const Planner = lazy(() =>
  import('@planner/Planner').then(({ PlannerPage }) => ({
    default: PlannerPage,
  }))
);

export const AppRoutes: FC = React.memo(() => {
  const userInfo = useAppSelector(selectUserInfo);
  return (
    <Routes>
      <Route
        path={`${SERVICES_NAMES.PLANNER}/*`}
        element={
          <SessionInterceptor userInfo={userInfo}>
            <LayoutSuspense>
              <Planner />
            </LayoutSuspense>
          </SessionInterceptor>
        }
      />
      <Route path={`${SERVICES_NAMES.PROFILE}/*`} element={<ProfileRoutes />} />
      <Route path={`${SERVICES_NAMES.FAQ}/*`} element={<FaqRoutes />} />
      <Route
        path={`${SERVICES_NAMES.FRIENDS}/*`}
        element={
          <SessionInterceptor userInfo={userInfo}>
            <LayoutSuspense title={'Загрузка сервиса...'}>
              <FriendsPage />
            </LayoutSuspense>
          </SessionInterceptor>
        }
      />
      <Route path={`${SERVICES_NAMES.SESSION}/*`} element={<SessionRoutes />} />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
}, disableReRender);
