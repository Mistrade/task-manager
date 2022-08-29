import {TextInput} from "../Input/TextInput";
import {useFormik} from "formik";
import {Button} from "../Buttons/Buttons.styled";
import {useAppDispatch, useAppSelector} from "../../store/hooks/hooks";
import {AuthorizationUser} from "../../store/thunk/session";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const initialValues = {
	phone: '',
	password: ''
}

export const AuthorizationForm = () => {
	const dispatch = useAppDispatch()
	const {
		values,
		setFieldValue,
		handleSubmit
	} = useFormik({
		initialValues,
		onSubmit(values) {
			dispatch(AuthorizationUser(values))
				.then(r => {
					navigate('/calendar', {replace: true})
				})
		}
	})
	
	const navigate = useNavigate()
	
	return (
		<form onSubmit={handleSubmit}>
			<TextInput
				label={'Укажите номер телефона'}
				value={values.phone}
				onChange={(e) => {
					setFieldValue('phone', e.target.value, false)
				}}
			/>
			<TextInput
				label={'Укажите пароль'}
				value={values.password}
				onChange={(e) => {
					setFieldValue('password', e.target.value)
				}}
			/>
			<Button
				type={"submit"}
			>
				Продолжить
			</Button>
		</form>
	)
}