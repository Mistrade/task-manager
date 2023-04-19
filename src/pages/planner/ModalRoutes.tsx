import React, { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CreateEventFromPlanner } from '@planner/Forms/CreateEvent/CreateEventFromPlanner';

import { CreateOrUpdateGroupModal } from './Groups/CreateOrUpdateGroup';
import { UpdateGroupInfoHock } from './Groups/UpdateGroupInfoHock';
import { TaskInfoModal } from './TaskInformer/TaskInfoModal';

const ModalRoutes: FC = () => {
  return (
    <Routes>
      <Route path={':layout/*'}>
        <Route path={'group'}>
          <Route path={'create'} element={<CreateOrUpdateGroupModal />} />
          <Route path={':groupId'} element={<UpdateGroupInfoHock />} />
        </Route>
        <Route path={'event'}>
          <Route path={'create'} element={<CreateEventFromPlanner />} />
          <Route path={'info/:taskId/*'} element={<TaskInfoModal />} />
        </Route>
      </Route>
    </Routes>
  );
};

export const ModalRoutesMemo = memo(ModalRoutes);
