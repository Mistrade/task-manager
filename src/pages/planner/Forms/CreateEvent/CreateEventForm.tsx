import { useAppSelector } from '@redux/hooks/hooks';
import { createEventInitialStateSelector } from '@selectors/calendarItems';
import { useFormik } from 'formik';
import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import {
  PRIORITY_TITLES,
  TASK_STATUSES,
  defaultColor,
  disabledColor,
  pageHeaderColor,
} from '@src/common/constants';

import { Button, StyledButton } from '@components/Buttons/Buttons.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Switcher } from '@components/Switcher/Switcher';
import { Heading } from '@components/Text/Heading';

import { ChainsShowcase } from '@planner/TaskInformer/LeftBar/Tabs/Chains/Connect/ChainsShowcase';
import {
  ToggleEventCalendar,
  ToggleEventPriority,
  ToggleEventStatus,
} from '@planner/TaskInformer/SupportsComponent/ToggleTaskInformerButtons';

import { useCreateEventMutation } from '@api/planning-api';
import { EventIdObject } from '@api/planning-api/types/event-info.types';
import { GroupModelResponse } from '@api/planning-api/types/groups.types';
import { MyServerResponse, ObjectId } from '@api/rtk-api.types';
import { CatchHandleForToast } from '@api/tools';

import { CreateEventDataObject } from '../../planner.types';
import { CreateEventFormAdditional } from './Tabs/Additional';
import { CreateEventInfoTab } from './Tabs/Info';
import { CreateEventMembersTab } from './Tabs/Members';


interface CreateEventFormProps {
  onClose?: () => void;
  groupsList?: Array<GroupModelResponse>;
  onSuccess?: (eventId: ObjectId) => void;
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

export enum CREATE_EVENT_FORM_TABS {
  'INFO' = 'info',
  'MEMBERS' = 'members',
  'CHAINS' = 'chains',
  'ADDITIONAL' = 'additional',
}

interface SwitcherItem {
  title: string;
  type: CREATE_EVENT_FORM_TABS;
}

const switcherList: Array<SwitcherItem> = [
  { title: 'Инфо', type: CREATE_EVENT_FORM_TABS.INFO },
  { title: 'Участники', type: CREATE_EVENT_FORM_TABS.MEMBERS },
  { title: 'Связи', type: CREATE_EVENT_FORM_TABS.CHAINS },
  { title: 'Доп. возможности', type: CREATE_EVENT_FORM_TABS.ADDITIONAL },
];

export const MaxHeightHidden = styled('div')`
  display: flex;
  flex-basis: 100%;
  overflow: hidden;
  width: 100%;
`;

export const CreateEventForm: FC<CreateEventFormProps> = ({
  groupsList,
  onSuccess,
  onClose,
}) => {
  const initialState = useAppSelector(createEventInitialStateSelector);
  const [addTask, { isLoading, status }] = useCreateEventMutation();
  const [tab, setTab] = useState<CREATE_EVENT_FORM_TABS>(
    CREATE_EVENT_FORM_TABS.INFO
  );

  const formik = useFormik<CreateEventDataObject>({
    async onSubmit(values) {
      await addTask(values)
        .unwrap()
        .then(
          (response: MyServerResponse<EventIdObject>) =>
            response.data?.eventId &&
            onSuccess &&
            onSuccess(response.data?.eventId)
        )
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
    <FlexBlock
      direction={'column'}
      basis={'100%'}
      width={'100%'}
      overflow={'hidden'}
    >
      <FlexBlock
        pt={24}
        mb={12}
        pl={20}
        pr={20}
        gap={12}
        bgColor={pageHeaderColor}
        borderRadius={`${borderRadiusSize.xl} ${borderRadiusSize.xl} 0px 0px`}
        direction={'column'}
        shrink={0}
        grow={0}
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
          onClick={(item) => setTab(item.type)}
          selected={tab}
        />
      </FlexBlock>
      <FlexBlock
        direction={'column'}
        p={'0px 20px'}
        grow={10}
        overflow={'hidden'}
      >
        <FlexBlock direction={'column'} height={'100%'}>
          {tab === CREATE_EVENT_FORM_TABS.INFO && (
            <CreateEventInfoTab
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              setFieldValue={formik.setFieldValue}
              setFieldTouched={formik.setFieldTouched}
            />
          )}
          {tab === CREATE_EVENT_FORM_TABS.MEMBERS && (
            <CreateEventMembersTab
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              setFieldValue={formik.setFieldValue}
              setFieldTouched={formik.setFieldTouched}
            />
          )}
          {tab === CREATE_EVENT_FORM_TABS.CHAINS && <ChainsShowcase />}
          {tab === CREATE_EVENT_FORM_TABS.ADDITIONAL && (
            <CreateEventFormAdditional
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              setFieldValue={formik.setFieldValue}
              setFieldTouched={formik.setFieldTouched}
            />
          )}
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
        <Button
          disabled={isLoading}
          type={'button'}
          onKeyDown={(event) => {
            event.preventDefault();
            if (event.key === 'Enter') return;
          }}
          onKeyUp={(event) => {
            event.preventDefault();
            if (event.key === 'Enter') return;
          }}
          onClick={async () => {
            const errs = await formik.validateForm(formik.values);
            const errKeys = Object.keys(errs);
            if (errKeys.length === 0) {
              await formik.submitForm();
            } else {
              formik.setErrors(errs);
              const touched: { [key: string]: boolean } = {};

              errKeys.forEach((key) => {
                touched[key] = true;
              });

              await formik.setTouched(touched);
            }
          }}
        >
          Создать
        </Button>
        <StyledButton
          disabled={isLoading}
          onClick={onClose}
          fillColor={'#fff'}
          textColor={defaultColor}
        >
          Отменить
        </StyledButton>
      </FlexBlock>
    </FlexBlock>
  );
};