import { FC } from 'react';

import Badge from '@components/Badge';
import { ReplyContent } from '@components/Essences/EventEssence/event-essence.styled';
import { Text } from '@components/Text/Text';

import { BaseEventHistoryFieldProps } from '../event-history.types';

export const HistoryTitleField: FC<BaseEventHistoryFieldProps<string>> = ({
  value,
}) => {
  return (
    <ReplyContent gap={6} align={'center'}>
      <Text htmlTag={'span'}>Обновленное значение</Text>
      <Badge type={'primary'}>{value}</Badge>
    </ReplyContent>
  );
};
