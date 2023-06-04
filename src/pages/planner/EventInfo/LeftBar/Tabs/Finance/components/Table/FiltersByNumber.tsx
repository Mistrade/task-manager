import { AgreementNumberFns } from '../../utils/types';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { MRT_FilterFns } from 'material-react-table';
import React, { FC, memo, useEffect, useRef, useState } from 'react';


export enum FILTER_PATTERN_MAP {
  'MORE_OR_EQUAL' = '>=',
  'LESS_OR_EQUAL' = '=<',
  'EQUAL' = '=',
  'MORE' = '>',
  'LESS' = '<',
}

export const transformPatternToFilterFn: {
  [key in FILTER_PATTERN_MAP]: keyof typeof MRT_FilterFns;
} = {
  '>=': 'greaterThanOrEqualTo',
  '>': 'greaterThan',
  '=': 'equals',
  '=<': 'lessThanOrEqualTo',
  '<': 'lessThan',
};

type TFiltersPatternNames = {
  [key in keyof AgreementNumberFns]: string;
};

export const filtersPatternNames: TFiltersPatternNames = {
  equals: 'Строго равно',
  greaterThan: 'Строго больше, чем',
  lessThan: 'Строго меньше, чем',
  greaterThanOrEqualTo: 'Больше или равно',
  lessThanOrEqualTo: 'Меньше или равно',
};

export const NumberFiltersPatternTitle: TFiltersPatternNames = {
  equals: '=',
  greaterThan: '>',
  lessThan: '<',
  lessThanOrEqualTo: '=<',
  greaterThanOrEqualTo: '>=',
};

type TFilterPatternNamesObject = {
  value: keyof AgreementNumberFns;
  title: string;
};

export const filterPatternArray: Array<TFilterPatternNamesObject> =
  Object.entries(filtersPatternNames).map((item): TFilterPatternNamesObject => {
    return {
      value: item[0] as keyof AgreementNumberFns,
      title: item[1],
    };
  });

export interface IFilterByNumberState {
  pattern: FILTER_PATTERN_MAP;
  value: number;
}

interface State {
  pattern: keyof AgreementNumberFns;
  value: number | null;
}

interface FilterByNumberProps {
  onChange: (data: State) => void;
  initialState: State;
}

export const FiltersByNumber: FC<FilterByNumberProps> = memo(
  ({ onChange, initialState }) => {
    const [state, setState] = useState<State>(initialState);

    const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        onChange(state);
      }, 300);
    }, [state]);

    const patternHandler = (item: TFilterPatternNamesObject) => {
      setState((prev) => ({
        ...prev,
        pattern: item.value,
      }));

      setIsOpen(false);
    };

    const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;

      if (!isNaN(value)) {
        setState((prev) => ({
          ...prev,
          value,
        }));
      }
    };

    const [isOpen, setIsOpen] = useState(false);

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
                    patternHandler(item);
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
        <TextInput
          placeholder={'Значение'}
          value={`${state.value || ''}`}
          onChange={valueHandler}
        />
        {/*</InputGroup>*/}
      </FlexBlock>
    );
  }
);