import React, { FC, forwardRef, ReactNode } from 'react'
import { FlexBlock, FlexBlockProps } from '../LayoutComponents/FlexBlock'
import { StyledInput, StyledLabel } from './Input.styled'
import { css } from 'styled-components'
import { ArrowIndicator } from '../Calendars/Cell'
import { SwitchCalendarMode, TimeSelectorButton } from '../Calendars/Calendar.styled'
import { CalendarModeSwitchers } from '../Calendars/Header/CalendarModeSwitchers'
import { LoaderIcon } from '../Icons/Icons'

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
  actionHandler?: ( action: TextInputAdditionalAction ) => void,
  onDeleteAction?: ( action: TextInputAdditionalAction ) => void,
  isLoading?: boolean,
  tooltip?: ReactNode
}

export interface TextInputAdditionalAction {
  title: string,
  actionKey: string,
}

export interface TextInputProps extends DefaultTextInputProps {
  containerProps?: FlexBlockProps,
  onClick?: ( e: React.MouseEvent<HTMLInputElement> ) => void
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
                                                                           iconPlacement = 'right',
                                                                           onDeleteAction,
                                                                           isLoading,
                                                                           tooltip,
                                                                           onClick
                                                                         }, ref ) => {

  //Добавить иконку с действием - очистить
  return (
    <FlexBlock
      {...containerProps}
      width={'100%'}
      position={'relative'}
      direction={'column'}
    >
      <FlexBlock
        width={'100%'}
        align={'center'}
        justify={'flex-start'}
        mb={8}
        pl={6}
        pr={6}
        gap={6}
      >
        <StyledLabel htmlFor={inputId}>
          {label}
        </StyledLabel>
        {tooltip || ''}
      </FlexBlock>
      <FlexBlock
        position={'relative'}
        width={'100%'}
        mb={( isDirty && errorMessage ) || ( actions && actionHandler ) ? 6 : 0}
        direction={'column'}
      >
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
          onClick={onClick}
        />
        {( icon || isLoading ) && (
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
            {isLoading ? <LoaderIcon/> : icon || ''}
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
              //TODO написать отдельный компонент для InputAction, со своей стилизацией и опционально сделать набор иконок!
              style={{ margin: 0 }}
              type={'button'}
              onClick={() => actionHandler( action )}
            >
              {action.title}
              {onDeleteAction && (
                <span
                  style={{ marginLeft: 10, display: 'block' }}
                  onClick={() => onDeleteAction( action )}
                >
                  х
                </span>
              )}
            </SwitchCalendarMode>
          ) )}
        </FlexBlock>
      )}
    </FlexBlock>
  )
} )
