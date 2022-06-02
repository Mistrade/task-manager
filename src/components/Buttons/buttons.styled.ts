import styled from 'styled-components'
import { currentColor } from '../../common/constants'

export const StyledButton = styled( 'button' )<{ fillColor?: string, textColor?: string }>`
  & {
    padding: 12px 24px;
    font-size: 16px;
    color: ${props => props.textColor || '#fff'};
    background-color: ${props => props.fillColor || currentColor};
    border: none;
    border-radius: 4px;
    outline: none;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`
