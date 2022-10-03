import styled, {keyframes} from 'styled-components'
import {defaultColor} from '../../common/constants'

export const ModalLayout = styled('div')`
  & {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(110, 110, 110, .35);
    padding-top: 30px;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`

const animation = keyframes({
	'0%': {
		transform: `scale(0.2)`
	},
	'100%': {
		transform: 'scale(1)'
	}
})

export const ModalContainer = styled('div')`
  & {
    position: relative;
    background-color: #fff;
    max-width: 90%;
    max-height: 90%;
		min-width: 400px;
    opacity: 1;
    border: 1px solid ${defaultColor};
    box-shadow: 0px 0px 30px ${defaultColor};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 4px;
    animation: .25s ${animation} forwards ease-in-out;
  }
`

export const StyledModalHeaderContainer = styled('div')`
  & {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 20px;
    width: 100%;
    border-bottom: 1px solid ${defaultColor};
    flex: 1 0 10%;
    min-height: 40px;
    max-height: 50px;
  }
`

export const StyledModalFooterContainer = styled(StyledModalHeaderContainer)`
  & {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 20px;
    width: 100%;
    border-top: 1px solid ${defaultColor};
    border-bottom: none;
    flex: 1 0 10%;
    min-height: 50px;
    max-height: 100px;
  }
`

export const StyledModalBodyContainer = styled('div')`
  & {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    min-height: 300px;
  }
`