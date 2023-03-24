import { FC } from 'react';
import { BaseEventHistoryFieldProps } from '../event-history.types';
import { EventPriorityButton } from '../../../../SupportsComponent/EventPriorityButton';
import { CalendarPriorityKeys } from '../../../../../planner.types';
import { ReplyContent } from '../../../../../../../components/Essences/EventEssence/event-essence.styled';
import { Text } from '../../../../../../../components/Text/Text';

export const HistoryPriorityField: FC<
  BaseEventHistoryFieldProps<CalendarPriorityKeys | null>
> = ({ value }) => {
  return (
    <ReplyContent align={'center'} gap={6}>
      <Text htmlTag={'span'}>Обновленное значение</Text>
      <EventPriorityButton
        iconProps={{ size: 20 }}
        priority={value}
        renderText={true}
        isDisabled={true}
        stopPropagation={true}
      />
    </ReplyContent>
  );
};
