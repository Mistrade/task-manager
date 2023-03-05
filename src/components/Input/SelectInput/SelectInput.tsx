import React, {ReactNode, RefObject} from 'react'
import {FlexBlock, FlexBlockProps} from '../../LayoutComponents/FlexBlock'
import {DefaultTextInputProps, TextInput} from '../TextInput/TextInput'
import {DropDown} from '../Dropdown/DropDown'
import {InputActions} from "../InputSupportComponents/InputActions";
import {InputErrorMessage} from "../InputSupportComponents/InputErrorMessage";
import {DropDownAdditionalMethods} from "../Dropdown/types";
import {Tooltip} from "../../Tooltip/Tooltip";

type ExtendableFromTextInput = Omit<DefaultTextInputProps, 'children'>

export interface SelectInputProps<T> extends ExtendableFromTextInput {
	data: T,
	renderData: (data: T) => ReactNode,
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
			<Tooltip
				theme={'light'}
				delay={100}
				offset={[0, 15]}
				maxWidth={500}
				hideOnClick={true}
				placement={'bottom'}
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
						onFocus && onFocus(e)
					}}
					onBlur={(e) => {
						onBlur && onBlur(e)
					}}
				/>
			</Tooltip>
			<InputErrorMessage isDirty={isDirty} errorMessage={errorMessage}/>
			<InputActions onDeleteAction={onDeleteAction} actions={actions} actionHandler={actionHandler}/>
		</FlexBlock>
	)
}
