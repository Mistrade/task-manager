import React, {FC} from "react";
import {UserModel} from "../Calendars/types";
import {Route} from "react-router";
import {Routes} from "react-router-dom";
import {NotFoundPage} from "./NotFoundRoutes";
import {WithSuspense} from "../Loaders/WithSuspense";

interface OnlyWithoutSessionRoutesProps {
	userInfo?: UserModel | null
}

const RegistrationForm = React.lazy(() => import('../Session/Registration').then(({Registration}) => ({default: Registration})))
const AuthorizationForm = React.lazy(() => import('../Session/AuthorizationForm').then(({AuthorizationForm}) => ({default: AuthorizationForm})))

export const OnlyWithoutSessionRoutes: FC<OnlyWithoutSessionRoutesProps> = ({userInfo}) => {
	if (userInfo) {
		return <></>
	}
	
	return (
		<Routes>
			<Route
				path={'session/registration'}
				element={
					<WithSuspense title={'Загрузка формы регистрации'}>
						<RegistrationForm/>
					</WithSuspense>
				}
			/>
			<Route
				path={'session/login'}
				element={
					<WithSuspense title={'Загрузка формы входа в систему'}>
						<AuthorizationForm/>
					</WithSuspense>
				}
			/>
			<Route
				path={'*'}
				element={<NotFoundPage/>}
			/>
		</Routes>
	)
}