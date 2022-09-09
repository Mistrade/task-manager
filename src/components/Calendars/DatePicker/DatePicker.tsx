import React, {FC, useCallback, useEffect, useState} from 'react'
import {DatePickerProps} from '../types'
import {SelectListContainer} from '../../Input/SelectInput/SelectListContainer'
import {DatePickerPaper} from './DatePickerPaper'
import {getHumanizeDateValue} from '../../../common/constants'
import {SelectInput} from '../../Input/SelectInput/SelectInput'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {Button} from '../../Buttons/Buttons.styled'
import {EmptyButtonStyled} from '../../Buttons/EmptyButton.styled'


export const DatePicker: FC<DatePickerProps> = ({
																									onFocus,
																									currentDate,
																									label,
																									onChange,
																									containerProps,
																									isDirty,
																									errorMessage,
																									icon,
																									actionHandler,
																									actions,
																									iconPlacement,
																									disabledOptions
																								}) => {
	const [stateValue, setStateValue] = useState<Date>(currentDate)
	
	const clickSaveHandler = useCallback(() => {
		onChange && onChange(stateValue)
	}, [stateValue])
	
	const clickDeclineHandler = useCallback(() => {
		setStateValue(currentDate)
	}, [])
	
	useEffect(() => {
		setStateValue(currentDate)
	}, [currentDate])
	
	return (
		<SelectInput
			onFocus={onFocus}
			data={[]}
			renderData={(data, methods) => (
				<SelectListContainer maxHeight={500} width={'200%'}>
					<FlexBlock direction={'column'} width={'100%'} gap={12}>
						<DatePickerPaper
							disabledOptions={disabledOptions}
							currentDate={currentDate}
							onChange={(date) => {
								setStateValue(date)
							}}
						/>
						<FlexBlock direction={'row'} width={'100%'} justify={'flex-end'} gap={8}>
							<Button
								onClick={() => {
									clickSaveHandler()
									methods.focusOut()
								}}
							>
								Сохранить
							</Button>
							<EmptyButtonStyled
								onClick={() => {
									clickDeclineHandler()
									methods.focusOut()
								}}
							>
								Отменить
							</EmptyButtonStyled>
						</FlexBlock>
					</FlexBlock>
				</SelectListContainer>
			)}
			value={stateValue ? getHumanizeDateValue(stateValue) : ''}
			label={label}
			containerProps={containerProps}
			isDirty={!!isDirty}
			errorMessage={`${errorMessage || ''}`}
			actionHandler={actionHandler}
			readOnly={true}
			icon={icon}
			iconPlacement={iconPlacement}
			actions={actions}
		/>
	)
}
