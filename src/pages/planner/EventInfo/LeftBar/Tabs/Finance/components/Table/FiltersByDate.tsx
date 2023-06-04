import { AgreementDateFns } from '../../utils/types';
import {
  filterPatternArray,
  NumberFiltersPatternTitle,
} from './FiltersByNumber';
import { DatePicker } from '@components/DatePicker/DatePicker';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { useDebounce } from '@hooks/useDebounce';
import React, { FC, memo, useEffect, useState } from 'react';


export interface IFilterByDateState {
  pattern: keyof AgreementDateFns;
  value: Date | null;
}

interface FiltersByDateProps {
  onChange: (data: IFilterByDateState) => void;
  onDecline: () => void;
  initialState: IFilterByDateState;
}

export const FiltersByDate: FC<FiltersByDateProps> = memo(
  ({ onChange, initialState, onDecline }) => {
    const [state, setState] = useState<IFilterByDateState>(initialState);

    const debounceValue = useDebounce(state, 300);

    useEffect(() => {
      onChange(debounceValue);
    }, [debounceValue]);

    const [isOpen, setIsOpen] = useState(false);

    const patternHandler = (pattern: keyof AgreementDateFns) => {
      setState((prev) => ({
        ...prev,
        pattern,
      }));
    };

    return (
      <FlexBlock gap={4}>
        {/*<InputGroup>*/}
        <SelectInput
          containerProps={{ maxWidth: 40 }}
          style={{ paddingLeft: '8px' }}
          data={filterPatternArray}
          value={NumberFiltersPatternTitle[state.pattern]}
          renderData={(data, setIsOpenState) => (
            <SelectListContainer>
              {filterPatternArray.map((item) => (
                <SelectItemContainer
                  isSelected={state.pattern === item.value}
                  onClick={() => {
                    patternHandler(item.value);
                    setIsOpenState(false);
                  }}
                >
                  <CutText fontSize={14} rows={1}>
                    {item.title}
                  </CutText>
                </SelectItemContainer>
              ))}
            </SelectListContainer>
          )}
        />
        <DatePicker
          onDecline={() => {
            onDecline();
            setState((prev) => ({
              pattern: prev.pattern,
              value: null,
            }));
          }}
          useForceUpdateValue={true}
          currentDate={state?.value || null}
          placeholder={'Выберите дату'}
          onChange={(date) => {
            setState((prev) => ({
              ...prev,
              value: date,
            }));
          }}
        />
        {/*</InputGroup>*/}
      </FlexBlock>
    );
  }
);