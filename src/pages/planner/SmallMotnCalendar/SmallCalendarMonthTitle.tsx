import { FC, memo } from 'react';
import { SmallCalendarMonthTitleProps } from '@planner/planner.types';
import { currentColor, MonthList } from '@src/common/constants';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

export const SmallCalendarMonthTitle: FC<SmallCalendarMonthTitleProps> = memo(
  ({ monthItem, onClick, renderYear }) => {
    return (
      <FlexBlock
        justify={'flex-start'}
        width={'100%'}
        pl={28}
        style={{ color: currentColor, fontSize: 18, cursor: 'pointer' }}
        mb={8}
        onClick={() => onClick && onClick(monthItem)}
      >
        {MonthList[monthItem.monthOfYear]?.toLowerCase()}
        {renderYear && ` ${monthItem.year} г.`}
      </FlexBlock>
    );
  }
);
