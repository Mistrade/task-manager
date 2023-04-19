import React, { ReactNode, forwardRef } from 'react';
import { css, keyframes } from 'styled-components';

import { StyledInput } from '@components/Input/Input.styled';
import {
  InputActions,
  InputActionsProps,
} from '@components/Input/InputSupportComponents/InputActions';
import {
  InputErrorMessage,
  InputErrorMessageProps,
} from '@components/Input/InputSupportComponents/InputErrorMessage';
import {
  InputIconContainer,
  InputIconContainerProps,
} from '@components/Input/InputSupportComponents/InputIconContainer';
import {
  InputLabel,
  InputLabelProps,
} from '@components/Input/InputSupportComponents/InputLabel';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';

export interface DefaultTextInputProps
  extends InputErrorMessageProps,
    InputActionsProps,
    InputIconContainerProps,
    InputLabelProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  children?: ReactNode;
  readOnly?: boolean;
  type?: HTMLInputElement['type'];
  buttons?: ReactNode;
}

export interface TextInputProps extends DefaultTextInputProps {
  containerProps?: FlexBlockProps;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputAnimation = keyframes`
  from {
    opacity: .5;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fromRightToLeftAnimation = css`
  animation: ${InputAnimation} 0.3s ease-in-out forwards;
`;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type,
      value,
      onBlur,
      onFocus,
      onChange,
      label,
      placeholder,
      isDirty,
      errorMessage,
      children,
      readOnly,
      inputId,
      containerProps,
      icon,
      actions,
      actionHandler,
      iconPlacement = 'right',
      onDeleteAction,
      isLoading,
      tooltip,
      onClick,
      buttons,
      onKeyUp,
      onKeyDown,
    },
    ref
  ) => {
    return (
      <FlexBlock
        {...containerProps}
        additionalCss={fromRightToLeftAnimation}
        width={'100%'}
        position={'relative'}
        direction={'column'}
      >
        <InputLabel inputId={inputId} label={label} tooltip={tooltip} />
        <FlexBlock
          width={'100%'}
          mb={(isDirty && errorMessage) || (actions && actionHandler) ? 6 : 0}
          direction={'row'}
          align={'center'}
          gap={6}
        >
          <FlexBlock position={'relative'} width={'100%'} align={'center'}>
            <StyledInput
              type={type}
              hasIcon={!!icon}
              id={inputId}
              ref={ref}
              isError={isDirty && !!errorMessage}
              iconPlacement={iconPlacement}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              readOnly={!!readOnly}
              onClick={onClick}
              onKeyUp={onKeyUp}
              onKeyDown={onKeyDown}
              onPaste={(e) => {
                console.log(e);
              }}
            />
            <InputIconContainer
              icon={icon}
              iconPlacement={iconPlacement}
              isLoading={isLoading}
            />
            {children && (
              <FlexBlock position={'relative'} width={'100%'}>
                {children}
              </FlexBlock>
            )}
          </FlexBlock>
          {buttons}
        </FlexBlock>
        <InputErrorMessage isDirty={isDirty} errorMessage={errorMessage} />
        <InputActions
          actions={actions}
          actionHandler={actionHandler}
          onDeleteAction={onDeleteAction}
        />
      </FlexBlock>
    );
  }
);
