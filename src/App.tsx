import React, { useEffect } from 'react'
import './App.css'
import { createGlobalStyle, css } from 'styled-components'
import './common/dayjs'
import { Calendar } from './components/Calendars/Сalendar'
import { FlexBlock } from './components/LayoutComponents/FlexBlock'
import dayjs from 'dayjs'
import { defaultTasksList } from './common/constants'

const GlobalStyled = createGlobalStyle( {}, css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
` )

function App() {

  useEffect( () => {
    document.title = 'Онлайн планировщик дел'
  }, [] )

  return (
    <div style={{ padding: 5 }}>
      <GlobalStyled/>
      <FlexBlock width={'100%'} justify={'flex-end'}>
        <FlexBlock width={'80%'}>
          <Calendar
            taskList={defaultTasksList}
            initialCurrent={{
              layout: 'day',
              date: new Date( 2022, 5, 1 )
            }}
            disabledOptions={{}}
            renderWeekPattern={'full'}
          />
        </FlexBlock>
      </FlexBlock>
    </div>
  )
}

export default App
