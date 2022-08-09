import React, {useEffect} from 'react'
import {createGlobalStyle, css} from 'styled-components'
import './common/dayjs'
import {Calendar} from './components/Calendars/Сalendar'
import {FlexBlock} from './components/LayoutComponents/FlexBlock'
import {defaultTasksList} from './common/constants'
import {Provider} from 'react-redux'
import {store} from './store'

const GlobalStyled = createGlobalStyle({}, css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`)

function App() {
	
	useEffect(() => {
		document.title = 'Онлайн планировщик дел'
	}, [])
	
	return (
		<Provider store={store}>
			<div style={{padding: 5}}>
				<GlobalStyled/>
				<FlexBlock width={'100%'} justify={'flex-end'}>
					<FlexBlock width={'80%'}>
						<Calendar
							taskList={defaultTasksList}
							initialCurrent={{
								layout: 'day',
								date: new Date()
							}}
							disabledOptions={{}}
							renderWeekPattern={'full'}
						/>
					</FlexBlock>
				</FlexBlock>
			</div>
		</Provider>
	
	)
}

export default App
