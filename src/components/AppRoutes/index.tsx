import React, { FC } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import { NotFoundPage } from '../../pages/NotFound/NotFoundPage';
import { UserModel } from '../../store/api/session-api/session-api.types';
import { PlannerRoutes } from './Routes/PlannerRoutes';
import { ProfileRoutes } from './Routes/ProfileRoutes';
import { FaqRoutes } from './Routes/FaqRoutes';
import { FriendsRoutes } from './Routes/FriendsRoutes';
import { SessionRoutes } from './Routes/SessionRoutes';

export interface OnlyAuthRoutesProps {
  userInfo?: UserModel | null;
}

export const AppRoutes: FC<OnlyAuthRoutesProps> = ({ userInfo }) => {
  return (
    <Routes>
      <Route
        path={'planner/*'}
        element={<PlannerRoutes userInfo={userInfo} />}
      />
      <Route
        path={'profile/*'}
        element={<ProfileRoutes userInfo={userInfo} />}
      />
      <Route path={'faq/*'} element={<FaqRoutes />} />
      <Route path={'contacts/*'} element={<FriendsRoutes />} />
      <Route path={'session/*'} element={<SessionRoutes />} />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
};
