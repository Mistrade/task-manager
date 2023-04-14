import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Heading } from '@components/Text/Heading';
import { OptionPanelCalendar } from '@planner/OptionsPanel/Calendar';
import { disableReRender } from '@src/common/utils/react-utils';
import { FC, memo } from 'react';
import { TaskCreatedMessage } from '../SupportsComponent/TaskCreatedMessage';

interface TaskInformerRightBarProps {
  eventInfo: EventInfoModel;
}

export const TaskInformerRightBar: FC<TaskInformerRightBarProps> = memo(
  ({ eventInfo }) => {
    return (
      <FlexBlock
        flex={'0 0 300px'}
        width={'fit-content'}
        justify={'flex-start'}
        align={'flex-start'}
        direction={'column'}
        gap={12}
        pl={8}
      >
        <FlexBlock mb={6}>
          <Heading.H2 style={{ textAlign: 'left', fontSize: 16 }}>
            График месяца
          </Heading.H2>
        </FlexBlock>
        <OptionPanelCalendar />
        <TaskCreatedMessage eventInfo={eventInfo} />
      </FlexBlock>
    );
  },
  disableReRender
);
