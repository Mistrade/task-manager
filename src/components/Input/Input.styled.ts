import styled from 'styled-components'
import { currentColor, defaultColor, disabledColor } from '../../common/constants'

export const StyledInput = styled( 'input' )<{ hasIcon?: boolean }>`
  width: 100%;
  border: 2px solid ${disabledColor};
  border-radius: 6px;
  outline: none;
  transition: all .3s ease-in;
  cursor: pointer;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  padding: 12px ${_ => _.hasIcon ? '46px' : '16px'} 12px 16px;

  &:focus {
    border: 2px solid ${currentColor};
  }

  &:hover {
    box-shadow: 0 0 8px 0px ${currentColor};
  }
`

export const StyledLabel = styled( 'label' )`
  & {
    width: 100%;
    font-size: 16px;
    font-family: Helvetica, sans-serif;
    font-weight: normal;
    color: ${currentColor};
    line-height: 1;
    margin-bottom: 8px;
    cursor: pointer;
    padding-left: 8px;
    padding-right: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const StyledFindInput = styled( StyledInput )`

`
