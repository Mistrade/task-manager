import {TextInputProps} from "../TextInput/TextInput";
import React, {FC, useEffect, useRef} from "react";
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
	rows?: number,
	maxHeight?: number
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
																												rows,
																												maxHeight = 300
																											}) => {
	
	const ref = useRef<HTMLTextAreaElement>(null)
	
	useEffect(() => {
		const target = ref.current as HTMLTextAreaElement
		
		if (target && target.textLength === 0) {
			target.style.height = 12 + (16 * (rows || 4)) + 'px'
		}
	}, [value])
	
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
					ref={ref}
					onChange={(e) => {
						onChange && onChange(e.target.value)
					}}
					onFocus={(e) => onFocus && onFocus(e)}
					onBlur={(e) => onBlur && onBlur(e)}
					placeholder={placeholder}
					onKeyUp={(e) => {
						const target = e.target as HTMLTextAreaElement
						
						if (target.scrollTop > 0) {
							target.style.height = target.scrollHeight < maxHeight ? target.scrollHeight + 'px' : maxHeight + 'px'
						}
					}}
					id={inputId}
					readOnly={readOnly}
					rows={rows || 4}
					disabled={isLoading}
				/>
			</FlexBlock>
			<InputErrorMessage errorMessage={errorMessage} isDirty={isDirty}/>
		</FlexBlock>
	)
}