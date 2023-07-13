import { useAppSelector } from '@redux/hooks/hooks';
import { selectUserInfo } from '@selectors/session-selectors';
import React, { FC, lazy } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { LOADER_TITLES, SERVICES_NAMES } from '@src/common/constants/enums';
import { disableReRender } from '@src/common/utils/react-utils';
import { SessionInterceptor } from '@src/routes/Interceptors/SessionInterceptor';
import { FaqRoutes } from '@src/routes/Routes/FaqRoutes';
import { ProfileRoutes } from '@src/routes/Routes/ProfileRoutes';
import { SessionRoutes } from '@src/routes/Routes/SessionRoutes';

import { LayoutSuspense } from '@components/Loaders/LayoutSuspense';

import { FriendsPage } from '@pages/friends';
import { NotFoundPage } from '@pages/notFound/NotFoundPage';

import { PlannerPage } from '@planner/index';

const Planner = lazy(() =>
  import('@planner/index').then(({ PlannerPage }) => ({
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
            <LayoutSuspense title={LOADER_TITLES.SERVICE_SUSPENSE}>
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
            <LayoutSuspense title={LOADER_TITLES.SERVICE_SUSPENSE}>
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
