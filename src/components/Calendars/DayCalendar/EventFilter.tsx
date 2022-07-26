import { FC, useEffect, useState } from 'react'
import { CalendarPriorityKeys, EventItem } from '../types'
import { useFormik } from 'formik'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { SelectPriorityInput } from '../../Input/SelectInput/CalendarSelectInputs/SelectPriorityInput'
import { TextInput } from '../../Input/TextInput'
import { DatePicker } from '../DatePicker/DatePicker'
import dayjs from 'dayjs'

interface FiltersValue {
  title: null | string,
  priority: null | CalendarPriorityKeys,
  start: null | Date,
  end: null | Date
}

interface EventFilterProps {
  currentDay: Date,
  initialValues?: FiltersValue,
  listForFilter: Array<EventItem>,
  onChange?: ( list: Array<EventItem> ) => void
}

export const EventFilter: FC<EventFilterProps> = ( {
                                                     currentDay,
                                                     initialValues,
                                                     listForFilter,
                                                     onChange
                                                   } ) => {
  const form = useFormik( {
    onSubmit: () => {
    },
    initialValues: {
      title: null,
      priority: null,
      start: null,
      end: null,
      ...initialValues
    }
  } )

  const [timeoutID, setTimeoutID] = useState<any>()

  useEffect( () => {
    form.resetForm()
  }, [currentDay] )

  useEffect( () => {
    setTimeoutID( ( prev: any ) => {
        clearTimeout( prev )

        return setTimeout( () => {
          filterFunc()
        }, 177 )
      }
    )
  }, [listForFilter, form.values] )

  const filterFunc = () => {
    let result = listForFilter

    const { title, start, end, priority } = form.values

    if( !!title ) {
      result = result.filter( item => item.title.toLowerCase().includes( title.toLowerCase() ) )
    }

    if( !!start ) {
      result = result.filter( item => dayjs( item.time ).isSameOrAfter( start, 'minute' ) )
    }

    if( !!end ) {
      result = result.filter( item => dayjs( item.timeEnd ).isSameOrBefore( end, 'minute' ) )
    }

    if( !!priority ) {
      result = result.filter( item => item.priority === priority )
    }

    return onChange && onChange( result )
  }

  return (
    <FlexBlock
      width={'100%'}
      gap={6}
    >
      <FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
        <DatePicker
          currentDate={currentDay}
          value={form.values.start}
          onChange={( date ) => form.setFieldValue( 'start', date )}
          onFocus={() => form.setFieldTouched( 'start', true )}
          label={'Когда начинается?'}
        />
      </FlexBlock>
      <FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
        <DatePicker
          currentDate={currentDay}
          value={form.values.end}
          onChange={( date ) => form.setFieldValue( 'end', date )}
          onFocus={() => form.setFieldTouched( 'end', true )}
          label={'Когда заканчивается?'}
        />
      </FlexBlock>
      <FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
        <SelectPriorityInput
          useClearItem={true}
          selected={form.values.priority}
          onChange={( value ) => form.setFieldValue( 'priority', value === 'not_selected' ? null : value )}
          onFocus={() => form.setFieldTouched( 'priority', true )}
          label={'Укажите приоритет'}
        />
      </FlexBlock>
      <FlexBlock flex={'1 0 calc(25% - 6px)'} maxWidth={'25%'}>
        <TextInput
          value={form.values.title || ''}
          onChange={( e ) => form.setFieldValue( 'title', e.target.value )}
          onFocus={( e ) => form.setFieldTouched( 'title', true )}
          label={'Укажите заголовок'}
        />
      </FlexBlock>
    </FlexBlock>
  )
}
