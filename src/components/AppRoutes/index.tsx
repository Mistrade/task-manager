import React, { FC } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import { ServicesNames } from '@redux/reducers/global';
import { NotFoundPage } from '@pages/NotFound/NotFoundPage';
import { PlannerRoutes } from '@components/AppRoutes/Routes/PlannerRoutes';
import { ProfileRoutes } from '@components/AppRoutes/Routes/ProfileRoutes';
import { FaqRoutes } from '@components/AppRoutes/Routes/FaqRoutes';
import { FriendsRoutes } from '@components/AppRoutes/Routes/FriendsRoutes';
import { SessionRoutes } from '@components/AppRoutes/Routes/SessionRoutes';
import { disableReRender } from '@src/common/utils/react-utils';

export const AppRoutes: FC = React.memo(() => {
  return (
    <Routes>
      <Route path={`${ServicesNames.PLANNER}/*`} element={<PlannerRoutes />} />
      <Route path={'profile/*'} element={<ProfileRoutes />} />
      <Route path={'faq/*'} element={<FaqRoutes />} />
      <Route path={`${ServicesNames.FRIENDS}/*`} element={<FriendsRoutes />} />
      <Route path={'session/*'} element={<SessionRoutes />} />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
}, disableReRender);
