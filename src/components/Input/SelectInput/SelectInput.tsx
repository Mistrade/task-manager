import React, { ReactNode } from 'react';

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
import { Tooltip } from '@components/Tooltip/Tooltip';


type ExtendableFromTextInput = Omit<DefaultTextInputProps, 'children'>;

export interface SelectInputProps<T> extends ExtendableFromTextInput {
  data: T;
  renderData: (data: T) => ReactNode;
  multiple?: boolean;
  containerProps?: FlexBlockProps;
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
  ...textInputProps
}: SelectInputProps<T>): JSX.Element {
  return (
    <FlexBlock {...containerProps} width={'100%'} direction={'column'} gap={6}>
      <Tooltip
        theme={'light'}
        delay={100}
        offset={[0, 5]}
        maxWidth={500}
        hideOnClick={true}
        placement={'bottom-start'}
        arrow={false}
        trigger={'click'}
        interactive={true}
        interactiveBorder={20}
        content={renderData(data)}
      >
        <TextInput
          readOnly={readOnly}
          onChange={!!readOnly ? undefined : onChange}
          {...textInputProps}
          onFocus={(e) => {
            onFocus && onFocus(e);
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