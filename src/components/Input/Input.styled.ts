import styled from 'styled-components'
import { currentColor, defaultColor, disabledColor } from '../../common/constants'

export const StyledInput = styled( 'input' )`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 2px solid ${disabledColor};
  border-radius: 6px;
  outline: none;
  transition: all .3s ease-in;
  cursor: pointer;
  
  &:focus {
    border: 2px solid ${currentColor};
  }
  
  &:hover {
    box-shadow: 0 0 8px 0px ${currentColor};
  }
`

export const StyledFindInput = styled( StyledInput )`
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  padding: 12px 16px
`
