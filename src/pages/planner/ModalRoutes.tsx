import { CreateEventFromPlanner } from '@planner/Forms/CreateEventFromPlanner';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TaskInfoModal } from './CalendarModals/TaskInfoModal';
import { CreateOrUpdateGroupModal } from './Groups/CreateOrUpdateGroup';
import { UpdateGroupInfoHock } from './Groups/UpdateGroupInfoHock';

export const ModalRoutes = () => {
  return (
    <Routes>
      <Route path={'group'}>
        <Route path={'create'} element={<CreateOrUpdateGroupModal />} />
        <Route path={':groupId'} element={<UpdateGroupInfoHock />} />
      </Route>
      <Route path={'event'}>
        <Route path={'create'} element={<CreateEventFromPlanner />} />
        <Route path={'info/:taskId/*'} element={<TaskInfoModal />} />
      </Route>
    </Routes>
  );
};