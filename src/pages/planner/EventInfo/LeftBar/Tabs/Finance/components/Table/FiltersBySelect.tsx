import { FINANCE_OPERATION_TITLES } from '../index';
import { FINANCE_OPERATION_TYPES } from '@api/finance-api/types';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { CutText } from '@components/Text/Text';
import { useDebounce } from '@hooks/useDebounce';
import { FC, useEffect, useState } from 'react';


interface FiltersBySelectProps {
  onChange: (data: FINANCE_OPERATION_TYPES | null) => void;
  initialState: FINANCE_OPERATION_TYPES | null;
}

export const FiltersBySelect: FC<FiltersBySelectProps> = ({
  onChange,
  initialState,
}) => {
  const [state, setState] = useState<FINANCE_OPERATION_TYPES | null>(
    initialState
  );

  const debounceValue = useDebounce(state, 300);

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  return (
    <SelectInput
      placeholder={'Тип операции'}
      data={[
        { text: 'Доход', value: FINANCE_OPERATION_TYPES.INCOME },
        {
          text: 'Расход',
          value: FINANCE_OPERATION_TYPES.CONSUMPTION,
        },
        {
          text: 'Не выбрано',
          value: null,
        },
      ]}
      selectContainerViewCondition={true}
      renderData={(data, setIsOpenState) => (
        <SelectListContainer>
          {data.map((item) => (
            <SelectItemContainer
              onClick={() => {
                setState(item.value);
                setIsOpenState(false);
              }}
            >
              <CutText rows={1} fontSize={14}>
                {item.text}
              </CutText>
            </SelectItemContainer>
          ))}
        </SelectListContainer>
      )}
      value={state ? FINANCE_OPERATION_TITLES[state] : ''}
    />
  );
};