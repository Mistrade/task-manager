import {TextInput} from "../Input/TextInput/TextInput";
import {useFormik} from "formik";
import {Button} from "../Buttons/Buttons.styled";
import {SessionFormContainer} from "./SessionFormContainer";
import {Heading} from "../Text/Heading";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import {PasswordInput} from "../Input/PasswordInput/PasswordInput";
import {useLoginMutation} from "../../store/api/session-api";
import {toast} from "react-toastify";
import {defaultColor} from "../../common/constants";
import {AuthValidationScheme} from "../../common/validation/session";
import {useAppSelector} from "../../store/hooks/hooks";
import {useSearchNavigate} from "../../hooks/useSearchNavigate";
import {AuthUserRequestProps} from "../../store/api/session-api/session-api.types";

const initialValues: AuthUserRequestProps = {
	phone: '',
	password: ''
}

export const AuthorizationForm = () => {
	const navigate = useSearchNavigate()
	const [loginUser] = useLoginMutation()
	const {statuses} = useAppSelector(state => state.planner)
	const {
		values,
		setFieldValue,
		setFieldTouched,
		handleSubmit,
		touched,
		errors
	} = useFormik({
		initialValues,
		validationSchema: AuthValidationScheme,
		async onSubmit(values) {
			const result = await loginUser(values).unwrap()
			
			if (result?.info) {
				toast(result.info.message, {
					type: result.info.type,
				})
				
				if (result.info.type === 'success') {
					navigate(`/planner/day/${statuses}`, {replace: true})
				}
			}
		}
	})
	
	
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
						setFieldValue('phone', e.target.value)
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
						setFieldValue('password', e.target.value)
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
				style={{color: defaultColor}}
				fSize={13}
			>
				*Выполняя вход в систему вы подтверждаете свое согласие на обработку переданных нам данных во время
				использования сервиса.
				<br/>
				<strong>Ваши данные надежно защищены и хранятся в зашифрованном виде.</strong>
			</FlexBlock>
			<FlexBlock justify={'center'}>
				<Button
					type={"submit"}
				>
					Продолжить
				</Button>
			</FlexBlock>
		</SessionFormContainer>
	)
}