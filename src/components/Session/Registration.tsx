import {FC, useEffect, useState} from "react";
import {useFormik} from "formik";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import {Heading} from "../Text/Heading";
import {currentColor, defaultColor, disabledColor} from "../../common/constants";
import {css} from "styled-components";
import {TextInput} from "../Input/TextInput";
import {Tooltip} from "../Tooltip/Tooltip";
import {Button} from "../Buttons/Buttons.styled";
import * as yup from 'yup'
import {PhoneNumberRegExp} from "../../common/regExps";
import {InstagramLogoIcon} from "../Icons/SocialNetworkIcons/Instagram";
import {useAppDispatch, useAppSelector} from "../../store/hooks/hooks";
import {Link} from "react-router-dom";
import {LinkStyled} from "../Buttons/Link.styled";
import {PasswordIcon} from "../Icons/Session/PasswordIcon";
import {RegistrationUser} from "../../store/thunk/session";
import {clearRegistrationNextAction} from "../../store/reducers/session";
import {useNavigate} from "react-router-dom";


export interface RegistrationFormType {
	phone: string,
	password: string,
	confirmPassword: string,
}


const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

const validationSchema = yup.object().shape({
	phone: yup.string()
		.matches(PhoneNumberRegExp, {
			message: 'Указан невалидный номер телефона',
			name: 'registration/phone'
		}),
	password: yup.string()
		.required('Не бойтесь, мы храним ваш пароль в зашифрованном виде, его никто не узнает')
		.matches(pass, {
			message: 'Данный пароль не подходит, попробуйте другой в соответствие с инструкцией.'
		}),
	confirmPassword: yup.string()
		.required('Мы должны убедиться, что вы запомнили пароль. Продублируйте его в это поле!')
		.oneOf([yup.ref('password')], 'Введенные пароли не совпадают')
})


export const Registration: FC = () => {
	const dispatch = useAppDispatch()
	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		handleSubmit
	} = useFormik<RegistrationFormType>({
		initialValues: {
			phone: '',
			password: '',
			confirmPassword: '',
		},
		validateOnChange: true,
		validationSchema,
		onSubmit(values) {
			dispatch(RegistrationUser({data: values}))
		}
	})
	
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const nextAction = useAppSelector((state) => state.session.registrationNextAction)
	const navigate = useNavigate()
	
	
	useEffect(() => {
		return () => {
			dispatch(clearRegistrationNextAction(undefined))
		}
	}, [])
	
	useEffect(() => {
		nextAction === 'login' && navigate('/session/login', {replace: true})
	}, [nextAction])
	
	return (
		<FlexBlock width={'100%'} justify={'center'} pt={'3rem'}>
			<form onSubmit={handleSubmit}>
				<FlexBlock
					direction={'column'}
					width={'30rem'}
					p={'24px 16px'}
					border={`1px solid ${currentColor}`}
					borderRadius={4}
					additionalCss={css`
            box-shadow: 0px 2px 5px ${defaultColor};
					`}
				>
					<FlexBlock justify={'center'} width={'100%'} mb={24}>
						<Heading.H2
							style={{
								textAlign: 'center',
							}}
						>
							Регистрация пользователя
						</Heading.H2>
					</FlexBlock>
					<FlexBlock justify={'center'} mb={24} fSize={14} textAlign={'center'} width={'100%'}>
						Создайте учетную запись в сервисе "Онлайн планировщик дел" для доступа к личной доске планирования.
					</FlexBlock>
					<FlexBlock mb={24}>
						<TextInput
							label={'Укажите номер телефона'}
							value={values.phone}
							isDirty={touched.phone}
							onFocus={() => setFieldTouched('phone', true, false)}
							onChange={(e) => {
								setFieldValue('phone', e.target.value.replace(/\D/gi, ''))
							}}
							errorMessage={errors.phone}
							placeholder={'Например: 79119119191'}
							tooltip={
								<Tooltip size={20} text={'Используется для входа в систему'} placement={'top'}/>
							}
						/>
					</FlexBlock>
					<FlexBlock mb={24} wrap={'wrap'}>
						<TextInput
							type={showPassword ? 'text' : 'password'}
							value={values.password}
							label={'Укажите пароль'}
							onBlur={() => setFieldTouched('password', true, false)}
							onChange={(e) => setFieldValue('password', e.target.value)}
							isDirty={touched.password}
							errorMessage={errors.password}
							icon={<PasswordIcon
								color={defaultColor}
								withTooltip={true}
								isOpen={showPassword}
								onClick={() => setShowPassword(prev => !prev)}
							/>}
							placeholder={showPassword ? 'Начните ввод и вы увидите пароль' : 'Ваш собственный пароль'}
						/>
						{touched.password && errors.password && (
							<FlexBlock
								mt={6}
								bgColor={currentColor}
								borderRadius={4}
								width={'100%'}
								p={12}
								fSize={14}
							>
								<span style={{color: "#fff"}}>
									Пароль должен содержать как минимум одну строчную букву, одну заглавную букву, одну цифру и один
									специальный символ
								</span>
							</FlexBlock>
						)}
					
					</FlexBlock>
					<FlexBlock mb={24}>
						<TextInput
							value={values.confirmPassword}
							label={'Укажите пароль повторно'}
							isDirty={touched.confirmPassword}
							errorMessage={errors.confirmPassword}
							onChange={(e) => setFieldValue('confirmPassword', e.target.value, false)}
							onBlur={() => setFieldTouched('confirmPassword', true, true)}
							placeholder={showConfirmPassword ? 'Теперь вы увидите повторный пароль' : 'Пароли должны совпадать'}
							icon={<PasswordIcon
								withTooltip={true}
								color={defaultColor}
								isOpen={showConfirmPassword}
								onClick={() => setShowConfirmPassword(prev => !prev)}
							/>}
							tooltip={
								<Tooltip
									size={20}
									placement={'right'}
									text={'Повторное указание пароля необходимо в целях безопасности и пресечения возможных опечаток.'}
								/>
							}
						/>
					</FlexBlock>
					<FlexBlock mb={24} width={'100%'} textAlign={'center'} style={{color: defaultColor}} fSize={13}>
						*Создавая учетную запись вы подтверждаете свое согласие на обработку переданных нам данных во время
						использования сервиса.
						<br/>
						Ваши данные надежно защищены и хранятся в зашифрованном виде.
					</FlexBlock>
					<FlexBlock width={'100%'} justify={'center'} mb={24}>
						<Button type={'submit'}>
							Продолжить
						</Button>
					</FlexBlock>
					<FlexBlock width={'100%'} justify={'center'} align={'flex-end'} fSize={14}>
						У вас уже есть аккаунт?&nbsp;<LinkStyled to={'/session/login'}>Войти в систему</LinkStyled>
					</FlexBlock>
				</FlexBlock>
			</form>
		</FlexBlock>
	)
}