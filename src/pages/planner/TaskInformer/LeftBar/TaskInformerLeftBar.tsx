import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { EventInfoBaseProps } from '@planner/planner.types';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectEventInfoTabName } from '@selectors/planner';
import { disabledColor } from '@src/common/constants';
import { FC } from 'react';
import { EventInfoUpdateFn } from '../SupportsComponent/ToggleTaskInformerButtons';
import { EventInfoAboutTab } from './Tabs/About/EventInfoAboutTab';
import { EventChainsTab } from './Tabs/Chains/EventChainsTab';
import { EventCheckList } from './Tabs/EventCheckList/EventCheckList';
import { TaskComments } from './Tabs/TaskComments/TaskComments';
import { TaskHistory } from './Tabs/TaskHistory/TaskHistory';
import { TaskMembers } from './Tabs/TaskMembers/TaskMembers';

interface TaskInformerLeftBarProps extends EventInfoBaseProps {
  updateFn: EventInfoUpdateFn;
}

export enum EVENT_INFORMER_TAB_NAMES {
  'ABOUT' = 'about',
  'CHAINS' = 'chains',
  'HISTORY' = 'history',
  'MEMBERS' = 'members',
  'COMMENTS' = 'comments',
  'CHECK_LIST' = 'checkList',
}

export const TaskInformerLeftBar: FC<TaskInformerLeftBarProps> = ({
  eventInfo,
  updateFn,
}) => {
  const tabName = useAppSelector(plannerSelectEventInfoTabName);

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
      <FlexBlock height={'100%'} mt={4}>
        <FlexBlock width={'100%'} height={'100%'} direction={'column'}>
          {tabName === EVENT_INFORMER_TAB_NAMES.ABOUT && (
            <EventInfoAboutTab eventInfo={eventInfo} updateFn={updateFn} />
          )}
          {tabName === EVENT_INFORMER_TAB_NAMES.CHAINS && (
            <EventChainsTab taskItem={eventInfo} />
          )}
          {tabName === EVENT_INFORMER_TAB_NAMES.HISTORY && (
            <TaskHistory taskInfo={eventInfo} />
          )}
          {tabName === EVENT_INFORMER_TAB_NAMES.MEMBERS && (
            <TaskMembers taskItem={eventInfo} />
          )}
          {tabName === EVENT_INFORMER_TAB_NAMES.COMMENTS && (
            <TaskComments taskInfo={eventInfo} />
          )}
          {tabName === EVENT_INFORMER_TAB_NAMES.CHECK_LIST && (
            <EventCheckList eventInfo={eventInfo} />
          )}
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};
