import Badge from '@components/Badge';
import { DatePickerSwitch } from '@components/DatePicker/DatePickerSwitch';
import { FlexBlock } from '@components/LayoutComponents';
import { SmallCalendarMonthTitleProps } from '@planner/types';
import { MonthList, ShortMonthList } from '@src/common/constants/constants';
import { kitColors } from 'chernikov-kit';
import { FC, memo } from 'react';


export const SmallCalendarMonthTitle: FC<SmallCalendarMonthTitleProps> = memo(
  ({ monthItem, onClick, renderYear, isCurrentMonth, onChange }) => {
    return (
      <FlexBlock
        justify={'center'}
        align={'center'}
        width={'100%'}
        style={{ color: kitColors.primary, fontSize: 18, cursor: 'pointer' }}
        mb={8}
        gap={6}
        onClick={() => onClick && onClick(monthItem)}
      >
        {onChange ? (
          <FlexBlock width={'100%'} justify={'center'}>
            <DatePickerSwitch
              onChange={onChange}
              centerElement={
                <FlexBlock>
                  {ShortMonthList[monthItem.monthOfYear]}
                  {renderYear && ` ${monthItem.year} г.`}
                </FlexBlock>
              }
            />
          </FlexBlock>
        ) : (
          <FlexBlock>
            {MonthList[monthItem.monthOfYear]}
            {renderYear && ` ${monthItem.year} г.`}
          </FlexBlock>
        )}
        {isCurrentMonth && (
          <FlexBlock>
            <Badge type={'delayed'}>сегодня</Badge>
          </FlexBlock>
        )}
      </FlexBlock>
    );
  }
);