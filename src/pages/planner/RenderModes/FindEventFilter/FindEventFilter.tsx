import { setPlannerStatus } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectStatus } from '@selectors/planner';
import React, { FC, memo } from 'react';

import { TaskStatusesList } from '@src/common/constants';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Switcher } from '@components/Switcher/Switcher';

import { TaskListEventFiltersContainer } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';
import { FindEventsInput } from '@planner/RenderModes/FindEventFilter/Fields/FindEventsInput';
import { FiltersButton } from '@planner/RenderModes/FindEventFilter/FiltersButton';

export const FindEventFilter: FC = memo(() => {
  const status = useAppSelector(plannerSelectStatus);
  const dispatch = useAppDispatch();
  return (
    <TaskListEventFiltersContainer>
      <FlexBlock width={'100%'} gap={2} position={'relative'} direction={'row'}>
        <Switcher
          selected={status}
          switchersList={TaskStatusesList}
          onClick={(item) => dispatch(setPlannerStatus(item.type))}
        />
        <FindEventsInput />
        <FiltersButton />
      </FlexBlock>
    </TaskListEventFiltersContainer>
  );
});
