import {TextInputProps} from '../TextInput/TextInput'
import {SelectInput} from './SelectInput'
import {SelectListContainer} from './SelectListContainer'
import {SelectItemContainer} from './SelectItemContainer'
import {SelectBooleanInputDataItem} from '../../Calendars/types'

interface SelectBooleanInputProps<T extends SelectBooleanInputDataItem> extends Omit<TextInputProps, 'onChange' | 'readOnly' | 'value'> {
  onChange?: ( data: T ) => void,
  data: Array<T>,
  selected?: T
}

export function SelectBooleanInput<T extends SelectBooleanInputDataItem>( props: SelectBooleanInputProps<T> ): JSX.Element {
  const { data, onChange, selected, ...otherProps } = props
  return (
    <SelectInput
      {...otherProps}
      readOnly={true}
      data={data}
      icon={selected?.icon}
      value={selected?.title || ''}
      renderData={( data, { focusOut } ) => (
        <SelectListContainer>
          {data.map( item => (
            <SelectItemContainer
              onClick={() => onChange && onChange( item ) && focusOut()}
              isSelected={item.title.toLowerCase() === selected?.title.toLowerCase()}
            >
              {item.icon || ''}
              <span>
                {item.title}
              </span>
            </SelectItemContainer>
          ) )}
        </SelectListContainer>
      )}
    />
  )
}
