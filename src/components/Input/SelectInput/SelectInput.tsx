import React, { ReactNode, useState } from 'react';

import { InputActions } from '@components/Input/InputSupportComponents/InputActions';
import { InputErrorMessage } from '@components/Input/InputSupportComponents/InputErrorMessage';
import {
  DefaultTextInputProps,
  TextInput,
} from '@components/Input/TextInput/TextInput';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';
import { Tooltip, TooltipProps } from '@components/Tooltip/Tooltip';


type ExtendableFromTextInput = Omit<DefaultTextInputProps, 'children'>;

export interface SelectInputProps<T> extends ExtendableFromTextInput {
  data: Array<T>;
  renderData: (
    data: Array<T>,
    setIsOpenState: (value: boolean) => void
  ) => ReactNode;
  multiple?: boolean;
  containerProps?: FlexBlockProps;
  selectContainerPlacement?: TooltipProps['placement'];
  selectContainerViewCondition?: boolean;
}

export function SelectInput<T>({
  renderData,
  data,
  containerProps,
  readOnly,
  onChange,
  actions,
  actionHandler,
  onDeleteAction,
  onFocus,
  onBlur,
  isDirty,
  errorMessage,
  selectContainerPlacement,
  selectContainerViewCondition = true,
  ...textInputProps
}: SelectInputProps<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FlexBlock {...containerProps} width={'100%'} direction={'column'} gap={6}>
      <Tooltip
        theme={'light'}
        delay={100}
        offset={[0, 5]}
        maxWidth={500}
        hideOnClick={true}
        placement={selectContainerPlacement || 'bottom-start'}
        arrow={false}
        visible={isOpen && selectContainerViewCondition}
        onClickOutside={() => setIsOpen(false)}
        interactive={true}
        interactiveBorder={20}
        content={renderData(data, setIsOpen)}
      >
        <TextInput
          readOnly={readOnly}
          onChange={!!readOnly ? undefined : onChange}
          {...textInputProps}
          onFocus={(e) => {
            onFocus && onFocus(e);
            setIsOpen(true);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
          }}
        />
      </Tooltip>
      <InputErrorMessage isDirty={isDirty} errorMessage={errorMessage} />
      <InputActions
        onDeleteAction={onDeleteAction}
        actions={actions}
        actionHandler={actionHandler}
      />
    </FlexBlock>
  );
}