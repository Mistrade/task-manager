import * as yup from 'yup';
import { passRegExp, PhoneNumberRegExp } from '../regExps';

export const AuthValidationScheme = yup.object().shape({
  phone: yup.string().matches(PhoneNumberRegExp, {
    message: 'Указан невалидный номер телефона',
    name: 'registration/phone',
  }),
  password: yup
    .string()
    .required(
      'Не бойтесь, мы храним ваш пароль в зашифрованном виде, его никто не узнает'
    )
    .matches(passRegExp, {
      message:
        'Пароль должен содержать как минимум одну строчную букву, одну заглавную букву, одну цифру и один специальный символ',
    }),
});

export const RegistrationValidationScheme = AuthValidationScheme.shape({
  confirmPassword: yup
    .string()
    .required(
      'Мы должны убедиться, что вы запомнили пароль. Продублируйте его в это поле!'
    )
    .oneOf([yup.ref('password')], 'Введенные пароли не совпадают'),
  name: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .matches(/^[А-Яа-яЁё]+$/gi, {
      message: 'Имя должно быть на русском языке, без цифр и спецсимволов',
      name: 'registration/name',
    })
    .min(2, 'Имя должно быть более или равно 2 символам'),
  surname: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .matches(/^[А-Яа-яЁё]+$/gi, {
      message: 'Фамилия должна быть на русском языке, без цифр и спецсимволов',
      name: 'registration/surname',
    })
    .min(2, 'Фамилия должна быть более или равна 2 символам'),
});
