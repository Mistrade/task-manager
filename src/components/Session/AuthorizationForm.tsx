import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout, plannerSelectStatus } from '@selectors/planner';
import { useFormik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-toastify';

import { defaultColor } from '@src/common/constants/constants';
import { AuthValidationScheme } from '@src/common/validation/session';

import { Button } from '@components/Buttons/Buttons.styled';
import { Informer } from '@components/Inform/Informer';
import { PasswordInput } from '@components/Input/PasswordInput/PasswordInput';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';
import { Heading } from '@components/Text/Heading';

import { useLoginMutation } from '@api/session-api';
import { AuthUserRequestProps } from '@api/session-api/session-api.types';

import { SessionFormContainer } from './SessionFormContainer';

const initialValues: AuthUserRequestProps = {
  phone: '',
  password: '',
};

export const AuthorizationForm: FC<{ prevUrl?: string }> = ({ prevUrl }) => {
  const navigate = useSearchNavigate();
  const [loginUser] = useLoginMutation();
  const layout = useAppSelector(plannerSelectLayout);
  const {
    values,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    touched,
    errors,
  } = useFormik({
    initialValues,
    validationSchema: AuthValidationScheme,
    async onSubmit(values) {
      const result = await loginUser(values).unwrap();

      if (result?.info) {
        toast(result.info.message, {
          type: result.info.type,
        });

        if (result.info.type === 'success') {
          if (prevUrl) {
            navigate(prevUrl, { replace: true });
          } else {
            navigate(`/planner/${layout}`, { replace: true });
          }
        }
      }
    },
  });

  return (
    <SessionFormContainer handleSubmit={handleSubmit}>
      <FlexBlock justify={'center'} width={'100%'}>
        <Heading.H2
          style={{
            textAlign: 'center',
          }}
        >
          Вход в систему
        </Heading.H2>
      </FlexBlock>
      <FlexBlock>
        <TextInput
          label={'Укажите номер телефона'}
          placeholder={'Номер телефона, указанный при регистрации'}
          value={values.phone}
          onFocus={() => setFieldTouched('phone', true, false)}
          onChange={(e) => {
            setFieldValue('phone', e.target.value);
          }}
          isDirty={touched.phone}
          errorMessage={errors.phone}
        />
      </FlexBlock>
      <FlexBlock>
        <PasswordInput
          label={'Укажите пароль'}
          placeholder={'Пароль, указанный при регистрации'}
          value={values.password}
          onFocus={() => setFieldTouched('password', true, false)}
          onChange={(e) => {
            setFieldValue('password', e.target.value);
          }}
          isDirty={touched.password}
          errorMessage={errors.password}
        />
      </FlexBlock>
      <FlexBlock
        width={'100%'}
        textAlign={'center'}
        wrap={'wrap'}
        justify={'center'}
        style={{ color: defaultColor }}
        fSize={13}
      >
        <Informer>
          *Выполняя вход в систему вы подтверждаете свое согласие на обработку
          переданных нам данных во время использования сервиса.
        </Informer>
        <br />
        <strong>
          Ваши данные надежно защищены и хранятся в зашифрованном виде.
        </strong>
      </FlexBlock>
      <FlexBlock justify={'center'}>
        <Button type={'submit'}>Продолжить</Button>
      </FlexBlock>
    </SessionFormContainer>
  );
};
