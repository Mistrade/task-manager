import { setPlannerStatus } from '@planner-reducer/index';
import { plannerDateToSearchParams } from '@planner-reducer/utils';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate, plannerSelectStatus } from '@selectors/planner';
import React, { FC, memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { TaskStatusesList } from '@src/common/constants/signatures';

import { FlexBlock } from '@components/LayoutComponents';
import { Switcher } from '@components/Switcher/Switcher';

import { FindEventsInput } from '@planner/Filters/Fields/FindEventsInput';
import { FiltersButton } from '@planner/Filters/FiltersButton';

export const TaskListEventFiltersContainer = styled('div')`
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  background-color: #fff;
  gap: 12px;
  top: 0;
  left: 0;
  width: 100%;
`;

export const FindEventFilter: FC = memo(() => {
  const status = useAppSelector(plannerSelectStatus);
  const dispatch = useAppDispatch();
  const date = useAppSelector(plannerSelectDate);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(plannerDateToSearchParams(date));
  }, [date]);

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
