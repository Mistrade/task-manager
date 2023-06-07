import { useAppSelector } from '@redux/hooks/hooks';
import { createEventInitialStateSelector } from '@selectors/planner';
import { useFormik } from 'formik';
import { FC, useContext, useMemo, useState } from 'react';
import {
  CreateEventDataObject,
  CreateEventRequestData,
} from 'src/pages/planner/types';
import styled from 'styled-components';
import * as yup from 'yup';

import {
  PRIORITY_TITLES,
  defaultColor,
  disabledColor,
  pageHeaderColor,
} from '@src/common/constants/constants';
import { CREATE_EVENT_FORM_TABS } from '@src/common/constants/enums';
import { TASK_STATUSES } from '@src/common/constants/signatures';
import { borderRadiusSize } from '@src/common/css/mixins';
import { CreateEventMembersTab } from '@src/pages/planner/Forms/CreateEvent/Tabs/Members/Members';

import { ButtonWithLoading } from '@components/Buttons/ButtonWithLoading';
import { StyledButton } from '@components/Buttons/Buttons.styled';
import { FlexBlock } from '@components/LayoutComponents';
import { ModalContext } from '@components/LayoutComponents/Modal/Modal';
import { Switcher } from '@components/Switcher/Switcher';
import { Heading } from '@components/Text/Heading';

import { ChainsShowcase } from '@planner/EventInfo/LeftBar/Tabs/Chains/Connect/ChainsShowcase';
import {
  ToggleEventCalendar,
  ToggleEventPriority,
  ToggleEventStatus,
} from '@planner/EventInfo/SupportsComponent/ToggleTaskInformerButtons';

import { useCreateEventMutation } from '@api/planning-api';
import { EventIdObject } from '@api/planning-api/types/event-info.types';
import { GroupModelResponse } from '@api/planning-api/types/groups.types';
import { MyServerResponse, ObjectId } from '@api/rtk-api.types';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

import { CreateEventFormAdditional } from './Tabs/Additional';
import { CreateEventInfoTab } from './Tabs/Info';


interface CreateEventFormProps {
  onClose?: () => void;
  groupsList?: Array<GroupModelResponse>;
  onSuccess?: (eventId: ObjectId) => void;
}

export const LinkValidationSchema = yup
  .object({
    key: yup.string(),
    value: yup.string().url('Ссылка должна быть корректным url-адресом'),
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

  const modalContext = useContext(ModalContext);

  const formik = useFormik<CreateEventDataObject>({
    async onSubmit(values) {
      const data: CreateEventRequestData = {
        ...values,
        members: Object.values(values.members),
        widget: values.widget
          ? {
              message: values.widget.message,
              title: values.widget.title,
              model: values.widget.data._id,
              modelName: values.widget.model,
              fromEvent: values.widget.fromEvent,
            }
          : undefined,
      };

      await addTask(data)
        .unwrap()
        .then((response: MyServerResponse<EventIdObject>) => {
          thenHandleForToast(response);
          modalContext?.closeModalAnimation().then(() => {
            response.data?.eventId &&
              onSuccess &&
              onSuccess(response.data?.eventId);
          });
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
          {formik.values.title.length >= 3
            ? formik.values.title
            : 'Создайте новое событие'}
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
        <ButtonWithLoading
          buttonType={'primary'}
          isLoading={isLoading}
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
        </ButtonWithLoading>
        <StyledButton
          disabled={isLoading}
          onClick={() => {
            if (modalContext?.closeModalAnimation) {
              modalContext.closeModalAnimation().then(onClose);
            } else {
              onClose && onClose();
            }
          }}
          fillColor={'#fff'}
          textColor={defaultColor}
        >
          Отменить
        </StyledButton>
      </FlexBlock>
    </FlexBlock>
  );
};