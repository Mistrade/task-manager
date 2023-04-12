import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@components/LayoutComponents/Modal/Modal';
import { FC, useEffect } from 'react';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { colorPalette, currentColor } from '@src/common/constants';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ColorScheme } from '@components/ColorScheme/ColorScheme';
import { TextInput } from '@components/Input/TextInput/TextInput';
import {
  useCreateEventGroupMutation,
  useUpdateGroupInfoMutation,
} from '@api/planning-api';
import { Button, WhiteButton } from '@components/Buttons/Buttons.styled';
import { InputErrorMessage } from '@components/Input/InputSupportComponents/InputErrorMessage';
import { ChangeGroupModalProps, CreateGroupProps } from './groups.types';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

const validationSchema = yup.object().shape({
  color: yup
    .string()
    .test((value, helpers) => {
      if (!value) {
        return helpers.createError({
          message: 'Цвет обязателен',
        });
      }

      const hasColor = colorPalette.find((item) => {
        return item.toLowerCase() === value.toLowerCase();
      });

      if (!hasColor) {
        return helpers.createError({
          message: 'Выберите цвет из предложенных',
        });
      }

      return true;
    })
    .required('Выберите цвет календаря'),
  title: yup
    .string()
    .min(5, 'Минимальная длина - 5 символов')
    .max(20, 'Максимальная длина - 20 символов')
    .required('Укажите название календаря'),
});

export const CreateOrUpdateGroupModal: FC<ChangeGroupModalProps> = ({
  onClose,
  isEditing,
  initialValues,
}) => {
  const [create] = useCreateEventGroupMutation();
  const [update] = useUpdateGroupInfoMutation();

  const {
    setFieldValue,
    values,
    errors,
    touched,
    setFieldTouched,
    handleSubmit,
    setFieldError,
    setValues,
  } = useFormik<CreateGroupProps>({
    validationSchema,
    initialValues: initialValues || {
      groupId: '',
      color: currentColor,
      title: 'Новая группа',
    },
    async onSubmit(values, { setFieldError }) {
      if (!isEditing) {
        return await create(values)
          .unwrap()
          .then((data) => thenHandleForToast(data, () => onClose && onClose()))
          .catch(CatchHandleForToast);
      }

      return await update(values)
        .unwrap()
        .then((data) => thenHandleForToast(data, () => onClose && onClose()))
        .catch(CatchHandleForToast);
    },
  });

  useEffect(() => {
    if (isEditing && initialValues) {
      setValues(initialValues, true);
    }
  }, [isEditing, initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <Modal style={{ height: 'fit-content' }} isView={true} onClose={onClose}>
        <ModalHeader>
          <FlexBlock align={'center'} justify={'flex-start'} gap={12}>
            <FlexBlock fSize={20}>
              {!isEditing
                ? 'Создайте новую группу событий'
                : 'Измените группу событий'}
            </FlexBlock>
          </FlexBlock>
        </ModalHeader>
        <ModalBody>
          <FlexBlock p={20} direction={'row'} gap={12}>
            <FlexBlock
              direction={'column'}
              shrink={1}
              grow={0}
              maxWidth={400}
              gap={24}
            >
              <FlexBlock>
                <TextInput
                  label={'Укажите название'}
                  value={values.title}
                  onChange={(e) => setFieldValue('title', e.target.value)}
                  placeholder={'От 5 до 20 символов'}
                  errorMessage={errors.title}
                  isDirty={touched.title}
                  onFocus={() => setFieldTouched('title', true, false)}
                />
              </FlexBlock>
              <FlexBlock direction={'column'} width={'100%'}>
                <FlexBlock style={{ color: currentColor }} mb={8} pl={8}>
                  Выберите понравившийся цвет
                </FlexBlock>
                <FlexBlock width={'100%'} direction={'column'} gap={6}>
                  <ColorScheme
                    selectedValue={values.color}
                    isError={!!errors.color}
                    size={40}
                    gap={2}
                    onSelect={(color) => {
                      !touched.color && setFieldTouched('color', true, false);
                      color !== values.color && setFieldValue('color', color);
                    }}
                  />
                  <InputErrorMessage
                    isDirty={touched.color}
                    errorMessage={errors.color}
                  />
                </FlexBlock>
              </FlexBlock>
            </FlexBlock>
          </FlexBlock>
        </ModalBody>
        <ModalFooter>
          <FlexBlock
            width={'100%'}
            justify={'flex-end'}
            align={'center'}
            gap={8}
          >
            <Button type={'submit'}>
              {isEditing ? 'Изменить' : 'Создать'}
            </Button>
            <WhiteButton onClick={onClose}>Отмена</WhiteButton>
          </FlexBlock>
        </ModalFooter>
      </Modal>
    </form>
  );
};
