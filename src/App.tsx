import React, { useEffect } from 'react'
import './App.css'
import { createGlobalStyle, css } from 'styled-components'
import './common/dayjs'
import { Calendar } from './components/Calendars/calendar'
import { FlexBlock } from './components/LayoutComponents/flexBlock'

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
        <div style={{ width: '100%', position: 'relative', height: '100%' }}>
          <Calendar
            initialCurrent={{
              month: 5,
              year: 2022
            }}
            disabledOptions={{
              excludeWeekends: false
            }}
            renderWeekPattern={'full'}
          />
          <FlexBlock height={600}/>
          <FlexBlock height={600}/>
          <FlexBlock height={600}/>
          <FlexBlock height={600}/>
          <FlexBlock height={600}/>

        </div>
      </div>
    </div>
  )
}

export default App
