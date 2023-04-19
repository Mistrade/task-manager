import { useFormik } from 'formik';
import { FC, memo, useState } from 'react';

import { currentColor } from '@src/common/constants/constants';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LikeButton } from '@components/Buttons/LikeButton';
import { PencilIcon } from '@components/Icons/Icons';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';
import { Heading } from '@components/Text/Heading';

import { StyledTaskInformerLinkForm } from '../TaskInformer.styled';
import { EditableFieldsButtons } from './EditableFieldsButtons';


interface TaskInformerTitle {
  title: string;
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

export const TaskInformerTitle: FC<TaskInformerTitle> = memo(
  ({ title, onChange, onChangeLiked, isLiked }) => {
    const [isEdit, setIsEdit] = useState(false);
    return (
      <FlexBlock direction={'row'} justify={'start'} width={'100%'}>
        {!isEdit ? (
          <FlexBlock gap={6} align={'flex-start'}>
            <LikeButton isChecked={!!isLiked} onChange={onChangeLiked} />
            <Heading.H2 style={{ lineHeight: '28px', fontWeight: 'normal' }}>
              {title}
            </Heading.H2>
            <EmptyButtonStyled onClick={() => setIsEdit(true)}>
              <PencilIcon size={22} color={currentColor} />
            </EmptyButtonStyled>
          </FlexBlock>
        ) : (
          <TaskInformerTitleInput
            oldValue={title}
            onDecline={() => setIsEdit(false)}
            onSave={onChange}
          />
        )}
      </FlexBlock>
    );
  },
  (prev, next) => prev.title === next.title && prev.isLiked === next.isLiked
);