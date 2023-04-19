import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectEventInfoTabName } from '@selectors/planner';
import { FC, useMemo } from 'react';
import styled from 'styled-components';

import { disabledColor } from '@src/common/constants/constants';
import { EVENT_INFORMER_TAB_NAMES } from '@src/common/constants/enums';

import { FlexBlock } from '@components/LayoutComponents';

import { EventInfoBaseProps } from '@planner/types';

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

const Container = styled('div')`
  display: flex;
  flex: 1 0 calc(100% - 312px);
  border-right: 1px solid ${disabledColor};
  padding-right: 20px;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  gap: 12px;
`;

export const TaskInformerLeftBar: FC<TaskInformerLeftBarProps> = ({
  eventInfo,
  updateFn,
}) => {
  const tabName = useAppSelector(plannerSelectEventInfoTabName);

  const content = useMemo(() => {
    switch (tabName) {
      case EVENT_INFORMER_TAB_NAMES.ABOUT:
        return <EventInfoAboutTab eventInfo={eventInfo} updateFn={updateFn} />;
      case EVENT_INFORMER_TAB_NAMES.CHECK_LIST:
        return <EventCheckList eventInfo={eventInfo} />;
      case EVENT_INFORMER_TAB_NAMES.HISTORY:
        return <TaskHistory taskInfo={eventInfo} />;
      case EVENT_INFORMER_TAB_NAMES.COMMENTS:
        return <TaskComments taskInfo={eventInfo} />;
      case EVENT_INFORMER_TAB_NAMES.MEMBERS:
        return <TaskMembers taskItem={eventInfo} />;
      case EVENT_INFORMER_TAB_NAMES.CHAINS:
        return <EventChainsTab taskItem={eventInfo} />;
      default:
        return <></>;
    }
  }, [tabName, eventInfo]);

  return (
    <Container>
      <FlexBlock height={'100%'} mt={4}>
        <FlexBlock width={'100%'} height={'100%'} direction={'column'}>
          {content}
        </FlexBlock>
      </FlexBlock>
    </Container>
  );
};
