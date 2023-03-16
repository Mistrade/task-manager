import { DefaultTextInputProps } from '../../TextInput/TextInput';
import { FlexBlockProps } from '../../../LayoutComponents/FlexBlock';
import { FC, useMemo } from 'react';
import {
  TaskStatusesList,
  TaskStatusesTitles,
} from '../../../../common/constants';
import { SelectInput } from '../SelectInput';
import { SelectListContainer } from '../SelectListContainer';
import { SelectItemContainer } from '../SelectItemContainer';
import { EventIcon } from '../../../Icons/EventIcon';
import { EventFilterTaskStatuses } from '../../../../pages/Planner/RenderModes/FindEventFilter/find-event-filters.types';

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
