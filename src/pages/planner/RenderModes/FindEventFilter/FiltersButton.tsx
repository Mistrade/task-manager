import { useAppSelector } from '@redux/hooks/hooks';
import {
  plannerSelectEventFilterPriority,
  plannerSelectEventFilterTitle,
} from '@selectors/planner';
import React, { memo, useState } from 'react';

import { delayedColor } from '@src/common/constants';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FiltersIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { CutText } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';
import { FilterForm } from '@planner/RenderModes/FindEventFilter/FilterForm';

export const FiltersButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const title = useAppSelector(plannerSelectEventFilterTitle);
  const priority = useAppSelector(plannerSelectEventFilterPriority);
  return (
    <Tooltip
      visible={isOpen}
      maxWidth={300}
      content={<FilterForm />}
      trigger={'click'}
      theme={'light'}
      interactiveBorder={10}
      interactive={true}
      arrow={false}
      onClickOutside={() => setIsOpen(false)}
      placement={'bottom-end'}
    >
      <FlexBlock p={4} minWidth={120} shrink={0} grow={1} position={'relative'}>
        <EmptyButtonStyled
          style={
            !isOpen && (title || priority)
              ? {
                  backgroundColor: delayedColor,
                }
              : {}
          }
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FlexBlock gap={6} align={'center'}>
            <CutText fontSize={15}>Фильтры</CutText>
            <FiltersIcon size={24} />
          </FlexBlock>
        </EmptyButtonStyled>
      </FlexBlock>
    </Tooltip>
  );
});
