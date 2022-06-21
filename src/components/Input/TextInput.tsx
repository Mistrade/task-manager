import React, { FC, forwardRef, ReactNode } from 'react'
import { FlexBlock, FlexBlockProps } from '../LayoutComponents/FlexBlock'
import { StyledInput, StyledLabel } from './Input.styled'
import { css } from 'styled-components'
import { ArrowIndicator } from '../Calendars/Cell'
import { SwitchCalendarMode, TimeSelectorButton } from '../Calendars/Calendar.styled'
import { CalendarModeSwitchers } from '../Calendars/Header/CalendarModeSwitchers'

export interface DefaultTextInputProps {
  inputId?: string
  label?: ReactNode
  value: string,
  onChange?: ( e: React.ChangeEvent<HTMLInputElement> ) => void,
  onBlur?: ( e: React.FocusEvent<HTMLInputElement> ) => void,
  onFocus?: ( e: React.FocusEvent<HTMLInputElement> ) => void,
  placeholder?: string,
  isDirty?: boolean,
  errorMessage?: ReactNode,
  children?: ReactNode,
  readOnly?: boolean,
  icon?: ReactNode,
  iconPlacement?: 'left' | 'right',
  actions?: Array<TextInputAdditionalAction>,
  actionHandler?: ( action: TextInputAdditionalAction ) => void
}

export interface TextInputAdditionalAction {
  title: string,
  actionKey: string,
}

export interface TextInputProps extends DefaultTextInputProps {
  containerProps?: FlexBlockProps
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>( ( {
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
                                                                           iconPlacement = 'right'
                                                                         }, ref ) => {
  return (
    <FlexBlock
      {...containerProps}
      width={'100%'}
      position={'relative'}
      direction={'column'}
    >
      <StyledLabel htmlFor={inputId}>
        {label}
      </StyledLabel>
      <FlexBlock position={'relative'} width={'100%'} mb={6} direction={'column'}>
        <StyledInput
          hasIcon={!!icon}
          id={inputId}
          ref={ref}
          iconPlacement={iconPlacement}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          readOnly={!!readOnly}
        />
        {icon && (
          <FlexBlock
            position={'absolute'}
            height={30}
            width={30}
            overflow={'hidden'}
            justify={iconPlacement === 'right' ? 'flex-end' : 'center'}
            align={'center'}
            additionalCss={css`
              top: 50%;
              transform: translateY(-50%);
              ${iconPlacement === 'right' ? css`right: 10px` : css`left: 10px;`};
            `}
          >
            {icon}
          </FlexBlock>
        )}

        {children && (
          <FlexBlock position={'relative'} width={'100%'}>
            {children}
          </FlexBlock>
        )}
      </FlexBlock>
      {isDirty && errorMessage && (
        <FlexBlock
          pl={8}
          pr={8}
          mb={6}
          width={'100%'}
          position={'relative'}
          additionalCss={css`
            color: #ff5e5e;
            font-size: 12px;
            font-weight: bold
          `}
        >
          {errorMessage}
        </FlexBlock>
      )}
      {actions && actionHandler && (
        <FlexBlock gap={6} mb={6} pl={8} pr={8} width={'100%'} justify={'flex-start'} wrap={'wrap'}>
          {actions.map( action => (
            <SwitchCalendarMode
              style={{ margin: 0 }}
              type={'button'}
              onClick={() => actionHandler( action )}
            >
              {action.title}
            </SwitchCalendarMode>
          ) )}
        </FlexBlock>
      )}
    </FlexBlock>
  )
} )
