import { FC } from 'react';

import { ReplyContent } from '@components/Essences/EventEssence/event-essence.styled';
import { Text } from '@components/Text/Text';

import { EventGroupButton } from '@planner/EventInfo/SupportsComponent/EventGroupButton';

import { GroupModelResponse } from '@api/planning-api/types/groups.types';

import { BaseEventHistoryFieldProps } from '../event-history.types';


export const HistoryGroupField: FC<
  BaseEventHistoryFieldProps<GroupModelResponse | null>
> = ({ value }) => {
  return (
    <ReplyContent gap={6} align={'center'}>
      <Text htmlTag={'span'}>Обновленное значение</Text>
      <EventGroupButton
        isDisabled={true}
        stopPropagation={true}
        group={value}
        renderText={true}
      />
    </ReplyContent>
  );
};