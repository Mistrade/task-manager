import { resetEventFiltersState } from '@planner-reducer/index';
import { useAppDispatch } from '@redux/hooks/hooks';
import React, { memo } from 'react';

import { Button } from '@components/Buttons/Buttons.styled';
import { Checkbox } from '@components/Input/Checkbox/Checkbox';
import { FlexBlock } from '@components/LayoutComponents';

import { EventFilterPriorityInput } from '@planner/RenderModes/FindEventFilter/Fields/Priority';
import { EventFilterTitleInput } from '@planner/RenderModes/FindEventFilter/Fields/Title';


export const FilterForm = memo(() => {
  const dispatch = useAppDispatch();

  return (
    <FlexBlock direction={'column'} gap={12} width={280} p={'12px 4px 6px 4px'}>
      <EventFilterTitleInput />
      <EventFilterPriorityInput />
      <Checkbox
        type={'checkbox'}
        title={'(D) Скрыть события с участниками'}
        id={'events-with-members-filter'}
        onChange={() => {}}
        iconProps={{
          size: 20,
        }}
      />
      <Checkbox
        onChange={() => {}}
        type={'checkbox'}
        title={'(D) Только сквозные события'}
        id={'events-with-members-filter'}
        iconProps={{
          size: 20,
        }}
      />
      <FlexBlock width={'100%'} justify={'center'} align={'center'}>
        <Button
          type={'button'}
          onClick={() => dispatch(resetEventFiltersState())}
        >
          Очистить фильтры (TODO DEBOUNCE)
        </Button>
      </FlexBlock>
    </FlexBlock>
  );
});