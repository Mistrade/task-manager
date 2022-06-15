import { FC } from 'react'
import { PRIORITY_LIST, PRIORITY_TITLES } from '../../../../common/constants'
import { SelectListContainer } from '../SelectListContainer'
import { SelectItemContainer } from '../SelectItemContainer'
import { CalendarPriorityKeys } from '../../../Calendars/types'
import { FlexBlockProps } from '../../../LayoutComponents/FlexBlock'
import { ArrowIndicator } from '../../../Calendars/Cell'
import { SelectInput } from '../SelectInput'
import { DefaultTextInputProps } from '../../TextInput'

interface SelectPriorityInputProps extends Partial<Omit<DefaultTextInputProps, 'onChange'>> {
  selected: CalendarPriorityKeys,
  onChange?: ( key: CalendarPriorityKeys ) => void,
  containerProps?: FlexBlockProps,
  inputId?: string
}

export const SelectPriorityInput: FC<SelectPriorityInputProps> = ( {
                                                                     selected,
                                                                     onChange,
                                                                     containerProps,
                                                                     inputId,
                                                                     ...inputProps
                                                                   } ) => {
  return (
    <SelectInput
      {...inputProps}
      containerProps={containerProps}
      inputId={inputId || 'select_priority'}
      data={PRIORITY_LIST}
      label={'Выберите приоритет'}
      icon={selected && <ArrowIndicator priorityKey={selected}/>}
      renderData={( data, { focusOut } ) => (
        <>
          <SelectListContainer>
            {data.map( item => (
              <SelectItemContainer
                isSelected={item.type === selected}
                onClick={() => {
                  onChange && onChange( item.type )
                  focusOut()
                }}
              >
                <ArrowIndicator priorityKey={item.type} isCompleted={false}/>
                <span>
                  {item.title}
                </span>
              </SelectItemContainer>
            ) )}
          </SelectListContainer>
        </>
      )}
      readOnly={true}
      value={selected ? PRIORITY_TITLES[ selected ] : ''}
    />
  )
}
