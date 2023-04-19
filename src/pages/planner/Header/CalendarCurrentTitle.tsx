import React, { FC } from 'react';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { disabledColor } from '@src/common/constants';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { PanelDateHeader } from '@planner/OptionsPanel/PanelDateHeader';

import { CalendarHeaderAddButton } from './CalendarHeaderAddButton';
import { CalendarTodaySwitchers } from './CalendarTodaySwitchers';

export const CalendarCurrentTitle: FC = React.memo(
  () => {
    return (
      <FlexBlock
        direction={'column'}
        gap={4}
        border={`1px solid ${disabledColor}`}
        width={'100%'}
        borderRadius={borderRadiusSize.sm}
        pt={6}
        pb={6}
      >
        <FlexBlock justify={'center'} width={'100%'} p={`3px 12px`}>
          <CalendarHeaderAddButton />
        </FlexBlock>
        <PanelDateHeader />
        <FlexBlock justify={'center'} width={'100%'} p={`3px 12px`}>
          <CalendarTodaySwitchers />
        </FlexBlock>
      </FlexBlock>
    );
  },
  () => true
);
