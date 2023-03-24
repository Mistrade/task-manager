import { ContactBlock } from './AddContact.styled';
import { TextInput } from '../../../components/Input/TextInput/TextInput';
import { PhoneIcon } from '../../../components/Icons/Session/LogoutIcon';
import { FlexBlock } from '../../../components/LayoutComponents/FlexBlock';
import { EmptyButtonStyled } from '../../../components/Buttons/EmptyButton.styled';
import { Button } from '../../../components/Buttons/Buttons.styled';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAddContactMutation } from '../../../store/api/friends-api';
import {
  CatchHandleForToast,
  thenHandleForToast,
} from '../../../store/api/tools';

const phonePattern = new RegExp(
  /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/
);

const schema = yup.object().shape({
  value: yup
    .string()
    .test('test-value', async (value: string | undefined, { createError }) => {
      if (!value || value?.length < 5) {
        console.log('< 5');
        return createError({
          message: 'Не менее 5 символов',
        });
      }

      const isPhoneNumber = /^((\+7|7|8)+([0-9]){10})$/.test(value);

      console.log('isPhone: ', isPhoneNumber, value);

      if (isPhoneNumber) {
        return true;
      }

      console.log('123', value);

      try {
        const isEmail = await yup
          .string()
          .email()
          .validateSync(value, { strict: true, abortEarly: false });

        console.log(isEmail);

        if (isEmail) {
          return true;
        }
      } catch (e) {
        return createError({
          message: 'Укажите номер телефона или email',
        });
      }

      return createError({
        message: 'Укажите номер телефона или email',
      });
    }),
});

export const AddContactForm = () => {
  const [addContact] = useAddContactMutation();
  const formik = useFormik({
    initialValues: {
      value: '',
    },
    validationSchema: schema,
    onSubmit: async (values, formikHelpers) => {
      await addContact({
        phoneOrEmail: values.value,
      })
        .unwrap()
        .then(thenHandleForToast)
        .catch(CatchHandleForToast);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <ContactBlock p={'12px 24px'}>
        <FlexBlock width={'100%'} direction={'column'} gap={12}>
          <TextInput
            placeholder={'Номер или почта контакта в системе'}
            iconPlacement={'left'}
            icon={<PhoneIcon size={20} />}
            value={formik.values.value}
            onFocus={() => formik.setFieldTouched('value', true)}
            isDirty={formik.touched.value}
            errorMessage={formik.errors.value}
            onChange={(e) => formik.setFieldValue('value', e.target.value)}
            buttons={
              <FlexBlock
                direction={'row'}
                align={'center'}
                gap={6}
                justify={'flex-end'}
              >
                <Button type={'submit'}>Добавить</Button>
                <EmptyButtonStyled onClick={() => formik.resetForm()}>
                  Очистить
                </EmptyButtonStyled>
              </FlexBlock>
            }
          />
        </FlexBlock>
      </ContactBlock>
    </form>
  );
};
