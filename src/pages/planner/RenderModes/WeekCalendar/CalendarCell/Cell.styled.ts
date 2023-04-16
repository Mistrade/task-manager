import styled, { keyframes } from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';


export const CellDateStyledContainer = styled('div')`
  & {
    width: 100%;
    display: flex;
    position: relative;
    height: 50px;
    gap: 6px;
    border-radius: ${borderRadiusSize.sm};
    justify-content: flex-end;
    flex-wrap: nowrap;
    align-items: center;
  }
`;

const cellDateHoverContainerAnimation = keyframes`
  from {
    transform: scale(.7);
    opacity: .5;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const CellDateHoverContainer = styled('div')`
  & {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${cellDateHoverContainerAnimation} 0.3s ease-in-out forwards;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;