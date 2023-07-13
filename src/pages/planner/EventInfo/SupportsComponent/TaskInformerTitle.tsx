import { StyledTaskInformerLinkForm } from '../TaskInformer.styled';
import { EditableFieldsButtons } from './EditableFieldsButtons';
import { TaskInformerMoreActions } from './TaskInformerMoreActions';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LikeButton } from '@components/Buttons/LikeButton';
import { PencilIcon } from '@components/Icons/Icons';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';
import { Heading } from '@components/Text/Heading';
import { CutText } from '@components/Text/Text';
import { darkColor } from '@src/common/constants/constants';
import { kitColors, Tooltip } from 'chernikov-kit';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';


interface TaskInformerTitle {
  eventInfo: EventInfoModel;
  onChange: (newTitle: string) => Promise<void>;
  isLiked?: boolean;
  onChangeLiked?: (isLiked: boolean) => void;
}

interface TaskInformerTitleInputProps {
  oldValue: string;
  onDecline: () => void;
  onSave: (value: string) => Promise<void>;
}

const TaskInformerTitleInput: FC<TaskInformerTitleInputProps> = ({
  oldValue,
  onSave,
  onDecline,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    values,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
    handleSubmit,
  } = useFormik({
    initialValues: { title: oldValue },
    async onSubmit(values) {
      if (oldValue !== values.title) {
        setLoading(true);
        await onSave(values.title)
          .then(() => onDecline())
          .finally(() => setLoading(false));
      }
    },
  });

  return (
    <StyledTaskInformerLinkForm onSubmit={handleSubmit}>
      <TextInput
        placeholder={'Введите здесь название'}
        value={values.title}
        isDirty={touched.title}
        errorMessage={errors.title}
        onChange={(e) => setFieldValue('title', e.target.value)}
        onFocus={() => setFieldTouched('title', true, false)}
        buttons={
          <EditableFieldsButtons isLoading={loading} onDecline={onDecline} />
        }
      />
    </StyledTaskInformerLinkForm>
  );
};

export const TaskInformerTitle: FC<TaskInformerTitle> = ({
  eventInfo,
  onChange,
  onChangeLiked,
  isLiked,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <FlexBlock direction={'row'} justify={'start'} width={'100%'}>
      <FlexBlock gap={6} align={'flex-start'}>
        <TaskInformerMoreActions taskItem={eventInfo} />
        <LikeButton isChecked={!!isLiked} onChange={onChangeLiked} />
        <Heading.H2
          title={eventInfo.title}
          color={darkColor}
          style={{ lineHeight: '28px', fontWeight: 'normal' }}
        >
          <CutText color={darkColor} rows={1} fontSize={24} lineHeight={28}>
            {eventInfo.title}
          </CutText>
        </Heading.H2>
        <Tooltip
          visible={isEdit}
          theme={'light'}
          onClickOutside={() => setIsEdit(false)}
          placement={'bottom'}
          delay={[100, 200]}
          interactive={true}
          maxWidth={'600px'}
          content={
            <FlexBlock p={8} minWidth={500}>
              <TaskInformerTitleInput
                oldValue={eventInfo.title}
                onDecline={() => setIsEdit(false)}
                onSave={onChange}
              />
            </FlexBlock>
          }
        >
          <EmptyButtonStyled onClick={() => setIsEdit((prev) => !prev)}>
            <PencilIcon size={22} color={kitColors.primary} />
          </EmptyButtonStyled>
        </Tooltip>
      </FlexBlock>
    </FlexBlock>
  );
};