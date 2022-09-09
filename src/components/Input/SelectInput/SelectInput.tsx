import React, {ReactNode, useCallback, useRef, useState} from 'react'
import {FlexBlock, FlexBlockProps} from '../../LayoutComponents/FlexBlock'
import {DefaultTextInputProps, TextInput} from '../TextInput/TextInput'
import {DropDown} from '../../Dropdown/DropDown'
import {InputActions} from "../InputSupportComponents/InputActions";
import {InputErrorMessage} from "../InputSupportComponents/InputErrorMessage";
import {DropDownAdditionalMethods} from "../../Dropdown/types";

type ExtendableFromTextInput = Omit<DefaultTextInputProps, 'children'>

export interface SelectInputProps<T> extends ExtendableFromTextInput {
	data: T,
	renderData: (data: T, methods: DropDownAdditionalMethods) => ReactNode,
	multiple?: boolean,
	containerProps?: FlexBlockProps,
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
		<FlexBlock
			{...containerProps}
			width={'100%'}
			direction={'column'}
			gap={6}
		>
			<DropDown
				dropDownChildren={(methods) => renderData(data, methods)}
				renderElement={({ref, onElementFocused, onElementBlur}) => (
					<TextInput
						ref={ref}
						readOnly={readOnly}
						onChange={!!readOnly ? undefined : onChange}
						{...textInputProps}
						onFocus={(e) => {
							onFocus && onFocus(e)
							onElementFocused(e)
						}}
						onBlur={(e) => {
							onBlur && onBlur(e)
							onElementBlur(e)
						}}
					/>
				)}
			/>
			<InputErrorMessage isDirty={isDirty} errorMessage={errorMessage}/>
			<InputActions onDeleteAction={onDeleteAction} actions={actions} actionHandler={actionHandler}/>
		</FlexBlock>
	)
}
