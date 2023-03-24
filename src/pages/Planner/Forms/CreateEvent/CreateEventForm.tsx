import { FC, useMemo } from 'react';
import { CreateEventDataObject } from '../../planner.types';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { TextInput } from '../../../../components/Input/TextInput/TextInput';
import {
  borderRadiusSize,
  defaultColor,
  disabledColor,
  pageHeaderColor,
  PRIORITY_TITLES,
  TASK_STATUSES,
} from '../../../../common/constants';
import { SelectInput } from '../../../../components/Input/SelectInput/SelectInput';
import { DatePickerPaper } from '../../../../components/DatePicker/DatePickerPaper';
import { SelectListContainer } from '../../../../components/Input/SelectInput/SelectListContainer';
import * as yup from 'yup';
import { CompleteIcon, CreatedIcon } from '../../../../components/Icons/Icons';
import {
  Button,
  StyledButton,
} from '../../../../components/Buttons/Buttons.styled';
import { SelectLinks } from '../../../../components/Input/SelectInput/CalendarSelectInputs/SelectLinks';
import { useCreateEventMutation } from '../../../../store/api/planning-api';
import { TextAreaInput } from '../../../../components/Input/TextAreaInput/TextAreaInput';
import { DateHelper } from '../../../../common/calendarSupport/dateHelper';
import { ObjectId } from '../../../../store/api/rtk-api.types';
import { Heading } from '../../../../components/Text/Heading';
import { Switcher } from '../../../../components/Switcher/Switcher';
import {
  ToggleEventCalendar,
  ToggleEventPriority,
  ToggleEventStatus,
} from '../../TaskInformer/SupportsComponent/ToggleTaskInformerButtons';
import { GroupModelResponse } from '../../../../store/api/planning-api/types/groups.types';
import { useCreateEvent } from '../../../../hooks/useCreateEvent';
import { CatchHandleForToast } from '../../../../store/api/tools';

interface CreateEventFormProps {
  onComplete?: (data: CreateEventDataObject, taskId?: ObjectId) => void;
  date: Date | null;
  onCancel?: (data: CreateEventDataObject) => void;
  groupsList?: Array<GroupModelResponse>;
}

export const LinkValidationSchema = yup
  .object({
    key: yup.string(),
    value: yup
      .string()
      .url('Ссылка должна быть корректным url-адресом')
      .required(),
  })
  .nullable()
  .notRequired();

const addTaskValidationSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Заголовок не может быть короче 3 символов')
    .max(100, 'Постарайтесь более коротко изложить суть')
    .required('Заголовок обязателен для заполнения'),
  time: yup.date().required('Время начала обязательно для заполнения'),
  timeEnd: yup
    .date()
    .min(yup.ref('time'), 'Время завершения должно быть позже начала')
    .required('Время завершения обязательно для заполнения'),
  link: LinkValidationSchema,
  priority: yup
    .string()
    .oneOf(Object.keys(PRIORITY_TITLES))
    .required('Пожалуйста, выберите приоритет'),
  status: yup
    .string()
    .oneOf(Object.keys(TASK_STATUSES))
    .required('Пожалуйста, укажите статус'),
  group: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .min(12, 'Выберите элемент из выпадающего списка')
    .max(24, 'Выберите элемент из выпадающего списка'),
});

const switcherList = [
  { title: 'Инфо', type: 'info' },
  { title: 'Участники', type: 'invites' },
  { title: 'Связи', type: 'chains' },
];

