import React, {useEffect} from 'react'
import {createGlobalStyle, css} from 'styled-components'
import './common/dayjs'
import {Calendar} from './components/Calendars/Сalendar'
import {FlexBlock} from './components/LayoutComponents/FlexBlock'
import {Provider} from 'react-redux'
import {store} from './store'
import {Registration} from "./components/Session/Registration";
import {BrowserRouter, Routes, useNavigate} from "react-router-dom";
import {Route} from "react-router";
import {AuthorizationForm} from "./components/Session/AuthorizationForm";
import {useAppDispatch, useAppSelector} from "./store/hooks/hooks";
import {CheckUserSession} from "./store/thunk/session";

const GlobalStyled = createGlobalStyle({}, css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", sans-serif;
  }
`)

function App() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		document.title = 'Онлайн планировщик дел'
		dispatch(CheckUserSession())
	}, [])
	
	const isAuth = useAppSelector(state => state.session.isAuth)
	
	return (
		<FlexBlock width={'100%'}>
			<GlobalStyled/>
			<Routes>
				<Route
					path={'session/registration'}
					element={<Registration/>}
				/>
				<Route
					path={'session/login'}
					element={<AuthorizationForm/>}
				/>
				{isAuth && (
					<Route
						path={'calendar/*'}
						element={
							<Calendar
								initialCurrent={{
									layout: 'day',
									date: new Date()
								}}
								disabledOptions={{}}
								renderWeekPattern={'full'}
							/>
						}
					>
					</Route>
				)}
			</Routes>
		
		</FlexBlock>
	)
}

export default App
