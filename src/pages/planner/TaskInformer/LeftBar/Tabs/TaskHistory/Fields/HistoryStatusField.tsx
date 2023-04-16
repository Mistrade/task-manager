import { FC } from 'react';

import { ReplyContent } from '@components/Essences/EventEssence/event-essence.styled';
import { Text } from '@components/Text/Text';

import { EventStatusButton } from '@planner/TaskInformer/SupportsComponent/EventStatusButton';
import { TaskStatusesType } from '@planner/planner.types';

import { BaseEventHistoryFieldProps } from '../event-history.types';


export const HistoryStatusField: FC<
  BaseEventHistoryFieldProps<TaskStatusesType | null>
> = ({ value }) => {
  return (
    <ReplyContent gap={6} align={'center'}>
      <Text htmlTag={'span'}>Обновленное значение</Text>
      <EventStatusButton
        renderText={true}
        isDisabled={true}
        status={value}
        stopPropagation={true}
        iconProps={{
          size: 20,
        }}
      />
    </ReplyContent>
  );
};