import React, {FC} from "react";
import {UserModel} from "../Calendars/types";
import {Routes} from 'react-router-dom'
import {Navigate, Route} from "react-router";
import {NotFoundPage} from "./NotFoundRoutes";
import {Loader} from "../Loaders/Loader";

interface OnlyAuthRoutes {
	userInfo?: UserModel | null,
}

const CalendarController = React.lazy(() => import('../Calendars/index').then(({CalendarMain}) => ({default: CalendarMain})))

export const OnlyAuthRoutes: FC<OnlyAuthRoutes> = ({userInfo}) => {
	
	if (userInfo) {
		return (
			<Routes>
				<Route
					path={'calendar'}
				>
					<Route
						index
						element={<Navigate to={'/calendar/day'}/>}
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
					path={'*'}
					element={<NotFoundPage/>}
				/>
			</Routes>
		)
	}
	
	return <></>
}