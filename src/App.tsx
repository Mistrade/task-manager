import React, { useEffect } from 'react'
import './App.css'
import { createGlobalStyle, css } from 'styled-components'
import './common/dayjs'
import { Calendar } from './components/Calendars/calendar'
import { FlexBlock } from './components/LayoutComponents/flexBlock'
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
        <div style={{ width: '100%', position: 'relative', height: '100%' }}>
          <Calendar
            initialCurrent={{
              layout: 'week',
              week: dayjs().week(),
              year: new Date().getFullYear()
            }}
            disabledOptions={{}}
            renderWeekPattern={'short'}
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
