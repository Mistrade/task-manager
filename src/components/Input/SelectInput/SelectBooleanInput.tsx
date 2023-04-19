import { TextInputProps } from '@components/Input/TextInput/TextInput';

import { SelectBooleanInputDataItem } from '@planner/types';

import { SelectInput } from './SelectInput';
import { SelectItemContainer } from './SelectItemContainer';
import { SelectListContainer } from './SelectListContainer';

interface SelectBooleanInputProps<T extends SelectBooleanInputDataItem>
  extends Omit<TextInputProps, 'onChange' | 'readOnly' | 'value'> {
  onChange?: (data: T) => void;
  data: Array<T>;
  selected?: T;
}

export function SelectBooleanInput<T extends SelectBooleanInputDataItem>(
  props: SelectBooleanInputProps<T>
): JSX.Element {
  const { data, onChange, selected, ...otherProps } = props;
  return (
    <SelectInput
      {...otherProps}
      readOnly={true}
      data={data}
      icon={selected?.icon}
      value={selected?.title || ''}
      renderData={(data) => (
        <SelectListContainer>
          {data.map((item) => (
            <SelectItemContainer
              key={item.title}
              onClick={() => onChange && onChange(item)}
              isSelected={
                item.title.toLowerCase() === selected?.title.toLowerCase()
              }
            >
              {item.icon || ''}
              <span>{item.title}</span>
            </SelectItemContainer>
          ))}
        </SelectListContainer>
      )}
    />
  );
}
