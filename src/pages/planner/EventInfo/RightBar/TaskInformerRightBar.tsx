import { FC, memo } from 'react';
import styled from 'styled-components';

import { disableReRender } from '@src/common/utils/react-utils';

import { FlexBlock } from '@components/LayoutComponents';
import { Heading } from '@components/Text/Heading';

import { OptionPanelCalendar } from '@planner/Panel/Calendar';

import { EventInfoModel } from '@api/planning-api/types/event-info.types';

import { TaskCreatedMessage } from '../SupportsComponent/TaskCreatedMessage';

interface TaskInformerRightBarProps {
  eventInfo: EventInfoModel;
}

const Container = styled('div')`
  display: flex;
  flex: 0 0 300px;
  width: fit-content;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;
  padding-left: 8px;
`;

export const TaskInformerRightBar: FC<TaskInformerRightBarProps> = memo(
  ({ eventInfo }) => {
    return (
      <Container>
        <FlexBlock mb={6}>
          <Heading.H2 style={{ textAlign: 'left', fontSize: 16 }}>
            График месяца
          </Heading.H2>
        </FlexBlock>
        <OptionPanelCalendar />
        <TaskCreatedMessage eventInfo={eventInfo} />
      </Container>
    );
  },
  disableReRender
);
