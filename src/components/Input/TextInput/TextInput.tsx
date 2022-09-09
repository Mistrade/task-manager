import React, {forwardRef, ReactNode} from 'react'
import {FlexBlock, FlexBlockProps} from '../../LayoutComponents/FlexBlock'
import {StyledInput} from '../Input.styled'
import {InputActions, InputActionsProps} from "../InputSupportComponents/InputActions";
import {InputErrorMessage, InputErrorMessageProps} from "../InputSupportComponents/InputErrorMessage";
import {InputIconContainer, InputIconContainerProps} from "../InputSupportComponents/InputIconContainer";
import {InputLabel, InputLabelProps} from "../InputSupportComponents/InputLabel";

export interface DefaultTextInputProps extends InputErrorMessageProps, InputActionsProps, InputIconContainerProps, InputLabelProps {
	value?: string,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
	placeholder?: string,
	children?: ReactNode,
	readOnly?: boolean,
	type?: HTMLInputElement['type']
	buttons?: ReactNode
}

export interface TextInputProps extends DefaultTextInputProps {
	containerProps?: FlexBlockProps,
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void,
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
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
																																				 buttons
																																			 }, ref) => {
	return (
		<FlexBlock
			{...containerProps}
			width={'100%'}
			position={'relative'}
			direction={'column'}
		>
			<InputLabel inputId={inputId} label={label} tooltip={tooltip}/>
			<FlexBlock
				width={'100%'}
				mb={(isDirty && errorMessage) || (actions && actionHandler) ? 6 : 0}
				direction={'row'}
				gap={6}
			>
				<FlexBlock position={'relative'} width={'100%'}>
					<StyledInput
						type={type}
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
					<InputIconContainer icon={icon} iconPlacement={iconPlacement} isLoading={isLoading}/>
					{children && (
						<FlexBlock position={'relative'} width={'100%'}>
							{children}
						</FlexBlock>
					)}
				</FlexBlock>
				{buttons}
			</FlexBlock>
			<InputErrorMessage isDirty={isDirty} errorMessage={errorMessage}/>
			<InputActions actions={actions} actionHandler={actionHandler} onDeleteAction={onDeleteAction}/>
		</FlexBlock>
	)
})
