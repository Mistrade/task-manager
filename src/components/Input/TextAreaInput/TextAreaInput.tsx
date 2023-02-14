import {TextInputProps} from "../TextInput/TextInput";
import React, {FC} from "react";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {StyledTextAreaInput} from "../Input.styled";
import {InputLabel} from "../InputSupportComponents/InputLabel";
import {InputErrorMessage} from "../InputSupportComponents/InputErrorMessage";

type ExtendableTextInputKeys =
	'actions'
	| "actionHandler"
	| 'onDeleteAction'
	| 'iconPlacement'
	| 'icon'
	| 'children'
	| 'type'
	| 'onChange'
	| 'onFocus'
	| 'onBlur'
type ExtendableTextInputProps = Omit<TextInputProps, ExtendableTextInputKeys>

export interface TextAreaInputProps extends ExtendableTextInputProps {
	onChange?: (value: string) => void,
	onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void,
	onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void,
	rows?: number
}

export const TextAreaInput: FC<TextAreaInputProps> = ({
																												isLoading,
																												inputId,
																												value,
																												onBlur,
																												errorMessage,
																												onFocus,
																												label,
																												containerProps,
																												placeholder,
																												onClick,
																												isDirty,
																												tooltip,
																												readOnly,
																												onChange,
																												rows
																											}) => {
	
	return (
		<FlexBlock
			{...containerProps}
			width={'100%'}
			position={'relative'}
			direction={'column'}
		>
			<InputLabel label={label} tooltip={tooltip} inputId={inputId}/>
			<FlexBlock
				position={'relative'}
				width={'100%'}
				mb={(isDirty && errorMessage) ? 6 : 0}
				direction={'column'}
			>
				<StyledTextAreaInput
					value={value}
					onChange={(e) => onChange && onChange(e.target.value)}
					onFocus={(e) => onFocus && onFocus(e)}
					onBlur={(e) => onBlur && onBlur(e)}
					placeholder={placeholder}
					id={inputId}
					readOnly={readOnly}
					rows={rows || 6}
					disabled={isLoading}
				/>
			</FlexBlock>
			<InputErrorMessage errorMessage={errorMessage} isDirty={isDirty}/>
		</FlexBlock>
	)
}