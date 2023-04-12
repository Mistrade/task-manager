import { FC } from 'react';
import { ReplyContent } from '@components/Essences/EventEssence/event-essence.styled';
import { BaseEventHistoryFieldProps } from '../event-history.types';
import { Text } from '@components/Text/Text';
import { TimeBadge } from '@components/Badge/Badge';

export const HistoryTitleField: FC<BaseEventHistoryFieldProps<string>> = ({
  value,
}) => {
  return (
    <ReplyContent gap={6} align={'center'}>
      <Text htmlTag={'span'}>Обновленное значение</Text>
      <TimeBadge>{value}</TimeBadge>
    </ReplyContent>
  );
};
