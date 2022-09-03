import styled from 'styled-components'
import {darkColor} from '../../common/constants'

export const Heading = {
  H1: styled( 'h1' )`
    & {
      font-size: 28px;
      font-weight: bold;
      font-style: normal;
      font-family: "Helvetica Neue", sans-serif;
      color: ${darkColor};
      margin: 0;
    }
  `,
  H2: styled( 'h2' )`
    & {
      font-size: 24px;
      font-weight: bold;
      font-style: normal;
      font-family: "Helvetica Neue", sans-serif;
      color: ${darkColor};
      margin: 0;
      line-height: 1;
    }
  `
}