export const CreateEventForm: FC<CreateEventFormProps> = ({
  date,
  onComplete,
  onCancel,
  groupsList,
}) => {
  const { initialState, prevUrl, declineModal, clearState } = useCreateEvent(
    {}
  );
  const [addTask, { isLoading, status }] = useCreateEventMutation();

  //TODO убрать CalendarTaskItem, создать нормальные тип, который будет уходить не сервак
  const formik = useFormik<CreateEventDataObject>({
    async onSubmit(values) {
      await addTask(values)
        .unwrap()
        .then((response) => {
          onComplete && onComplete(values, response?.data?.eventId);
          clearState();
        })
        .catch(CatchHandleForToast);
    },
    validationSchema: addTaskValidationSchema,
    initialValues: {
      ...initialState,
      group:
        initialState.group ||
        groupsList?.find((item) => item.type === 'Main')?._id ||
        '',
    },
  });

  const calendarItem = useMemo(() => {
    if (formik.values.group) {
      return groupsList?.find((item) => item._id === formik.values.group);
    }
    return groupsList?.find((item) => item.type === 'Main');
  }, [formik.values.group, groupsList]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: '100%', height: '100%' }}
    >
      <FlexBlock direction={'column'} height={'100%'}>
        <FlexBlock
          pt={24}
          mb={12}
          pl={20}
          pr={20}
          gap={12}
          bgColor={pageHeaderColor}
          borderRadius={`${borderRadiusSize.xl} ${borderRadiusSize.xl} 0px 0px`}
          direction={'column'}
          width={'100%'}
        >
          <Heading.H2 style={{ fontWeight: 'normal', marginBottom: 8 }}>
            Создайте новое событие
          </Heading.H2>
          <FlexBlock
            gap={12}
            p={`4px 8px`}
            border={`1px solid ${disabledColor}`}
            borderRadius={borderRadiusSize.sm}
          >
            <ToggleEventCalendar
              elementId={'set_new_event_group'}
              value={calendarItem || null}
              onChange={async (field, data, taskId) => {
                await formik.setFieldValue(field, data);
                await formik.setFieldTouched(field, true);
              }}
            />
            <ToggleEventPriority
              elementId={'set_new_event_priority'}
              value={formik.values.priority || 'medium'}
              onChange={async (field, data, taskId) => {
                await formik.setFieldValue(field, data);
              }}
            />
            <ToggleEventStatus
              elementId={'set_new_event_status'}
              value={formik.values.status || 'created'}
              onChange={async (field, data, taskId) => {
                await formik.setFieldValue(field, data);
              }}
            />
          </FlexBlock>
          <Switcher
            switchersList={switcherList}
            onClick={() => {}}
            selected={'info'}
          />
        </FlexBlock>
        <FlexBlock direction={'column'} p={'0px 20px'} height={'100%'}>
          <FlexBlock mb={12} width={'100%'}>
            <TextInput
              inputId={'task__title'}
              onChange={(e) => formik.setFieldValue('title', e.target.value)}
              onFocus={(e) =>
                !formik.touched.title && formik.setFieldTouched('title', true)
              }
              errorMessage={formik.errors.title}
              isDirty={formik.touched.title}
              value={formik.values.title || ''}
              label={'Заголовок'}
              placeholder={'Укажите название события'}
            />
          </FlexBlock>

          <FlexBlock mb={12} wrap={'nowrap'} width={'100%'}>
            <SelectLinks
              inputId={'select__link'}
              label={'Ссылка на встречу'}
              onChange={(value) => {
                formik.setFieldValue('link', value);
              }}
            />
          </FlexBlock>
          <FlexBlock mb={12} gap={12} direction={'row'}>
            <SelectInput
              inputId={'start__date'}
              onFocus={() =>
                !formik.touched.time && formik.setFieldTouched('time', true)
              }
              data={[]}
              renderData={() => (
                <SelectListContainer maxHeight={500}>
                  <DatePickerPaper
                    currentDate={formik.values.time || new Date()}
                    onChange={(date) => {
                      formik.setFieldValue('time', date);
                      formik.setFieldValue(
                        'timeEnd',
                        dayjs(date).add(1, 'hour').toDate()
                      );
                    }}
                  />
                </SelectListContainer>
              )}
              value={DateHelper.getHumanizeDateValue(
                formik.values.time || date || new Date()
              )}
              label={'Начало'}
              containerProps={{ flex: '1 0 calc(50% - 6px)', maxWidth: '50%' }}
              isDirty={!!formik.touched.time}
              errorMessage={`${formik.errors.time || ''}`}
              readOnly={true}
              icon={<CreatedIcon size={20} />}
              iconPlacement={'left'}
            />
            <SelectInput
              inputId={'end__date'}
              iconPlacement={'left'}
              data={[]}
              onFocus={() =>
                !formik.touched.timeEnd &&
                formik.setFieldTouched('timeEnd', true)
              }
              readOnly={true}
              renderData={() => (
                <SelectListContainer maxHeight={500}>
                  <DatePickerPaper
                    disabledOptions={{
                      min: formik.values.time || new Date(),
                      includeMin: true,
                    }}
                    currentDate={formik.values.timeEnd}
                    onChange={(date) => {
                      formik.setFieldValue('timeEnd', date);
                    }}
                  />
                </SelectListContainer>
              )}
              value={DateHelper.getHumanizeDateValue(
                formik.values.timeEnd || date || new Date()
              )}
              label={'Завершение'}
              containerProps={{ flex: '1 0 calc(50% - 6px)', maxWidth: '50%' }}
              isDirty={!!formik.touched.timeEnd}
              errorMessage={`${formik.errors.timeEnd || ''}`}
              icon={<CompleteIcon size={20} />}
            />
          </FlexBlock>
          <FlexBlock direction={'row'} pb={12}>
            <TextAreaInput
              rows={6}
              value={formik.values.description}
              onChange={(value) => formik.setFieldValue('description', value)}
              onFocus={() => formik.setFieldTouched('description', true)}
              errorMessage={formik.errors.description}
              isDirty={formik.touched.description}
              inputId={'task__description'}
              label={'Описание'}
              placeholder={'Произвольный текст, на заметку...'}
            />
          </FlexBlock>
        </FlexBlock>
        <FlexBlock
          width={'100%'}
          justify={'flex-end'}
          align={'center'}
          pl={20}
          pr={20}
          pt={12}
          pb={12}
          gap={12}
        >
          <Button type={'submit'}>Создать</Button>
          <StyledButton
            onClick={declineModal}
            fillColor={'#fff'}
            textColor={defaultColor}
          >
            Отменить
          </StyledButton>
        </FlexBlock>
      </FlexBlock>
    </form>
  );
};
