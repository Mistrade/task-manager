import { InputGroup } from '@components/Input/InputGroup';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';
import { useDebounce } from '@hooks/useDebounce';
import { FC, useEffect, useState } from 'react';


interface FiltersByTextProps {
  onChange: (value: string) => void;
  initialValue: string;
}

enum titles {
  'includesString' = 'Содержит',
  'startsWith' = 'Начинается с',
  'endsWith' = 'Заканчивается на',
  'equalsString' = 'Совпадает с',
}

export const FiltersByText: FC<FiltersByTextProps> = ({
  onChange,
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue);
  const [pattern, setPattern] = useState<keyof typeof titles>('includesString');

  const debounceValue = useDebounce(value, 300);

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  return (
    <FlexBlock gap={6}>
      <InputGroup>
        <SelectInput
          containerProps={{ width: 'fit-content', maxWidth: 100 }}
          data={[
            { title: 'Содержит', pattern: 'includesString' },
            { title: 'Начинается с', pattern: 'startsWith' },
            { title: 'Заканчивается на', pattern: 'endsWith' },
            { title: 'Совпадает с', pattern: 'equalsString' },
          ]}
          readOnly={true}
          value={titles[pattern]}
          renderData={(data) => (
            <SelectListContainer>
              {data.map((item) => {
                return (
                  <SelectItemContainer
                    onClick={() =>
                      setPattern(item.pattern as keyof typeof titles)
                    }
                  >
                    {item.title}
                  </SelectItemContainer>
                );
              })}
            </SelectListContainer>
          )}
        />
        <TextInput
          placeholder={titles[pattern]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </InputGroup>
    </FlexBlock>
  );
};