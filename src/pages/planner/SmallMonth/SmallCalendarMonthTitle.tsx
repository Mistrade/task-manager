import { FC, memo } from 'react';

import { MonthList, currentColor } from '@src/common/constants/constants';

import Badge from '@components/Badge';
import { FlexBlock } from '@components/LayoutComponents';

import { SmallCalendarMonthTitleProps } from '@planner/types';

export const SmallCalendarMonthTitle: FC<SmallCalendarMonthTitleProps> = memo(
  ({ monthItem, onClick, renderYear, isCurrentMonth }) => {
    return (
      <FlexBlock
        justify={'flex-start'}
        width={'100%'}
        pl={28}
        style={{ color: currentColor, fontSize: 18, cursor: 'pointer' }}
        mb={8}
        gap={6}
        onClick={() => onClick && onClick(monthItem)}
      >
        <FlexBlock>
          {MonthList[monthItem.monthOfYear]}
          {renderYear && ` ${monthItem.year} г.`}
        </FlexBlock>
        {isCurrentMonth && (
          <FlexBlock>
            <Badge type={'delayed'}>сегодня</Badge>
          </FlexBlock>
        )}
      </FlexBlock>
    );
  }
);
