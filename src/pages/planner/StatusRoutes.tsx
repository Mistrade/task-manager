import { FCWithChildren } from '@planner/planner.types';
import { DEFAULT_PLANNER_STATUS } from '@src/common/constants';
import { memo } from 'react';
import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router-dom';

export const StatusRoutes: FCWithChildren = memo(({ children }) => {
  return (
    <Routes>
      <Route index={true} element={<Navigate to={DEFAULT_PLANNER_STATUS} />} />
      <Route path={':taskStatus/*'} element={children} />
    </Routes>
  );
});