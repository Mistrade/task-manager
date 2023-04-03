import { Route, Routes } from 'react-router-dom';
import { UpdateGroupInfoHock } from './Groups/UpdateGroupInfoHock';
import { CreateOrUpdateGroupModal } from './Groups/CreateOrUpdateGroup';
import { CreateEventModal } from './Forms/CreateEvent/CreateEventModal';
import { TaskInfoModal } from './CalendarModals/TaskInfoModal';
import React from 'react';

export const ModalRoutes = () => {
  return (
    <Routes>
      <Route path={'group'}>
        <Route path={'create'} element={<CreateOrUpdateGroupModal />} />
        <Route path={':groupId'} element={<UpdateGroupInfoHock />} />
      </Route>
      <Route path={'event'}>
        <Route path={'create'} element={<CreateEventModal />} />
        <Route path={'info/:taskId/*'} element={<TaskInfoModal />} />
      </Route>
    </Routes>
  );
};
