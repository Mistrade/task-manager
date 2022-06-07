import React, { useEffect } from 'react'
import './App.css'
import { createGlobalStyle, css } from 'styled-components'
import './common/dayjs'
import { Calendar } from './components/Calendars/Сalendar'
import { FlexBlock } from './components/LayoutComponents/FlexBlock'
import dayjs from 'dayjs'

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
    <div className="App" style={{ padding: 20 }}>
      <GlobalStyled/>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100vh'
        }}
      >
        <div style={{
          width: '80%',
          position: 'relative',
          height: 800,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Calendar
            initialCurrent={{
              layout: 'day',
              date: new Date( 2022, 5, 1 )
            }}
            disabledOptions={{}}
            renderWeekPattern={'full'}
          />
        </div>
      </div>
    </div>
  )
}

export default App
