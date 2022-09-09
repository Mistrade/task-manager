import {FC, useMemo} from 'react'
import {PRIORITY_LIST, PRIORITY_TITLES} from '../../../../common/constants'
import {SelectListContainer} from '../SelectListContainer'
import {SelectItemContainer} from '../SelectItemContainer'
import {CalendarPriorityKeys, CalendarPriorityList} from '../../../Calendars/types'
import {FlexBlockProps} from '../../../LayoutComponents/FlexBlock'
import {ArrowIndicator} from '../../../Calendars/Cell'
import {SelectInput} from '../SelectInput'
import {DefaultTextInputProps} from '../../TextInput/TextInput'

interface SelectPriorityInputProps extends Partial<Omit<DefaultTextInputProps, 'onChange'>> {
  selected: CalendarPriorityKeys | null,
  onChange?: ( key: CalendarPriorityKeys | null ) => void,
  containerProps?: FlexBlockProps,
  inputId?: string,
  useClearItem?: boolean
}

export const SelectPriorityInput: FC<SelectPriorityInputProps> = ( {
                                                                     selected,
                                                                     onChange,
                                                                     containerProps,
                                                                     inputId,
                                                                     useClearItem = false,
                                                                     ...inputProps
                                                                   } ) => {
  const PRIORITY: CalendarPriorityList = useMemo( () => {
    return useClearItem
      ? [...PRIORITY_LIST, { type: 'not_selected', title: PRIORITY_TITLES.not_selected }]
      : PRIORITY_LIST
  }, [useClearItem] )

  return (
    <SelectInput
      {...inputProps}
      containerProps={containerProps}
      inputId={inputId || 'select_priority'}
      data={PRIORITY}
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
