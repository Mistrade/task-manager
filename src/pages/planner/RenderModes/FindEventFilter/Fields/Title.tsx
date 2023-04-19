import { useDebounce } from '@hooks/useDebounce';
import { changeEventFilterTitle } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectEventFilterTitle } from '@selectors/planner';
import React, { memo, useEffect, useState } from 'react';

import { TextInput } from '@components/Input/TextInput/TextInput';

export const EventFilterTitleInput = memo(() => {
  const initialTitle = useAppSelector(plannerSelectEventFilterTitle);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(initialTitle);
  const debounceTitle = useDebounce(title, 700);

  useEffect(() => {
    dispatch(changeEventFilterTitle(debounceTitle));
  }, [debounceTitle]);

  return (
    <TextInput
      value={title || ''}
      onChange={(e) => setTitle(e.target.value)}
      label={'Название'}
      placeholder={'Найдем совпадения по названию'}
    />
  );
});
