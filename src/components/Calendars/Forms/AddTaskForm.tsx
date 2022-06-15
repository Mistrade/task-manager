import { FC, useEffect } from 'react'
import { CalendarItem, CalendarTaskItem } from '../types'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { TextInput } from '../../Input/TextInput'
import { SelectPriorityInput } from '../../Input/SelectInput/CalendarSelectInputs/SelectPriorityInput'
import { SelectBooleanInput } from '../../Input/SelectInput/SelectBooleanInput'
import { getHumanizeDateValue, TASK_STATUSES } from '../../../common/constants'
import { SelectInput } from '../../Input/SelectInput/SelectInput'
import { DatePickerPaper } from '../DatePicker/DatePickerPaper'
import { SelectListContainer } from '../../Input/SelectInput/SelectListContainer'
import * as yup from 'yup'

interface AddTaskFormProps {
  onComplete?: ( data: CalendarTaskItem ) => void,
  date: CalendarItem | null,
  onChangeDate?: ( props: { start: Date, end: Date } ) => void
}


const addTaskValidationSchema = yup.object( {
  title: yup.string()
    .min( 3, 'Заголовок не может быть короче 3 символов' )
    .max( 100, 'Постарайтесь более коротко изложить суть события' )
    .required( 'Заголовок обязателен для заполнения' ),
  time: yup.date().min( dayjs().toDate(), 'Время начала события не может быть в прошлом' ).required( 'Время начала события обязательно для заполнения' ),
  timeEnd: yup.date().min( dayjs().add( 5, 'minute' ).toDate(), 'Завершение события должно быть позже начала' ).required( 'Время завершения события обязательно для заполнения' )
} )

export const AddTaskForm: FC<AddTaskFormProps> = ( { date, onChangeDate } ) => {
  const formik = useFormik<CalendarTaskItem>( {
    onSubmit() {

    },
    validationSchema: addTaskValidationSchema,
    initialValues: {
      id: '',
      title: '',
      linkedFrom: '',
      type: 'event',
      createdAt: new Date(),
      description: '',
      status: 'created',
      members: [],
      time: date?.value || dayjs().toDate(),
      timeEnd: dayjs( date?.value ).add( 1, 'hour' ).toDate() || dayjs().add( 1, 'hour' ).toDate(),
      priority: 'medium'
    }
  } )

  useEffect( () => {
    modalTitleHandler()
  }, [formik.values.timeEnd] )

  const modalTitleHandler = () => {
    formik.values.time
    && formik.values.timeEnd
    && onChangeDate
    && onChangeDate( {
      start: formik.values.time,
      end: formik.values.timeEnd
    } )
  }

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <TextInput
        containerProps={{ mb: 12 }}
        onChange={( e ) => formik.setFieldValue( 'title', e.target.value )}
        onFocus={( e ) => !formik.touched.title && formik.setFieldTouched( 'title', true )}
        errorMessage={formik.errors.title}
        isDirty={formik.touched.title}
        value={formik.values.title || ''}
        label={'Укажите название'}
        placeholder={'Позвонить заказчику'}
      />
      <SelectPriorityInput
        containerProps={{ mb: 12 }}
        selected={formik.values.priority || 'medium'}
        onChange={( key ) => formik.setFieldValue( 'priority' as keyof CalendarTaskItem, key as CalendarTaskItem['priority'] )}
        onFocus={() => !formik.touched.priority && formik.setFieldTouched( 'priority', true )}
      />
      <SelectBooleanInput
        containerProps={{ mb: 12 }}
        label={'Укажите статус'}
        inputId={'select_status'}
        data={Object.values( TASK_STATUSES )}
        selected={TASK_STATUSES[ formik.values.status || 'created' ]}
        onChange={( data ) => formik.setFieldValue( 'status', data.key )}
        onFocus={() => formik.setFieldTouched( 'status', true )}
      />
      <FlexBlock mb={12} gap={12} direction={'row'}>
        <SelectInput
          onFocus={() => !formik.touched.time && formik.setFieldTouched( 'time', true )}
          data={[]}
          renderData={() => (
            <SelectListContainer maxHeight={500} width={'200%'}>
              <DatePickerPaper
                disabledOptions={{ min: new Date(), includeMin: true }}
                currentDate={formik.values.time || new Date()}
                onChange={( date ) => {
                  formik.setFieldValue( 'time', date )
                  formik.setFieldValue( 'timeEnd', dayjs( date ).add( 1, 'hour' ).toDate() )
                }}
              />
            </SelectListContainer>
          )}
          value={getHumanizeDateValue( formik.values.time || date?.value || new Date() )}
          label={'Выберите время начала'}
          containerProps={{ flex: '1 0 calc(50% - 6px)', maxWidth: '50%' }}
          isDirty={!!formik.touched.time}
          errorMessage={`${formik.errors.time}`}
          actionHandler={( action ) => {
            if( action.actionKey === '0' ) {
              formik.setFieldValue( 'time', dayjs().toDate() )
              formik.setFieldValue( 'timeEnd', dayjs().add( 1, 'hour' ).toDate() )
            }
          }}
          actions={[{ title: 'Сейчас', actionKey: '0' }]}
        />
        <SelectInput
          data={[]}
          onFocus={() => !formik.touched.timeEnd && formik.setFieldTouched( 'timeEnd', true )}
          renderData={() => (
            <SelectListContainer maxHeight={500} width={'200%'}>
              <DatePickerPaper
                disabledOptions={{ min: formik.values.time || new Date(), includeMin: true }}
                currentDate={formik.values.timeEnd || dayjs( date?.value ).add( 30, 'minute' ).toDate() || dayjs().add( 30, 'minute' ).toDate()}
                onChange={( date ) => formik.setFieldValue( 'timeEnd', date )}
              />
            </SelectListContainer>
          )}
          value={getHumanizeDateValue( formik.values.timeEnd || date?.value || new Date() )}
          label={'Выберите время завершения'}
          containerProps={{ flex: '1 0 calc(50% - 6px)', maxWidth: '50%' }}
          isDirty={!!formik.touched.timeEnd}
          errorMessage={`${formik.errors.timeEnd}`}
          actionHandler={( action ) => {
            let d = dayjs( formik.values.time )
            formik.setFieldValue( 'timeEnd', d.add( +action.actionKey, 'minute' ).toDate() )
          }}
          actions={[
            { title: '30 мин', actionKey: '30' },
            { title: 'час', actionKey: '60' },
            { title: '6 часов', actionKey: '360' },
            { title: '12 часов', actionKey: '720' },
            { title: '1 день', actionKey: '1440' },
            { title: '3 дня', actionKey: ( 1440 * 3 ).toString() },
            { title: 'неделя', actionKey: ( 1440 * 7 ).toString() }
          ]}
        />
      </FlexBlock>
    </form>
  )
}
