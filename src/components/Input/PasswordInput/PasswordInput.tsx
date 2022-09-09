import {defaultColor} from "../../../common/constants";
import {PasswordIcon} from "../../Icons/Session/PasswordIcon";
import {TextInput, TextInputProps} from "../TextInput/TextInput";
import {FC, useState} from "react";

export const PasswordInput: FC<TextInputProps> = ({
																										value,
																										onBlur,
																										onChange,
																										label,
																										placeholder,
																										isDirty,
																										inputId,
																										containerProps,
																										icon,
																										actions,
																										actionHandler,
																										iconPlacement,
																										onDeleteAction,
																										isLoading,
																										tooltip,
																										onClick,
																										children,
																										readOnly,
																										type,
																										onFocus,
																										errorMessage
																									}) => {
	const [showPassword, setShowPassword] = useState(false)
	
	return (
		<TextInput
			type={showPassword ? 'text' : 'password'}
			value={value}
			label={label}
			onBlur={onBlur}
			onChange={onChange}
			isDirty={isDirty}
			onFocus={onFocus}
			tooltip={tooltip}
			inputId={inputId}
			containerProps={containerProps}
			iconPlacement={iconPlacement}
			actions={actions}
			actionHandler={actionHandler}
			onDeleteAction={onDeleteAction}
			isLoading={isLoading}
			onClick={onClick}
			children={children}
			readOnly={readOnly}
			errorMessage={errorMessage}
			icon={icon || (
				<PasswordIcon
					color={defaultColor}
					withTooltip={true}
					isOpen={showPassword}
					onClick={() => setShowPassword(prev => !prev)}
				/>)}
			placeholder={placeholder}
		/>
	)
}