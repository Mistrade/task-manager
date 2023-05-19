import React, { useState } from 'react';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { SettingsIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { currentColor } from '../../../common/constants/constants';
import { bubbleAnimation } from '../Groups/GroupItem';
import { GroupListShort } from '../Groups/GroupListShort';
import { OptionPanelCalendar } from './Calendar';
import { CalendarCurrentTitle } from './CalendarCurrentTitle';
import { CalendarHeaderAddButton } from './CalendarHeaderAddButton';
import { CalendarTodaySwitchers } from './CalendarTodaySwitchers';
import { PlannerSelectLayout } from './SelectLayout';

export const ShortPanelContent = () => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  return (
    <FlexBlock direction={'column'} gap={24} height={'100%'} minWidth={'100%'}>
      <FlexBlock width={'100%'} justify={'center'}>
        <PlannerSelectLayout pattern={'short'} />
      </FlexBlock>

      <FlexBlock
        width={'100%'}
        justify={'center'}
        align={'center'}
        direction={'column'}
        gap={24}
      >
        <FlexBlock
          width={'100%'}
          justify={'center'}
          position={'initial'}
          additionalCss={bubbleAnimation}
          style={{ zIndex: 1 }}
        >
          <CalendarHeaderAddButton pattern={'short'} />
        </FlexBlock>
        <Tooltip
          content={
            <FlexBlock direction={'column'} gap={12}>
              <CalendarCurrentTitle pattern={'short'} />
              <FlexBlock
                justify={'flex-start'}
                width={'100%'}
                p={`3px 12px`}
                shrink={0}
              >
                <CalendarTodaySwitchers />
              </FlexBlock>
              <OptionPanelCalendar />
            </FlexBlock>
          }
          theme={'light'}
          placement={'right-start'}
          delay={100}
          visible={tooltipIsOpen}
          onClickOutside={() => setTooltipIsOpen(false)}
          interactive={true}
          interactiveBorder={20}
        >
          <FlexBlock width={'100%'} additionalCss={bubbleAnimation}>
            <EmptyButtonStyled
              onClick={() => setTooltipIsOpen((prev) => !prev)}
            >
              <SettingsIcon size={30} color={currentColor} />
            </EmptyButtonStyled>
          </FlexBlock>
        </Tooltip>
      </FlexBlock>

      <FlexBlock width={'100%'} justify={'center'}>
        <GroupListShort />
      </FlexBlock>
    </FlexBlock>
  );
};
