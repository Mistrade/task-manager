import React, {FC} from "react";
import {Routes} from 'react-router-dom'
import {Navigate, Route} from "react-router";
import {NotFoundPage} from "./NotFoundRoutes";
import {Loader} from "../Loaders/Loader";
import {WithSuspense} from "../Loaders/WithSuspense";
import {UserModelResponse} from "../../store/api/taskApi/types";

interface OnlyAuthRoutes {
	userInfo?: UserModelResponse | null,
}

const CalendarController = React.lazy(() => import('../Calendars/index').then(({CalendarMain}) => ({default: CalendarMain})))
const RegistrationForm = React.lazy(() => import('../Session/Registration').then(({Registration}) => ({default: Registration})))
const AuthorizationForm = React.lazy(() => import('../Session/AuthorizationForm').then(({AuthorizationForm}) => ({default: AuthorizationForm})))

export const AppRoutes: FC<OnlyAuthRoutes> = ({userInfo}) => {
	
	if (userInfo) {
		return (
			<Routes>
				<Route
					path={'calendar'}
				>
					<Route
						index
						element={<Navigate to={'/calendar/day/in_work'}/>}
					/>
					<Route
						path={':layout/*'}
						element={
							<React.Suspense fallback={<Loader title={'Загрузка сервиса планирования'} isActive={true}/>}>
								<CalendarController/>
							</React.Suspense>
						}
					/>
				</Route>
				<Route
					path={'profile/:id'}
					element={'Тут будет профиль пользователя'}
				/>
				<Route
					path={'*'}
					element={<NotFoundPage/>}
				/>
			</Routes>
		)
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