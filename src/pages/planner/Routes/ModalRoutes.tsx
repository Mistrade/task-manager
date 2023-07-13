import React, { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TaskInfoModal } from '@src/pages/planner/EventInfo/TaskInfoModal';

import { CreateEventFromPlanner } from '@planner/Forms/CreateEvent/CreateEventFromPlanner';
import { CreateOrUpdateGroupModal } from '@planner/Groups/Create/CreateOrUpdateGroup';
import { RemoveGroupModal } from '@planner/Groups/Remove/RemoveGroupModal';
import { UpdateGroupInfoHock } from '@planner/Groups/Update/Hock';

const ModalRoutes: FC = () => {
  return (
    <Routes>
      <Route path={':layout/*'}>
        <Route path={'group'}>
          <Route path={'create'} element={<CreateOrUpdateGroupModal />} />
          <Route path={'remove/:groupId'} element={<RemoveGroupModal />} />
          <Route path={'update/:groupId'} element={<UpdateGroupInfoHock />} />
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
