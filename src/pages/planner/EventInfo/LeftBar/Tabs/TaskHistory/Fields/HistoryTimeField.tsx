import dayjs from 'dayjs';
import { FC } from 'react';

import { DateHelper } from '@src/common/calendarSupport/dateHelper';

import Badge from '@components/Badge';
import { ReplyContent } from '@components/Essences/EventEssence/event-essence.styled';
import { Text } from '@components/Text/Text';

import { BaseEventHistoryFieldProps } from '../event-history.types';

export const HistoryTimeField: FC<
  BaseEventHistoryFieldProps<Date | null | string | undefined>
> = ({ value }) => {
  const date = dayjs(value);

  if (date.isValid()) {
    return (
      <ReplyContent align={'center'} gap={6}>
        <Text htmlTag={'span'}>Обновленное значение</Text>
        <Badge type={'primary'}>
          {DateHelper.getHumanizeDateValue(date.toDate(), {
            withTime: true,
            monthPattern: 'full',
          })}
        </Badge>
      </ReplyContent>
    );
  }

  return (
    <ReplyContent align={'center'}>
      <Text htmlTag={'span'}>Значение невалидно или удалено</Text>
    </ReplyContent>
  );
};
