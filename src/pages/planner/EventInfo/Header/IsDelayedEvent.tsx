import Badge from '@components/Badge';
import { Tooltip } from 'chernikov-kit';
import React, { FC, memo } from 'react';

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
        <Badge type={'delayed'} isInteractive={true}>
          Просрочено
        </Badge>
      </Tooltip>
    );
  },
  (p, n) => p.isDelayed === n.isDelayed
);