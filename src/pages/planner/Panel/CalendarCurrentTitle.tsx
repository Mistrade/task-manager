import React, { FC } from 'react';

import { disabledColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { FlexBlock } from '@components/LayoutComponents';

import { PanelDateHeader } from '@planner/Panel/PanelDateHeader';

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
