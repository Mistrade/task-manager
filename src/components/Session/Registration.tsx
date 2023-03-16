import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { FlexBlock } from '../LayoutComponents/FlexBlock';
import { Heading } from '../Text/Heading';
import { defaultColor } from '../../common/constants';
import { TextInput } from '../Input/TextInput/TextInput';
import { Tooltip } from '../Tooltip/Tooltip';
import { Button } from '../Buttons/Buttons.styled';
import { LinkStyled } from '../Buttons/Link.styled';
import { SessionFormContainer } from './SessionFormContainer';
import { PasswordInput } from '../Input/PasswordInput/PasswordInput';
import { useRegistrationMutation } from '../../store/api/session-api';
import { toast } from 'react-toastify';
import { RegistrationValidationScheme } from '../../common/validation/session';
import { useSearchNavigate } from '../../hooks/useSearchNavigate';
import { RegUserRequestProps } from '../../store/api/session-api/session-api.types';

export const Registration: FC = () => {
  const [regUser, { data, isSuccess, isLoading, status, isError }] =
    useRegistrationMutation();
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = useFormik<RegUserRequestProps>({
    initialValues: {
      phone: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: '',
    },
    validateOnChange: true,
    validationSchema: RegistrationValidationScheme,
    async onSubmit(values) {
      await regUser(values).unwrap();
    },
  });

  const navigate = useSearchNavigate();

  useEffect(() => {
    if (data?.info?.type) {
      const { info } = data;

      toast(info.message, {
        type: info.type,
      });

      if (info.type === 'success') {
        navigate('/session/login', { replace: true });
      }
    }
  }, [data]);

  return (
    <SessionFormContainer handleSubmit={handleSubmit}>
      <FlexBlock justify={'center'} width={'100%'}>
        <Heading.H2
          style={{
            textAlign: 'center',
          }}
        >
          Регистрация пользователя
        </Heading.H2>
      </FlexBlock>
      <FlexBlock
        justify={'center'}
        fSize={14}
        textAlign={'left'}
        width={'100%'}
      >
        Создайте учетную запись в сервисе "Онлайн планировщик дел" для доступа к
        личной доске планирования.
      </FlexBlock>
      <FlexBlock>
        <TextInput
          label={'Укажите номер телефона'}
          value={values.phone}
          isDirty={touched.phone}
          onFocus={() => setFieldTouched('phone', true, false)}
          onChange={(e) => {
            setFieldValue('phone', e.target.value.replace(/\D/gi, ''));
          }}
          readOnly={isLoading}
          errorMessage={errors.phone}
          placeholder={'Например: 79119119191'}
          tooltip={
            <Tooltip
              size={20}
              content={'Используется для входа в систему'}
              placement={'top'}
            />
          }
        />
      </FlexBlock>
      <FlexBlock width={'100%'} gap={24}>
        <TextInput
          label={'Укажите Ваше имя'}
          value={values.name}
          isDirty={touched.name}
          errorMessage={errors.name}
          readOnly={isLoading}
          onFocus={() => setFieldTouched('name', true, false)}
          onChange={(e) => setFieldValue('name', e.target.value)}
          placeholder={'Например: Иван'}
        />
        <TextInput
          label={'Укажите Вашу фамилию'}
          value={values.surname}
          isDirty={touched.surname}
          errorMessage={errors.surname}
          readOnly={isLoading}
          onFocus={() => setFieldTouched('surname', true, false)}
          onChange={(e) => setFieldValue('surname', e.target.value)}
          placeholder={'Например: Иванов'}
        />
      </FlexBlock>
      <FlexBlock width={'100%'} gap={24}>
        <PasswordInput
          value={values.password}
          label={'Укажите пароль'}
          onBlur={() => setFieldTouched('password', true, false)}
          onChange={(e) => setFieldValue('password', e.target.value)}
          isDirty={touched.password}
          readOnly={isLoading}
          errorMessage={errors.password}
          placeholder={'Ваш собственный пароль'}
        />
        <PasswordInput
          value={values.confirmPassword}
          label={'Укажите пароль повторно'}
          isDirty={touched.confirmPassword}
          errorMessage={errors.confirmPassword}
          readOnly={isLoading}
          onChange={(e) =>
            setFieldValue('confirmPassword', e.target.value, false)
          }
          onBlur={() => setFieldTouched('confirmPassword', true, true)}
          placeholder={'Пароли должны совпадать'}
        />
      </FlexBlock>
      <FlexBlock
        width={'100%'}
        textAlign={'center'}
        style={{ color: defaultColor }}
        fSize={13}
      >
        *Создавая учетную запись вы подтверждаете свое согласие на обработку
        переданных нам данных во время использования сервиса.
        <br />
        Ваши данные надежно защищены и хранятся в зашифрованном виде.
      </FlexBlock>
      <FlexBlock width={'100%'} justify={'center'}>
        <Button type={'submit'} disabled={isLoading}>
          Продолжить
        </Button>
      </FlexBlock>
      <FlexBlock
        width={'100%'}
        justify={'center'}
        align={'flex-end'}
        fSize={14}
      >
        У вас уже есть аккаунт?&nbsp;
        <LinkStyled to={'/session/login'}>Войти в систему</LinkStyled>
      </FlexBlock>
    </SessionFormContainer>
  );
};
