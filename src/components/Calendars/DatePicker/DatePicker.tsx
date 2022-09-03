import React, {FC} from 'react'
import {DatePickerProps} from '../types'
import {SelectListContainer} from '../../Input/SelectInput/SelectListContainer'
import {DatePickerPaper} from './DatePickerPaper'
import {getHumanizeDateValue} from '../../../common/constants'
import {SelectInput} from '../../Input/SelectInput/SelectInput'


export const DatePicker: FC<DatePickerProps> = ( {
                                                   onFocus,
                                                   currentDate,
                                                   label,
                                                   onChange,
                                                   value,
                                                   containerProps,
                                                   isDirty,
                                                   errorMessage,
                                                   icon,
                                                   actionHandler,
                                                   actions,
                                                   iconPlacement,
                                                   disabledOptions
                                                 } ) => {
  return (
    <SelectInput
      onFocus={onFocus}
      data={[]}
      renderData={() => (
        <SelectListContainer maxHeight={500} width={'200%'}>
          <DatePickerPaper
            disabledOptions={disabledOptions}
            currentDate={currentDate}
            onChange={onChange}
          />
        </SelectListContainer>
      )}
      value={value ? getHumanizeDateValue( value ) : ''}
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
