import { FC, useMemo } from 'react';

import {
  PRIORITY_LIST,
  PRIORITY_TITLES,
} from '@src/common/constants/constants';

import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { DefaultTextInputProps } from '@components/Input/TextInput/TextInput';
import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';

import {
  CalendarPriorityKeys,
  CalendarPriorityList,
} from '@planner/types';

interface SelectPriorityInputProps
  extends Partial<Omit<DefaultTextInputProps, 'onChange'>> {
  selected: CalendarPriorityKeys | null;
  onChange?: (key: CalendarPriorityKeys | null) => void;
  containerProps?: FlexBlockProps;
  inputId?: string;
  useClearItem?: boolean;
}

export const SelectPriorityInput: FC<SelectPriorityInputProps> = ({
  selected,
  onChange,
  containerProps,
  inputId,
  useClearItem = false,
  ...inputProps
}) => {
  const PRIORITY: CalendarPriorityList = useMemo(() => {
    return useClearItem
      ? [
          ...PRIORITY_LIST,
          { type: 'not_selected', title: PRIORITY_TITLES.not_selected },
        ]
      : PRIORITY_LIST;
  }, [useClearItem]);

  return (
    <SelectInput
      {...inputProps}
      containerProps={containerProps}
      inputId={inputId || 'select_priority'}
      data={PRIORITY}
      label={'Приоритет'}
      icon={selected && <PriorityCalendarIcon priorityKey={selected} />}
      renderData={(data) => (
        <>
          <SelectListContainer>
            {data.map((item) => (
              <SelectItemContainer
                key={'priority_' + item.type}
                isSelected={item.type === selected}
                onClick={() => {
                  onChange && onChange(item.type);
                }}
              >
                <PriorityCalendarIcon
                  priorityKey={item.type}
                  isCompleted={false}
                />
                <span>{item.title}</span>
              </SelectItemContainer>
            ))}
          </SelectListContainer>
        </>
      )}
      readOnly={true}
      value={selected ? PRIORITY_TITLES[selected] : ''}
    />
  );
};
