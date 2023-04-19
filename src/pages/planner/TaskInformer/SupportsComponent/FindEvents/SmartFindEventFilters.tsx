import React, { FC } from 'react';

import { DatePicker } from '@components/DatePicker/DatePicker';
import { SelectPriorityInput } from '@components/Input/SelectInput/CalendarSelectInputs/SelectPriorityInput';
import { SelectStatusInput } from '@components/Input/SelectInput/CalendarSelectInputs/SelectStatusInput';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';

import { FormHandle } from '../../../RenderModes/FindEventFilter/find-event-filters.types';


export const SmartFindEventFilters: FC<FormHandle> = ({
  values,
  onChangeHandlers,
  onFocusHandlers,
}) => {
  return (
    <FlexBlock gap={6} direction={'column'} width={'100%'}>
      <FlexBlock direction={'row'} gap={6}>
        <SelectPriorityInput
          useClearItem={true}
          selected={values.priority || null}
          onChange={onChangeHandlers.priority}
          onFocus={(e) => onFocusHandlers && onFocusHandlers('priority', e)}
          label={'Приоритет'}
          placeholder={'Приоритет сужает поиск'}
        />
        <TextInput
          value={values.title || ''}
          onChange={(e) => onChangeHandlers.title(e.target.value)}
          onFocus={(e) => onFocusHandlers && onFocusHandlers('title', e)}
          label={'Название'}
          placeholder={'Найдем совпадения по названию'}
        />
        <SelectStatusInput
          selected={values.taskStatus || null}
          onChange={onChangeHandlers.taskStatus}
          onFocus={(e) => onFocusHandlers && onFocusHandlers('taskStatus', e)}
          label={'Статус'}
          placeholder={'Статус сужает поиск'}
        />
      </FlexBlock>
      <FlexBlock direction={'row'} gap={6}>
        <DatePicker
          onDecline={() => onChangeHandlers.start(null)}
          useForceUpdateValue={false}
          currentDate={values.start}
          onChange={onChangeHandlers.start}
          onFocus={(e) => onFocusHandlers && onFocusHandlers('start', e)}
          label={'Начало события'}
        />
        <DatePicker
          onDecline={() => onChangeHandlers.end(null)}
          useForceUpdateValue={false}
          currentDate={values.end}
          onChange={onChangeHandlers.end}
          onFocus={(e) => onFocusHandlers && onFocusHandlers('end', e)}
          label={'Конец события'}
        />
      </FlexBlock>
    </FlexBlock>
  );
};