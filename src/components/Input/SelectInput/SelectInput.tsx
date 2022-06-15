import React, { FC, ReactNode, useCallback, useRef, useState } from 'react'
import { FlexBlock, FlexBlockProps } from '../../LayoutComponents/FlexBlock'
import { DefaultTextInputProps, TextInput } from '../TextInput'
import { css } from 'styled-components'

type ExtendableFromTextInput = Omit<DefaultTextInputProps, 'children'>

export interface SelectInputProps<T> extends ExtendableFromTextInput {
  data: T,
  renderData: ( data: T, methods: SelectInputMethods ) => ReactNode,
  multiple?: boolean,
  containerProps?: FlexBlockProps,
}

interface SelectInputMethods {
  focusOut: () => void
}

export function SelectInput<T>( props: SelectInputProps<T> ): JSX.Element {

  const { renderData, data, containerProps, ...textInputProps } = props
  const [focus, setFocus] = useState( false )
  const ref = useRef<HTMLDivElement | null>( null )
  const inputRef = useRef<HTMLInputElement>( null )

  const focusHandler = useCallback( ( e: React.FocusEvent<HTMLInputElement> ) => {
    if( e.type === 'focus' ) {
      return setFocus( true )
    }

    if( e.type === 'blur' ) {
      const relTarget = e.relatedTarget

      if( !relTarget || !ref.current?.contains( relTarget ) ) {
        return setFocus( false )
      }

      return inputRef.current?.focus()
    }
  }, [ref.current, setFocus] )

  const [methods, setMethods] = useState<SelectInputMethods>( {
    focusOut: () => setFocus( false )
  } )

  return (
    <FlexBlock
      {...containerProps}
      ref={ref}
      tabIndex={1}
      width={'100%'}
    >
      <TextInput
        ref={inputRef}
        {...textInputProps}
        onFocus={focusHandler}
        onBlur={focusHandler}
      >
        {focus && (
          <FlexBlock
            position={'absolute'}
            additionalCss={css`
              top: 100%;
              left: 0;
              z-index: 1;
            `}
          >
            {renderData( data, methods )}
          </FlexBlock>
        )}
      </TextInput>
    </FlexBlock>
  )
}
