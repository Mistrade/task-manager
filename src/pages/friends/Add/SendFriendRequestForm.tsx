import { useAddContactMutation } from '@api/friends-api';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';
import { Button } from '@components/Buttons/Buttons.styled';
import { PhoneIcon } from '@components/Icons/Session/LogoutIcon';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';
import { Tooltip } from 'chernikov-kit';
import { useFormik } from 'formik';
import * as yup from 'yup';


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

export const SendFriendRequestForm = () => {
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
        .catch(CatchHandleForToast)
        .then(() => {
          formik.resetForm();
        });
    },
  });

  return (
    <Tooltip
      maxWidth={600}
      content={
        <form onSubmit={formik.handleSubmit} style={{ width: 500 }}>
          <FlexBlock p={8} width={'100%'}>
            <TextInput
              containerProps={{ width: '100%' }}
              placeholder={'Номер или почта контакта в системе'}
              iconPlacement={'left'}
              icon={<PhoneIcon size={20} />}
              value={formik.values.value}
              onFocus={() => formik.setFieldTouched('value', true)}
              isDirty={formik.touched.value}
              errorMessage={formik.errors.value}
              onChange={(e) => formik.setFieldValue('value', e.target.value)}
            />
          </FlexBlock>
        </form>
      }
      theme={'light'}
      placement={'bottom-start'}
      arrow={false}
      hideOnClick={true}
      trigger={'click'}
      interactive={true}
      interactiveBorder={20}
    >
      <Button type={'button'}>Добавить в друзья</Button>
    </Tooltip>
  );
};