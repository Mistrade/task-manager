import React, { useEffect } from 'react'
import './App.css'
import { createGlobalStyle, css } from 'styled-components'
import './common/dayjs'
import { Calendar } from './components/Calendars/calendar'

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
          height: '100%'
          // overflow: 'scroll',
          // paddingLeft: 12,
          // paddingRight: 12
        }}
      >
        <div style={{ width: '60%', position: 'relative', height: '100%' }}>

          <Calendar
            current={{
              month: 5,
              year: 2022
            }}
            disabledOptions={{
              excludeWeekends: false
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
