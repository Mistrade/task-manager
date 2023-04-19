import React, { FC, memo } from 'react';

import { orangeColor } from '@src/common/constants/constants';

import { TimeBadge } from '@components/Badge/Badge';
import { Tooltip } from '@components/Tooltip/Tooltip';

export interface IIsDelayedEventProps {
  isDelayed: boolean;
}

export const IsDelayedEvent: FC<IIsDelayedEventProps> = memo(
  ({ isDelayed }) => {
    if (!isDelayed) {
      return <></>;
    }

    return (
      <Tooltip
        content={
          'Событие считается просроченным, когда текущее время становится позже даты завершения события. Сравнение происходит в минутах.'
        }
        theme={'light'}
        delay={[100, 200]}
        placement={'bottom'}
      >
        <TimeBadge style={{ backgroundColor: orangeColor }}>
          Просрочено
        </TimeBadge>
      </Tooltip>
    );
  },
  (p, n) => p.isDelayed === n.isDelayed
);
