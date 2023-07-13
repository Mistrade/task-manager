import { TaskCreatedMessage } from '../SupportsComponent/TaskCreatedMessage';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { FlexBlock } from '@components/LayoutComponents';
import { Heading } from '@components/Text/Heading';
import { OptionPanelCalendar } from '@planner/Panel/Calendar';
import { disableReRender } from '@src/common/utils/react-utils';
import { FC, memo } from 'react';
import styled from 'styled-components';


interface TaskInformerRightBarProps {
  eventInfo: EventInfoModel;
}

const Container = styled('div')`
  display: flex;
  width: fit-content;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;
  padding-left: 8px;
  flex-shrink: 0;
  flex-grow: 0;
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