import React, { FC } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import { NotFoundPage } from '../../pages/NotFound/NotFoundPage';
import { PlannerRoutes } from './Routes/PlannerRoutes';
import { ProfileRoutes } from './Routes/ProfileRoutes';
import { FaqRoutes } from './Routes/FaqRoutes';
import { FriendsRoutes } from './Routes/FriendsRoutes';
import { SessionRoutes } from './Routes/SessionRoutes';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={'planner/*'} element={<PlannerRoutes />} />
      <Route path={'profile/*'} element={<ProfileRoutes />} />
      <Route path={'faq/*'} element={<FaqRoutes />} />
      <Route path={'contacts/*'} element={<FriendsRoutes />} />
      <Route path={'session/*'} element={<SessionRoutes />} />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
};
