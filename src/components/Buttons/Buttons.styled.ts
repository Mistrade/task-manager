import styled from 'styled-components'
import {currentColor, defaultColor} from '../../common/constants'

export const StyledButton = styled('button')<{ fillColor?: string, textColor?: string }>`
  & {
    padding: 6px 24px;
    font-size: 16px;
    color: ${props => props.textColor || '#fff'};
    background-color: ${props => props.fillColor || currentColor};
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`

export const Button = styled('button')`
  & {
    padding: 6px 24px;
    font-size: 16px;
    color: #fff;
    background-color: ${currentColor};
    outline: none;
    border: 1px solid #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: all .3s ease-in-out;
  }

  &:hover {
    color: ${currentColor};
    background-color: #fff;
    border: 1px solid ${currentColor};
    box-shadow: 0 0 8px 0px ${currentColor};
  }
`

export const LinkButton = styled('a')`
  & {
    padding: 6px 32px;
    font-size: 16px;
    color: ${defaultColor};
    background-color: #fff;
    outline: none;
    border: 1px solid ${defaultColor};
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
    transition: all .3s ease-in-out;
    vertical-align: middle;
  }

  &:hover {
    color: ${currentColor};
    background-color: #fff;
    border: 1px solid ${currentColor};
    box-shadow: 0 0 8px 0px ${currentColor};
  }
`

export const WhiteButton = styled('button')`
  & {
    padding: 4px 8px;
    font-size: 16px;
    color: ${defaultColor};
    background-color: #fff;
    outline: none;
    border: 1px solid ${defaultColor};
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
    transition: all .3s ease-in-out;
    vertical-align: middle;
  }

  &:hover {
    color: ${currentColor};
    background-color: #fff;
    border: 1px solid ${currentColor};
    box-shadow: 0 0 8px 0px ${currentColor};
  }
`

export const JoinToEventButton = styled('a')`
  font-size: 14px;
  padding: 4px 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${defaultColor};
  border-radius: 4px;
  color: ${defaultColor};
  text-decoration: none;
  outline: none;
  background-color: transparent;
  transition: all .3s ease-in;

  &:hover {
    border-color: ${currentColor};
    color: ${currentColor}
  }
`
