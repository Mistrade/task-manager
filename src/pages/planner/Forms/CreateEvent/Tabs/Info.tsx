import dayjs from 'dayjs';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import { FC } from 'react';

import { DateHelper } from '@src/common/calendarSupport/dateHelper';

import { DatePickerPaper } from '@components/DatePicker/DatePickerPaper';
import { CompleteIcon, CreatedIcon } from '@components/Icons/Icons';
import { SelectLinks } from '@components/Input/SelectInput/CalendarSelectInputs/SelectLinks';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { TextAreaInput } from '@components/Input/TextAreaInput/TextAreaInput';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { CreateEventDataObject } from '@planner/planner.types';


export interface BaseCreateEventTabProps {
  values: CreateEventDataObject;
  touched: FormikTouched<CreateEventDataObject>;
  errors: FormikErrors<CreateEventDataObject>;
  setFieldValue: ReturnType<typeof useFormik>['setFieldValue'];
  setFieldTouched: ReturnType<typeof useFormik>['setFieldTouched'];
}

export const CreateEventInfoTab: FC<BaseCreateEventTabProps> = ({
  values,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
}) => {
  return (
    <>
      <FlexBlock mb={12} width={'100%'}>
        <TextInput
          inputId={'task__title'}
          onChange={(e) => setFieldValue('title', e.target.value, false)}
          onBlur={(e) => !touched.title && setFieldTouched('title', true)}
          errorMessage={errors.title}
          isDirty={touched.title}
          value={values.title || ''}
          label={'Заголовок'}
          placeholder={'Укажите название события'}
        />
      </FlexBlock>

      <FlexBlock mb={12} wrap={'nowrap'} width={'100%'}>
        <SelectLinks
          inputId={'select__link'}
          label={'Ссылка на встречу'}
          onChange={(value) => {
            setFieldValue('link', value);
          }}
        />
      </FlexBlock>
      <FlexBlock mb={12} gap={12} direction={'row'}>
        <SelectInput
          inputId={'start__date'}
          onFocus={() => !touched.time && setFieldTouched('time', true)}
          data={[]}
          renderData={() => (
            <SelectListContainer maxHeight={500}>
              <DatePickerPaper
                currentDate={values.time || new Date()}
                onChange={(date) => {
                  setFieldValue('time', date);
                  setFieldValue('timeEnd', dayjs(date).add(1, 'hour').toDate());
                }}
              />
            </SelectListContainer>
          )}
          value={DateHelper.getHumanizeDateValue(values.time || new Date())}
          label={'Начало'}
          containerProps={{ flex: '1 0 calc(50% - 6px)', maxWidth: '50%' }}
          isDirty={!!touched.time}
          errorMessage={`${errors.time || ''}`}
          readOnly={true}
          icon={<CreatedIcon size={20} />}
          iconPlacement={'left'}
        />
        <SelectInput
          inputId={'end__date'}
          iconPlacement={'left'}
          data={[]}
          onFocus={() => !touched.timeEnd && setFieldTouched('timeEnd', true)}
          readOnly={true}
          renderData={() => (
            <SelectListContainer maxHeight={500}>
              <DatePickerPaper
                disabledOptions={{
                  min: values.time || new Date(),
                  includeMin: true,
                }}
                currentDate={values.timeEnd}
                onChange={(date) => {
                  setFieldValue('timeEnd', date);
                }}
              />
            </SelectListContainer>
          )}
          value={DateHelper.getHumanizeDateValue(values.timeEnd || new Date())}
          label={'Завершение'}
          containerProps={{ flex: '1 0 calc(50% - 6px)', maxWidth: '50%' }}
          isDirty={!!touched.timeEnd}
          errorMessage={`${errors.timeEnd || ''}`}
          icon={<CompleteIcon size={20} />}
        />
      </FlexBlock>
      <FlexBlock direction={'row'} mb={12}>
        <TextAreaInput
          rows={6}
          value={values.description}
          onChange={(value) => setFieldValue('description', value)}
          onFocus={() => setFieldTouched('description', true)}
          errorMessage={errors.description}
          isDirty={touched.description}
          inputId={'task__description'}
          label={'Описание'}
          placeholder={'Произвольный текст, на заметку...'}
        />
      </FlexBlock>
      {/*<FlexBlock direction={'row'} width={'calc(50% - 6px)'}>*/}
      {/*  <TagInput*/}
      {/*    label={'Добавьте теги к событию'}*/}
      {/*    tags={[]}*/}
      {/*    onAddTag={() => {}}*/}
      {/*  />*/}
      {/*</FlexBlock>*/}
    </>
  );
};