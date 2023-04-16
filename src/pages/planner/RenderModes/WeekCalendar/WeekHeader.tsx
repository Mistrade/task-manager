import dayjs from 'dayjs';
import { memo, useMemo } from 'react';

import { currentColor, orangeColor } from '@src/common/constants';

import { Badge } from '@components/Badge/Badge';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Heading } from '@components/Text/Heading';

import { WeekItem } from '@planner/planner.types';


export const WeekHeader = memo<{ config: WeekItem }>(
  ({ config }) => {
    const isCurrent = useMemo(
      () => config.weekOfYear === dayjs().week(),
      [config.weekOfYear]
    );

    return (
      <Heading.H2 style={{ color: currentColor, fontSize: 18 }}>
        <FlexBlock direction={'row'} gap={6}>
          {[
            `Неделя ${config.weekOfYear}`,
            isCurrent ? (
              <Badge
                style={{
                  fontWeight: 'normal',
                  backgroundColor: orangeColor,
                  color: '#fff',
                }}
              >
                сегодня
              </Badge>
            ) : (
              <></>
            ),
          ]}
        </FlexBlock>
      </Heading.H2>
    );
  },
  (prev, next) => prev.config.weekOfYear === next.config.weekOfYear
);