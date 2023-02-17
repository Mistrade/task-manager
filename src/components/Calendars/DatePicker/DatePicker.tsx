import React, {FC, memo, useCallback, useEffect, useState} from 'react'
import {DatePickerProps} from '../types'
import {SelectListContainer} from '../../Input/SelectInput/SelectListContainer'
import {DatePickerPaper} from './DatePickerPaper'
import {SelectInput} from '../../Input/SelectInput/SelectInput'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {Button} from '../../Buttons/Buttons.styled'
import {EmptyButtonStyled} from '../../Buttons/EmptyButton.styled'
import dayjs from "dayjs";
import {DateHelper} from "../../../common/calendarSupport/dateHelper";


export const DatePicker: FC<DatePickerProps> = memo(({
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
																											 disabledOptions,
																											 useForceUpdateValue = false
																										 }) => {
	const [stateValue, setStateValue] = useState<Date>(currentDate)
	
	const clickSaveHandler = useCallback(() => {
		onChange && onChange(stateValue)
	}, [stateValue])
	
	const clickDeclineHandler = useCallback(() => {
		setStateValue(currentDate)
	}, [])
	
	useEffect(() => {
		const d = dayjs(currentDate)
		if (d.isValid()) {
			const isSame = d.isSame(stateValue, 'minute')
			if (currentDate && useForceUpdateValue && !isSame) {
				setStateValue(currentDate)
			}
		}
	}, [currentDate, useForceUpdateValue])
	
	return (
		<SelectInput
			onFocus={onFocus}
			data={[]}
			renderData={(data, methods) => (
				<SelectListContainer maxHeight={500} width={'200%'}>
					<FlexBlock direction={'column'} width={'100%'} pb={4}>
						<DatePickerPaper
							disabledOptions={disabledOptions}
							currentDate={currentDate}
							onChange={(date) => {
								setStateValue(date)
							}}
						/>
						<FlexBlock direction={'row'} width={'100%'} align={'center'} justify={'flex-end'} gap={8}>
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
			value={stateValue ? DateHelper.getHumanizeDateValue(stateValue) : ''}
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
})
