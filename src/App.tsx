import React, { useEffect } from 'react'
import './App.css'
import { createGlobalStyle, css } from 'styled-components'
import './common/dayjs'
import { Calendar } from './components/Calendars/calendar'
import dayjs from 'dayjs'

const GlobalStyled = createGlobalStyle( {}, css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
` )

function App() {

  const max = dayjs().subtract( 10, 'day' )
  const min = dayjs().subtract( 20, 'day' )

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
        <div style={{ width: '100%', position: 'relative', height: '100%' }}>

          <Calendar
            current={{
              month: 4,
              year: 2022
            }}
            renderOption={'full-size'}
            disabledOptions={{
              //   max,
              //   includeMax: true,
              //   min,
              //   includeMin: true,
              excludeWeekends: false
              // disableDates: [
              //   dayjs( new Date( 2022, 4, 17 ) )
              // ]
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
