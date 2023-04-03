import { EventInfoBaseProps } from '../../planner.types';
import { EventInfoUpdateFn } from '../SupportsComponent/ToggleTaskInformerButtons';
import { FC } from 'react';
import { TaskInformerSwitchersKeys } from '../SupportsComponent/TaskInformerSwitchers';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { disabledColor } from '../../../../common/constants';
import { EventInfoAboutTab } from './Tabs/About/EventInfoAboutTab';
import { EventChainsTab } from './Tabs/Chains/EventChainsTab';
import { TaskHistory } from './Tabs/TaskHistory/TaskHistory';
import { TaskMembers } from './Tabs/TaskMembers/TaskMembers';
import { TaskComments } from './Tabs/TaskComments/TaskComments';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import { NotFoundPage } from '../../../NotFound/NotFoundPage';

interface TaskInformerLeftBarProps extends EventInfoBaseProps {
  updateFn: EventInfoUpdateFn;
  switcher: TaskInformerSwitchersKeys;
}

export enum EVENT_INFORMER_TAB_NAMES {
  'ABOUT' = 'about',
  'CHAINS' = 'chains',
  'HISTORY' = 'history',
  'MEMBERS' = 'members',
  'COMMENTS' = 'comments',
}

export const TaskInformerLeftBar: FC<TaskInformerLeftBarProps> = ({
  eventInfo,
  updateFn,
  switcher,
}) => {
  return (
    <FlexBlock
      flex={'1 0 calc(100% - 312px)'}
      borderRight={`1px solid ${disabledColor}`}
      pr={20}
      direction={'column'}
      height={'100%'}
      justify={'flex-start'}
      gap={12}
    >
      <FlexBlock
        height={'100%'}
        // overflow={'hidden'}
        mt={4}
      >
        <FlexBlock width={'100%'} height={'100%'} direction={'column'}>
          <Routes>
            <Route
              path={EVENT_INFORMER_TAB_NAMES.ABOUT}
              element={
                <EventInfoAboutTab eventInfo={eventInfo} updateFn={updateFn} />
              }
            />
            <Route
              path={EVENT_INFORMER_TAB_NAMES.CHAINS}
              element={
                <EventChainsTab taskItem={eventInfo} updateFn={updateFn} />
              }
            />
            <Route
              path={EVENT_INFORMER_TAB_NAMES.HISTORY}
              element={<TaskHistory taskInfo={eventInfo} />}
            />
            <Route
              path={EVENT_INFORMER_TAB_NAMES.MEMBERS}
              element={<TaskMembers taskItem={eventInfo} />}
            />
            <Route
              path={EVENT_INFORMER_TAB_NAMES.COMMENTS}
              element={<TaskComments taskInfo={eventInfo} />}
            />
            <Route path={'*'} element={<NotFoundPage />} />
          </Routes>
          {/*{switcher === 'about' ? (*/}
          {/*  <EventInfoAboutTab eventInfo={eventInfo} updateFn={updateFn} />*/}
          {/*) : switcher === 'chains' ? (*/}
          {/*  <EventChainsTab taskItem={eventInfo} updateFn={updateFn} />*/}
          {/*) : switcher === 'history' ? (*/}
          {/*  <TaskHistory taskInfo={eventInfo} />*/}
          {/*) : switcher === 'members' ? (*/}
          {/*  <TaskMembers taskItem={eventInfo} />*/}
          {/*) : switcher === 'comments' ? (*/}
          {/*  <TaskComments taskInfo={eventInfo} />*/}
          {/*) : (*/}
          {/*  <>{switcher}</>*/}
          {/*)}*/}
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};
