import styled, { css } from 'styled-components';

import { defaultColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { DefaultAnimationTimingFn } from '../../../common/constants/styles';

export interface ModalAnimationProps {
  animationPhase?: TModalAnimationPhases;
  animationDuration?: number;
}

export const ModalLayout = styled('div')<ModalAnimationProps>`
  & {
    position: fixed;
    width: 100vw;
    height: 100vh;
    padding: 30px;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color ${(_) => _.animationDuration || 300}ms
      ${DefaultAnimationTimingFn};

    ${({ animationPhase }) => {
      switch (animationPhase) {
        case 'open':
          return css`
            background-color: rgba(95, 95, 95, 0.35);
          `;
        case 'close':
          return css`
            background-color: rgba(255, 255, 255, 0.1);
          `;
      }
    }}
  }
`;

export type TModalAnimationPhases = 'open' | 'close';

export const ModalContainer = styled('div')<ModalAnimationProps>`
  & {
    position: relative;
    background-color: #fff;
    max-width: 90%;
    height: 100%;
    min-width: 400px;
    border: 1px solid ${defaultColor};
    box-shadow: 0px 20px 30px 10px ${defaultColor};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    border-radius: ${borderRadiusSize.xl};
    overflow: unset;
    transition: all ${(_) => _.animationDuration || 300}ms
      ${DefaultAnimationTimingFn};
    opacity: 0;
    transform: translateY(60vh) scale(0.8);

    ${({ animationPhase }) => {
      switch (animationPhase) {
        case 'open':
          return css`
            opacity: 1;
            transform: translateY(0) scale(1);
          `;
        case 'close':
          return css`
            opacity: 0;
            transform: translateY(80vh) scale(0.7);
          `;
      }
    }}
  }
`;

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
`;

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
`;

export const StyledModalBodyContainer = styled('div')`
  & {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    min-height: 150px;
    height: 100%;
  }
`;
