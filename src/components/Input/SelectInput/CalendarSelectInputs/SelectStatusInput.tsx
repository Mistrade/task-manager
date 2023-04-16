import { FC, useMemo } from 'react';

import { TaskStatusesList, TaskStatusesTitles } from '@src/common/constants';

import { EventIcon } from '@components/Icons/EventIcon';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { DefaultTextInputProps } from '@components/Input/TextInput/TextInput';
import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';

import { EventFilterTaskStatuses } from '@planner/RenderModes/FindEventFilter/find-event-filters.types';


interface SelectStatusInputProps
  extends Partial<Omit<DefaultTextInputProps, 'onChange'>> {
  selected: EventFilterTaskStatuses | null;
  onChange?: (key: EventFilterTaskStatuses) => void;
  containerProps?: FlexBlockProps;
  inputId?: string;
}

export const SelectStatusInput: FC<SelectStatusInputProps> = ({
  selected,
  onChange,
  containerProps,
  inputId,
  ...inputProps
}) => {
  const Statuses: Array<{ type: EventFilterTaskStatuses; title: string }> =
    useMemo(() => {
      return TaskStatusesList;
    }, []);

  return (
    <SelectInput
      {...inputProps}
      containerProps={containerProps}
      inputId={inputId || 'select_status'}
      data={Statuses}
      label={'Выберите статус'}
      icon={selected && <EventIcon status={selected} />}
      renderData={(data) => (
        <>
          <SelectListContainer>
            {data.map((item) => (
              <SelectItemContainer
                key={'status_' + item.type}
                isSelected={item.type === selected}
                onClick={() => {
                  onChange && onChange(item.type);
                }}
              >
                <EventIcon status={item.type} />
                <span>{item.title}</span>
              </SelectItemContainer>
            ))}
          </SelectListContainer>
        </>
      )}
      readOnly={true}
      value={selected ? TaskStatusesTitles[selected] : ''}
    />
  );
};