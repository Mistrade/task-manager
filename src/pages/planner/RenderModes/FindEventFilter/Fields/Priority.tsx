import { useDebounce } from '@hooks/useDebounce';
import { changeEventFilterPriority } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectEventFilterPriority } from '@selectors/planner';
import React, { memo, useEffect, useState } from 'react';

import { SelectPriorityInput } from '@components/Input/SelectInput/CalendarSelectInputs/SelectPriorityInput';

import { CalendarPriorityKeys } from '@planner/planner.types';

export const EventFilterPriorityInput = memo(() => {
  const initial = useAppSelector(plannerSelectEventFilterPriority);
  const dispatch = useAppDispatch();
  const [priority, setPriority] = useState<CalendarPriorityKeys | null>(
    initial
  );
  const debouncePriority = useDebounce(priority, 700);

  useEffect(() => {
    dispatch(changeEventFilterPriority(debouncePriority));
  }, [debouncePriority]);

  return (
    <SelectPriorityInput
      useClearItem={true}
      selected={priority}
      onChange={(item) => setPriority(item)}
      label={'Приоритет'}
      placeholder={'Приоритет сужает поиск'}
    />
  );
});
