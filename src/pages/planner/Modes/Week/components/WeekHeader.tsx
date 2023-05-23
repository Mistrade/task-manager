import dayjs from 'dayjs';
import { memo, useMemo } from 'react';

import { StyledBadge } from '@components/Badge/styled';
import { FlexBlock } from '@components/LayoutComponents';
import { Heading } from '@components/Text/Heading';

import {
  currentColor,
  orangeColor,
} from '../../../../../common/constants/constants';
import { WeekItem } from '../../../types';

export const WeekHeader = memo<{ config: WeekItem }>(
  ({ config }) => {
    const isCurrent = useMemo(
      () => config.weekOfYear === dayjs().week(),
      [config.weekOfYear]
    );

    return (
      <Heading.H2 style={{ color: currentColor, fontSize: 18 }}>
        <FlexBlock direction={'row'} gap={6}>
          Неделя {config.weekOfYear}
          {isCurrent ? (
            <StyledBadge
              style={{
                fontWeight: 'normal',
                backgroundColor: orangeColor,
                color: '#fff',
              }}
            >
              сегодня
            </StyledBadge>
          ) : (
            <></>
          )}
        </FlexBlock>
      </Heading.H2>
    );
  },
  (prev, next) => prev.config.weekOfYear === next.config.weekOfYear
);
