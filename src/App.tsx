import React from 'react'
import {createGlobalStyle, css} from 'styled-components'
import './common/dayjs'
import {FlexBlock} from './components/LayoutComponents/FlexBlock'
import {MainHeader} from "./components/MainHeader/MainHeader";
import {AppRoutes} from "./components/AppRoutes/AppRoutes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useConfirmSessionQuery} from "./store/api/sessionApi";
import {Loader} from "./components/Loaders/Loader";

const GlobalStyled = createGlobalStyle({}, css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", sans-serif;
  }
`)

function App() {
	const {data: userInfo, isFetching, isError} = useConfirmSessionQuery()
	
	return (
		<>
			<Loader title={'Проверка сессии пользователя...'} isActive={isFetching}>
				<FlexBlock width={'100%'} direction={'column'} height={'100vh'}>
					<GlobalStyled/>
					<MainHeader
						userInfo={isError ? undefined : userInfo?.data}
						msOptions={{
							calendar: {renderWeekPattern: 'full'}
						}}
					/>
					<FlexBlock height={'calc(100vh - 70px)'}>
						<AppRoutes userInfo={isError ? undefined : userInfo?.data}/>
					</FlexBlock>
				</FlexBlock>
			</Loader>
			<ToastContainer pauseOnHover={true} position={'top-right'} autoClose={4000} limit={2} newestOnTop={true}/>
		</>
	)
}

export default App
