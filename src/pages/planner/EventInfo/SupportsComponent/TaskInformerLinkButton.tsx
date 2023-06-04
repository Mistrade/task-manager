import { StyledTaskInformerLinkForm } from '../TaskInformer.styled';
import { EditableFieldsButtons } from './EditableFieldsButtons';
import { EventInfoUpdateFn } from './ToggleTaskInformerButtons';
import {
  JoinToEventButton,
  TransparentButton,
} from '@components/Buttons/Buttons.styled';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PencilIcon, TrashIcon } from '@components/Icons/Icons';
import { SelectLinks } from '@components/Input/SelectInput/CalendarSelectInputs/SelectLinks';
import { FlexBlock } from '@components/LayoutComponents';
import { LinkValidationSchema } from '@planner/Forms/CreateEvent/CreateEventForm';
import { EventItem, EventLinkItem } from '@planner/types';
import { Tooltip } from 'chernikov-kit';
import { useFormik } from 'formik';
import React, { FC, ReactNode, useState } from 'react';
import * as yup from 'yup';


interface InformerTaskAddLinkProps {
  onDecline: () => void;
  onSave: (field: 'link', data: EventLinkItem) => Promise<void>;
  link: EventLinkItem | null;
}

const TaskInformerLinkInput: FC<InformerTaskAddLinkProps> = ({
  onDecline,
  onSave,
  link,
}) => {
  const [loading, setLoading] = useState(false);
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: { link },
    validationSchema: yup.object().shape({
      link: LinkValidationSchema,
    }),
    async onSubmit(values, formikHelpers) {
      console.log(values);
      if (values.link && link?.value !== values.link?.value) {
        console.log(123);
        setLoading(true);
        await onSave('link', values.link)
          .then(() => onDecline())
          .finally(() => setLoading(false));
      }
    },
  });

  return (
    <StyledTaskInformerLinkForm onSubmit={handleSubmit}>
      <SelectLinks
        initialLinkValue={values.link}
        initialShowNotification={false}
        inputId={'select__link'}
        onChange={(value) => {
          setFieldValue('link', value, false);
        }}
        buttons={
          <EditableFieldsButtons isLoading={loading} onDecline={onDecline} />
        }
      />
    </StyledTaskInformerLinkForm>
  );
};

interface TaskInformerLinkButtonProps {
  link: EventItem['link'];
  updateFn: EventInfoUpdateFn;
}

interface TooltipContentProps {
  children: ReactNode;
  onClose: () => void;
  updateFn: InformerTaskAddLinkProps['onSave'];
  visible: boolean;
  linkValue?: EventLinkItem | null;
}

const TooltipContent: FC<TooltipContentProps> = ({
  children,
  linkValue,
  onClose,
  updateFn,
  visible,
}) => {
  return (
    <Tooltip
      visible={visible}
      onClickOutside={onClose}
      theme={'light'}
      placement={'bottom'}
      delay={[100, 200]}
      interactive={true}
      maxWidth={600}
      content={
        <FlexBlock p={8} width={'100%'} minWidth={500}>
          <TaskInformerLinkInput
            onDecline={onClose}
            onSave={updateFn}
            link={linkValue || null}
          />
        </FlexBlock>
      }
    >
      {children}
    </Tooltip>
  );
};

export const TaskInformerLinkButton: FC<TaskInformerLinkButtonProps> = ({
  link,
  updateFn,
}) => {
  const [editMode, setEditMode] = useState(false);

  const declineHandler = () => {
    setEditMode(false);
  };

  const toggle = () => setEditMode((prev) => !prev);

  return (
    <FlexBlock justify={'flex-start'} align={'center'} width={'100%'} gap={6}>
      {link?.value ? (
        <>
          <JoinToEventButton href={link.value} target={'_blank'} rel={''}>
            Подключиться по ссылке
          </JoinToEventButton>
          <TooltipContent
            onClose={declineHandler}
            updateFn={updateFn}
            visible={editMode}
            linkValue={link}
          >
            <EmptyButtonStyled onClick={toggle}>
              <PencilIcon size={22} />
            </EmptyButtonStyled>
          </TooltipContent>
          <EmptyButtonStyled onClick={() => updateFn('link', null)}>
            <TrashIcon size={22} />
          </EmptyButtonStyled>
        </>
      ) : (
        <TooltipContent
          onClose={declineHandler}
          updateFn={updateFn}
          visible={editMode}
          linkValue={link}
        >
          <TransparentButton type={'button'} onClick={toggle}>
            Добавить ссылку
          </TransparentButton>
        </TooltipContent>
      )}
    </FlexBlock>
  );
};