import { FC, useState } from 'react';

import {
  TextInput,
  TextInputProps,
} from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Tag } from '@components/Tags/Tag';


type ExtendableProps = Omit<
  TextInputProps,
  | 'value'
  | 'onChange'
  | 'onDeleteAction'
  | 'actions'
  | 'actionHandler'
  | 'type'
  | 'children'
>;

export interface TagInputProps extends ExtendableProps {
  tags: Array<string>;

  onAddTag(tagName: string): void;
}

export const TagInput: FC<TagInputProps> = ({
  tags,
  onAddTag,
  ...inputProps
}) => {
  const [value, setValue] = useState('');
  return (
    <FlexBlock direction={'column'} gap={4} grow={3}>
      <TextInput
        {...inputProps}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            return onAddTag(value);
          }
        }}
      />
      <FlexBlock pl={8} wrap={'wrap'} gap={4}>
        <Tag onRemove={() => {}}>1234231421</Tag>
      </FlexBlock>
    </FlexBlock>
  );
};